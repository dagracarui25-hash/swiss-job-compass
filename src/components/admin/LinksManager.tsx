import { useState } from "react";
import { useAdminLinks, type AdminLinks } from "@/hooks/useAdminData";
import type { LinkItem } from "@/data/links";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const pillarLabels: Record<string, { label: string; color: string }> = {
  admin: { label: "Administration (Blue)", color: "border-l-pillar-blue" },
  jobs: { label: "Job Search (Green)", color: "border-l-pillar-green" },
  cvTools: { label: "CV Tools (Green)", color: "border-l-pillar-green" },
  social: { label: "Social Support (Orange)", color: "border-l-pillar-orange" },
};

const LinksManager = () => {
  const { linksData, updatePillar } = useAdminLinks();
  const [editState, setEditState] = useState<{ pillar: string; index: number } | null>(null);
  const [addPillar, setAddPillar] = useState<string | null>(null);
  const [form, setForm] = useState<LinkItem>({ nameKey: "", url: "" });

  const pillars = ["admin", "jobs", "cvTools", "social"] as const;

  const handleSave = (pillar: keyof Omit<AdminLinks, "guide">) => {
    if (!form.nameKey || !form.url) return;
    const items = [...linksData[pillar]];
    if (editState) {
      items[editState.index] = form;
    } else {
      items.push(form);
    }
    updatePillar(pillar, items);
    toast.success(editState ? "Link updated" : "Link added");
    setForm({ nameKey: "", url: "" });
    setEditState(null);
    setAddPillar(null);
  };

  const handleDelete = (pillar: keyof Omit<AdminLinks, "guide">, index: number) => {
    const items = linksData[pillar].filter((_, i) => i !== index);
    updatePillar(pillar, items);
    toast.success("Link deleted");
  };

  return (
    <div className="space-y-6">
      {pillars.map((pillar) => (
        <div key={pillar} className={`rounded-xl border border-border bg-card p-4 border-l-4 ${pillarLabels[pillar].color}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">{pillarLabels[pillar].label}</h4>
            <Button size="sm" variant="outline" onClick={() => { setAddPillar(pillar); setEditState(null); setForm({ nameKey: "", url: "" }); }}>
              <Plus className="h-4 w-4 me-1" /> Add
            </Button>
          </div>

          {(addPillar === pillar || (editState && editState.pillar === pillar)) && (
            <div className="mb-3 rounded-lg border border-border p-3 space-y-2">
              <input
                placeholder="Name / i18n key"
                value={form.nameKey}
                onChange={(e) => setForm({ ...form, nameKey: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
              <input
                placeholder="URL"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleSave(pillar)}>
                  <Save className="h-4 w-4 me-1" /> Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setAddPillar(null); setEditState(null); }}>
                  <X className="h-4 w-4 me-1" /> Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-1">
            {linksData[pillar].map((link, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/50">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{link.nameKey}</p>
                  <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                </div>
                <div className="flex gap-1 ms-2">
                  <Button size="icon" variant="ghost" onClick={() => { setEditState({ pillar, index: i }); setAddPillar(null); setForm(link); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(pillar, i)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinksManager;
