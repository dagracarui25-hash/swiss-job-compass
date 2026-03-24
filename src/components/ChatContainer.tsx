import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/useLanguage";
import { Briefcase, Heart, Banknote, ArrowLeft, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ChatMessage, { type Persona } from "@/components/ChatMessage";
import { supabase } from "@/integrations/supabase/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface RetrievedDoc {
  id: string;
  content: string;
  category: string;
  metadata: {
    source?: string;
    pdf_url?: string;
    pdf_page?: number;
  } | null;
  similarity: number;
}

const EMBED_MODEL = "Xenova/all-mpnet-base-v2";
const LLM_MODEL = "gemini-1.5-flash";
const geminiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

let embedderPromise: Promise<any> | null = null;
const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;

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

async function embedQuery(text: string) {
  const embedder = await getEmbedder();
  const out = await embedder(text, { pooling: "mean", normalize: true });
  const arr = Array.from(out.data, (x: number) => Number(x));
  return toVectorString(arr);
}

function personaToCategory(persona: Persona): string {
  switch (persona) {
    case "orp":
      return "ORP";
    case "benefits":
      return "CAISSE";
    case "social":
      return "SOCIAL";
    default:
      return "ORP";
  }
}

function buildGroundedAnswer(question: string, docs: RetrievedDoc[]) {
  if (!docs.length) {
    return "Je n'ai pas trouve de passage pertinent dans la base pour cette question. Essaie de reformuler avec plus de details.";
  }

  const topDocs = docs.slice(0, 3);
  const synthesis = topDocs
    .map((doc, idx) => `${idx + 1}. ${doc.content}`)
    .join("\n\n");
  const sources = topDocs
    .map((doc, idx) => {
      const source = doc.metadata?.source || "Source non renseignee";
      const pdfUrl = doc.metadata?.pdf_url;
      const pdfPage = doc.metadata?.pdf_page;
      if (pdfUrl && pdfPage) {
        return `- Source ${idx + 1}: ${source} | PDF p.${pdfPage}: ${pdfUrl}#page=${pdfPage}`;
      }
      if (pdfUrl) {
        return `- Source ${idx + 1}: ${source} | PDF: ${pdfUrl}`;
      }
      return `- Source ${idx + 1}: ${source}`;
    })
    .join("\n");

  return [
    `Question: ${question}`,
    "",
    "Reponse basee sur les documents indexes:",
    synthesis,
    "",
    "Sources:",
    sources || "- Source non renseignee",
  ].join("\n");
}

function formatSources(docs: RetrievedDoc[]) {
  const topDocs = docs.slice(0, 3);
  const sources = topDocs
    .map((doc, idx) => {
      const source = doc.metadata?.source || "Source non renseignee";
      const pdfUrl = doc.metadata?.pdf_url;
      const pdfPage = doc.metadata?.pdf_page;
      if (pdfUrl && pdfPage) {
        return `- Source ${idx + 1}: ${source} | Ouvrir PDF page ${pdfPage}: ${pdfUrl}#page=${pdfPage}`;
      }
      if (pdfUrl) {
        return `- Source ${idx + 1}: ${source} | Ouvrir PDF: ${pdfUrl}`;
      }
      return `- Source ${idx + 1}: ${source}`;
    })
    .join("\n");
  return sources || "- Source non renseignee";
}

async function generateNaturalAnswer(question: string, docs: RetrievedDoc[]) {
  if (!genAI || !docs.length) return null;

  const context = docs
    .slice(0, 4)
    .map((doc, idx) => `Document ${idx + 1} (${doc.metadata?.source ?? "source inconnue"}):\n${doc.content}`)
    .join("\n\n");

  const prompt = [
    "Tu es un assistant pour le chomage en Suisse.",
    "Reponds en francais clair, concis, et utile.",
    "Utilise UNIQUEMENT le contexte ci-dessous.",
    "Si une information manque, dis-le clairement sans inventer.",
    "",
    `Question utilisateur: ${question}`,
    "",
    "Contexte:",
    context,
  ].join("\n");

  const model = genAI.getGenerativeModel({ model: LLM_MODEL });
  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  return text || null;
}

const personaMeta: Record<Persona, { labelKey: string; descKey: string; welcomeKey: string; icon: React.ReactNode; colorClass: string; bgClass: string }> = {
  orp: {
    labelKey: "orpAdvisor",
    descKey: "orpDesc",
    welcomeKey: "heroWelcome",
    icon: <Briefcase className="h-7 w-7" />,
    colorClass: "text-pillar-blue",
    bgClass: "bg-pillar-blue",
  },
  benefits: {
    labelKey: "benefitsAdvisor",
    descKey: "benefitsDesc",
    welcomeKey: "benefitsWelcome",
    icon: <Banknote className="h-7 w-7" />,
    colorClass: "text-pillar-green",
    bgClass: "bg-pillar-green",
  },
  social: {
    labelKey: "socialAssistant",
    descKey: "socialAssistantDesc",
    welcomeKey: "socialWelcome",
    icon: <Heart className="h-7 w-7" />,
    colorClass: "text-pillar-orange",
    bgClass: "bg-pillar-orange",
  },
};

const quickActionKeys = ["quickActionDeadlines", "quickActionCV", "quickActionGain"] as const;

interface ChatContainerProps {
  onClose: () => void;
  initialMessage?: string;
  onInitialMessageConsumed?: () => void;
}

const ChatContainer = ({ onClose, initialMessage, onInitialMessageConsumed }: ChatContainerProps) => {
  const { t, dir } = useLanguage();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageHandled = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-select ORP persona and send initial message from hero
  useEffect(() => {
    if (initialMessage && !initialMessageHandled.current) {
      initialMessageHandled.current = true;
      // Auto-select ORP persona
      setPersona("orp");
      const welcomeMsg: Message = { id: "welcome", role: "assistant", content: t("heroWelcome") };
      const userMsg: Message = { id: Date.now().toString(), role: "user", content: initialMessage };
      setMessages([welcomeMsg, userMsg]);
      setIsTyping(true);
      onInitialMessageConsumed?.();
      (async () => {
        try {
          const queryEmbedding = await embedQuery(initialMessage);
          const { data, error } = await supabase.rpc("match_documents", {
            query_embedding: queryEmbedding,
            match_count: 5,
            match_threshold: 0.2,
            filter_category: personaToCategory("orp"),
          });

          if (error) throw error;
          const docs = (data ?? []) as RetrievedDoc[];
          const llmResponse = await generateNaturalAnswer(initialMessage, docs);
          const response =
            llmResponse
              ? `${llmResponse}\n\nSources:\n${formatSources(docs)}`
              : buildGroundedAnswer(initialMessage, docs);
          const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: response,
          };
          setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
          const fallback = err instanceof Error ? err.message : "Erreur inconnue";
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: "assistant",
              content: `Je n'arrive pas a recuperer les documents pour le moment. Detail: ${fallback}`,
            },
          ]);
        } finally {
          setIsTyping(false);
        }
      })();
    }
  }, [initialMessage, t, onInitialMessageConsumed]);

  const selectPersona = useCallback((p: Persona) => {
    setPersona(p);
    setMessages([{ id: "welcome", role: "assistant", content: t(personaMeta[p].welcomeKey) }]);
  }, [t]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || !persona) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    (async () => {
      try {
        const queryEmbedding = await embedQuery(text);
        const { data, error } = await supabase.rpc("match_documents", {
          query_embedding: queryEmbedding,
          match_count: 5,
          match_threshold: 0.2,
          filter_category: personaToCategory(persona),
        });

        if (error) throw error;

        const docs = (data ?? []) as RetrievedDoc[];
        const llmResponse = await generateNaturalAnswer(text, docs);
        const response =
          llmResponse
            ? `${llmResponse}\n\nSources:\n${formatSources(docs)}`
            : buildGroundedAnswer(text, docs);
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        const fallback = err instanceof Error ? err.message : "Erreur inconnue";
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `Je n'arrive pas a recuperer les documents pour le moment. Detail: ${fallback}`,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    })();
  }, [persona, t]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Persona selection screen
  if (!persona) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="text-lg font-semibold text-foreground">{t("chooseAdvisor")}</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted" aria-label={t("close")}>✕</button>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          {(Object.keys(personaMeta) as Persona[]).map((p) => {
            const meta = personaMeta[p];
            return (
              <button
                key={p}
                onClick={() => selectPersona(p)}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-5 text-start transition-all hover:shadow-md hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-xl", meta.bgClass + "/15", meta.colorClass)}>
                  {meta.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t(meta.labelKey)}</p>
                  <p className="text-sm text-muted-foreground">{t(meta.descKey)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const meta = personaMeta[persona];

  // Chat view
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className={cn("flex items-center gap-3 border-b border-border p-4", meta.bgClass + "/10")}>
        <button
          onClick={() => { setPersona(null); setMessages([]); initialMessageHandled.current = false; }}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          aria-label={t("changeAdvisor")}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", meta.bgClass + "/15", meta.colorClass)}>
          {React.cloneElement(meta.icon as React.ReactElement, { className: "h-5 w-5" })}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{t(meta.labelKey)}</p>
          <p className="text-xs text-muted-foreground">{t("chatbotTitle")}</p>
        </div>
        <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted" aria-label={t("close")}>✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} persona={persona} />
        ))}
        {isTyping && (
          <div className="flex gap-2 items-center">
            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", meta.bgClass + "/20", meta.colorClass)}>
              {React.cloneElement(meta.icon as React.ReactElement, { className: "h-4 w-4" })}
            </div>
            <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground italic">
              {t("typing")}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />

        {/* Quick actions — show only after welcome */}
        {messages.length === 1 && !isTyping && (
          <div className="flex flex-wrap gap-2 pt-2">
            {quickActionKeys.map((key) => (
              <button
                key={key}
                onClick={() => sendMessage(t(key))}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                {t(key)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("typeMessage")}
            dir={dir}
            className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button size="icon" onClick={() => sendMessage(input)} disabled={!input.trim()} className="h-10 w-10 shrink-0" aria-label={t("send")}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
