import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type KnowledgeCategory = "CAISSE" | "ORP" | "SOCIAL";

interface KnowledgeForm {
  category: KnowledgeCategory;
  content: string;
  source: string;
  pdfUrl: string;
  pdfPage: string;
}

interface KnowledgeRow {
  id: string;
  category: string;
  content: string;
  metadata: {
    source?: string;
    pdf_url?: string;
    pdf_page?: number;
  } | null;
}

const EMBED_MODEL = "Xenova/all-mpnet-base-v2";
let embedderPromise: Promise<unknown> | null = null;

async function getEmbedder() {
  if (!embedderPromise) {
    embedderPromise = import("@xenova/transformers").then(({ pipeline }) =>
      pipeline("feature-extraction", EMBED_MODEL)
    );
  }
  return embedderPromise;
}

function toVectorString(values: number[]) {
  return `[${values.join(",")}]`;
}

async function generateEmbedding(text: string) {
  const embedder = (await getEmbedder()) as (
    input: string,
    options: { pooling: "mean"; normalize: true }
  ) => Promise<{ data: Float32Array }>;

  const out = await embedder(text, { pooling: "mean", normalize: true });
  const arr = Array.from(out.data, (x) => Number(x));
  return toVectorString(arr);
}

const KnowledgeManager = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<KnowledgeRow[]>([]);
  const [form, setForm] = useState<KnowledgeForm>({
    category: "ORP",
    content: "",
    source: "",
    pdfUrl: "",
    pdfPage: "",
  });

  const canSave = useMemo(() => {
    return form.content.trim().length > 20 && form.source.trim().length > 0;
  }, [form.content, form.source]);

  const loadDocuments = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("id, category, content, metadata")
        .order("id", { ascending: false })
        .limit(50);

      if (error) throw error;
      setRows((data ?? []) as KnowledgeRow[]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      toast.error(`Chargement documents impossible: ${message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const resetForm = () => {
    setForm({
      category: "ORP",
      content: "",
      source: "",
      pdfUrl: "",
      pdfPage: "",
    });
  };

  const handleSave = async () => {
    if (!canSave) {
      toast.error("Contenu ou source manquant.");
      return;
    }

    setIsSaving(true);
    try {
      const embedding = await generateEmbedding(form.content);
      const pageNumber = Number(form.pdfPage);
      const metadata = {
        source: form.source,
        ...(form.pdfUrl.trim() ? { pdf_url: form.pdfUrl.trim() } : {}),
        ...(Number.isFinite(pageNumber) && pageNumber > 0 ? { pdf_page: pageNumber } : {}),
      };

      const { error } = await supabase.from("documents").insert({
        category: form.category,
        content: form.content.trim(),
        embedding,
        metadata,
      });

      if (error) throw error;
      toast.success("Document indexe avec succes.");
      resetForm();
      await loadDocuments();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      toast.error(`Indexation impossible: ${message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("documents").delete().eq("id", id);
      if (error) throw error;
      setRows((prev) => prev.filter((row) => row.id !== id));
      toast.success("Document supprime.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      toast.error(`Suppression impossible: ${message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Knowledge Base / RAG</h3>
        <p className="text-sm text-muted-foreground">
          Ingestion manuelle validee: ajoute un passage, sa source, et optionnellement un lien PDF + page.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as KnowledgeCategory }))}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="ORP">ORP</option>
            <option value="CAISSE">CAISSE</option>
            <option value="SOCIAL">SOCIAL</option>
          </select>
          <input
            value={form.source}
            onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value }))}
            placeholder="Source (ex: LACI Art. 22)"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
          />
          <input
            value={form.pdfPage}
            onChange={(e) => setForm((prev) => ({ ...prev, pdfPage: e.target.value }))}
            placeholder="Page PDF (optionnel)"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <input
          value={form.pdfUrl}
          onChange={(e) => setForm((prev) => ({ ...prev, pdfUrl: e.target.value }))}
          placeholder="Lien PDF (optionnel)"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />

        <textarea
          value={form.content}
          onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
          placeholder="Texte de reference a indexer..."
          className="w-full min-h-[120px] rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />

        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={isSaving || !canSave}>
            <Plus className="h-4 w-4 me-1" />
            {isSaving ? "Indexation..." : "Indexer le document"}
          </Button>
          <Button variant="outline" onClick={resetForm}>
            Vider le formulaire
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-semibold text-foreground">Documents indexes (50 derniers)</h4>
          <Button size="sm" variant="outline" onClick={loadDocuments} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 me-1" />
            {isLoading ? "Chargement..." : "Rafraichir"}
          </Button>
        </div>

        <div className="space-y-2">
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun document trouve.</p>
          ) : (
            rows.map((row) => (
              <div key={row.id} className="rounded-lg border border-border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      {row.category} | {row.metadata?.source ?? "Source non renseignee"}
                    </p>
                    <p className="mt-1 text-sm text-foreground line-clamp-3">{row.content}</p>
                    {row.metadata?.pdf_url && (
                      <a
                        href={`${row.metadata.pdf_url}${row.metadata.pdf_page ? `#page=${row.metadata.pdf_page}` : ""}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs text-primary underline underline-offset-2 break-all"
                      >
                        {row.metadata.pdf_page
                          ? `Ouvrir PDF p.${row.metadata.pdf_page}`
                          : "Ouvrir PDF"}
                      </a>
                    )}
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(row.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeManager;
