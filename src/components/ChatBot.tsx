import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/useLanguage";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Persona = "orp" | "benefits" | "social";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const personaConfig: Record<Persona, { labelKey: string; welcomeKey: string; color: string }> = {
  orp: { labelKey: "orpAdvisor", welcomeKey: "orpWelcome", color: "bg-pillar-blue" },
  benefits: { labelKey: "benefitsAdvisor", welcomeKey: "benefitsWelcome", color: "bg-pillar-green" },
  social: { labelKey: "socialAssistant", welcomeKey: "socialWelcome", color: "bg-pillar-orange" },
};

const ChatBot = () => {
  const { t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [persona, setPersona] = useState<Persona>("orp");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: t(personaConfig[persona].welcomeKey),
      },
    ]);
  }, [persona, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `[${t(personaConfig[persona].labelKey)}] — Cette fonctionnalité sera bientôt connectée à un assistant IA.`,
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          dir === "rtl" ? "left-6" : "right-6",
          isOpen && "hidden"
        )}
        aria-label={t("chatbotTitle")}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-6 z-50 flex h-[500px] w-[360px] flex-col rounded-2xl border border-border bg-card shadow-xl",
            dir === "rtl" ? "left-6" : "right-6"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4 rtl:flex-row-reverse">
            <h3 className="font-semibold text-foreground">{t("chatbotTitle")}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t("close")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Persona Toggle */}
          <div className="flex gap-1 border-b border-border p-2 rtl:flex-row-reverse">
            {(Object.keys(personaConfig) as Persona[]).map((p) => (
              <button
                key={p}
                onClick={() => setPersona(p)}
                className={cn(
                  "flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  persona === p
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {t(personaConfig[p].labelKey)}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                  msg.role === "user"
                    ? "ms-auto bg-primary text-primary-foreground"
                    : "me-auto bg-muted text-foreground"
                )}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("typeMessage")}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim()}
                className="h-10 w-10 shrink-0"
                aria-label={t("send")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
