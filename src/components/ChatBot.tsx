import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/useLanguage";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ChatContainer from "@/components/ChatContainer";

const ChatBot = () => {
  const { t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show tooltip after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating CTA Button with tooltip */}
      {!isOpen && (
        <div
          className={cn(
            "fixed bottom-6 z-50 flex flex-col items-end gap-2",
            dir === "rtl" ? "left-6 items-start" : "right-6 items-end"
          )}
        >
          {/* Tooltip bubble */}
          {showTooltip && (
            <div
              className={cn(
                "relative animate-fade-in rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-lg max-w-[220px]",
                "after:absolute after:bottom-[-6px] after:border-[6px] after:border-transparent after:border-t-card",
                dir === "rtl"
                  ? "after:left-6 after:right-auto"
                  : "after:right-6 after:left-auto"
              )}
            >
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute top-1 right-1 rtl:right-auto rtl:left-1 p-0.5 rounded-full text-muted-foreground hover:text-foreground"
                aria-label={t("close")}
              >
                <X className="h-3 w-3" />
              </button>
              <p className="pe-4">{t("chatbotTooltip")}</p>
            </div>
          )}

          {/* Main button with CTA text */}
          <button
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            className={cn(
              "group flex items-center gap-3 rounded-full bg-primary text-primary-foreground shadow-xl transition-all hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "animate-[pulse_3s_ease-in-out_infinite] hover:animate-none",
              "h-14 ps-5 pe-3 sm:h-16 sm:ps-6 sm:pe-4"
            )}
            aria-label={t("chatbotTitle")}
          >
            <span className="text-sm font-semibold sm:text-base whitespace-nowrap">
              {t("chatbotCTA")}
            </span>
            <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-primary-foreground/20">
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
          </button>
        </div>
      )}

      {/* Chat Panel — larger modal-like window */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          {/* Chat window */}
          <div
            className={cn(
              "fixed z-50 flex flex-col rounded-2xl border border-border bg-card shadow-2xl animate-scale-in",
              // Mobile: nearly full screen
              "inset-4 sm:inset-auto",
              // Desktop: centered large panel
              "sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
              "sm:h-[min(700px,calc(100vh-4rem))] sm:w-[min(520px,calc(100vw-4rem))]"
            )}
          >
            <ChatContainer onClose={() => setIsOpen(false)} />
          </div>
        </>
      )}
    </>
  );
};

export default ChatBot;
