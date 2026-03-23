import { useState } from "react";
import { useLanguage } from "@/i18n/useLanguage";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ChatContainer from "@/components/ChatContainer";

const ChatBot = () => {
  const { t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

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
            "fixed bottom-6 z-50 flex h-[600px] w-[420px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border bg-card shadow-xl",
            dir === "rtl" ? "left-6" : "right-6"
          )}
        >
          <ChatContainer onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default ChatBot;
