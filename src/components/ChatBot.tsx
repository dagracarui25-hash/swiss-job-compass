import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/useLanguage";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ChatContainer from "@/components/ChatContainer";

interface ChatBotProps {
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
  initialMessage?: string;
  onInitialMessageConsumed?: () => void;
}

const ChatBot = ({ externalOpen, onExternalOpenChange, initialMessage, onInitialMessageConsumed }: ChatBotProps) => {
  const { t, dir } = useLanguage();
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = (v: boolean) => {
    if (onExternalOpenChange) onExternalOpenChange(v);
    else setInternalOpen(v);
  };

  return (
    <>
      {/* Small floating button — only when NOT opened from hero */}
      {!isOpen && externalOpen === undefined && (
        <div
          className={cn(
            "fixed bottom-6 z-50",
            dir === "rtl" ? "left-6" : "right-6"
          )}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring animate-[pulse_3s_ease-in-out_infinite] hover:animate-none"
            aria-label={t("chatbotTitle")}
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "fixed z-50 flex flex-col rounded-2xl border border-border bg-card shadow-2xl animate-scale-in",
              "inset-4 sm:inset-auto",
              "sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
              "sm:h-[min(700px,calc(100vh-4rem))] sm:w-[min(520px,calc(100vw-4rem))]"
            )}
          >
            <ChatContainer
              onClose={() => setIsOpen(false)}
              initialMessage={initialMessage}
              onInitialMessageConsumed={onInitialMessageConsumed}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ChatBot;
