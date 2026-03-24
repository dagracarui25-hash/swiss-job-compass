import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/useLanguage";
import { Briefcase, Heart, Banknote, ArrowLeft, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ChatMessage, { type Persona } from "@/components/ChatMessage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
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

function mockResponse(persona: Persona, t: (k: string) => string): string {
  const responses: Record<Persona, string> = {
    orp: `[${t("orpAdvisor")}] — ${t("orpWelcome")}`,
    benefits: `[${t("benefitsAdvisor")}] — ${t("benefitsWelcome")}`,
    social: `[${t("socialAssistant")}] — ${t("socialWelcome")}`,
  };
  return responses[persona];
}

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

      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: mockResponse("orp", t),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 800);
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

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: mockResponse(persona, t),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
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
