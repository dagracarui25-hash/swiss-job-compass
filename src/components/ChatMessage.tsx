import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";
import { Briefcase, Heart, Banknote, User } from "lucide-react";
import React from "react";

export type Persona = "orp" | "benefits" | "social";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  persona: Persona;
}

const personaIcons: Record<Persona, React.ReactNode> = {
  orp: <Briefcase className="h-4 w-4" />,
  benefits: <Banknote className="h-4 w-4" />,
  social: <Heart className="h-4 w-4" />,
};

const personaColors: Record<Persona, string> = {
  orp: "bg-pillar-blue/20 text-pillar-blue",
  benefits: "bg-pillar-green/20 text-pillar-green",
  social: "bg-pillar-orange/20 text-pillar-orange",
};

function renderWithLinks(text: string) {
  const lines = text.split("\n");
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return lines.map((line, lineIdx) => {
    const parts = line.split(urlRegex);
    return (
      <React.Fragment key={`line-${lineIdx}`}>
        {parts.map((part, idx) => {
          if (part.startsWith("http://") || part.startsWith("https://")) {
            return (
              <a
                key={`part-${lineIdx}-${idx}`}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-primary break-all"
              >
                {part}
              </a>
            );
          }
          return <React.Fragment key={`part-${lineIdx}-${idx}`}>{part}</React.Fragment>;
        })}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

const ChatMessage = ({ role, content, persona }: ChatMessageProps) => {
  const { dir } = useLanguage();

  if (role === "user") {
    return (
      <div className="flex justify-end gap-2">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">
          {content}
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", personaColors[persona])}>
        {personaIcons[persona]}
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-sm text-foreground">
        {renderWithLinks(content)}
      </div>
    </div>
  );
};

export default ChatMessage;
