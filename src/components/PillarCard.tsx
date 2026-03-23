import React from "react";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";

interface PillarCardProps {
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "orange" | "purple";
  children: React.ReactNode;
}

const colorClasses: Record<PillarCardProps["color"], { bg: string; border: string; iconBg: string; iconText: string }> = {
  blue: {
    bg: "bg-pillar-blue/5",
    border: "border-pillar-blue/20",
    iconBg: "bg-pillar-blue/10",
    iconText: "text-pillar-blue",
  },
  green: {
    bg: "bg-pillar-green/5",
    border: "border-pillar-green/20",
    iconBg: "bg-pillar-green/10",
    iconText: "text-pillar-green",
  },
  orange: {
    bg: "bg-pillar-orange/5",
    border: "border-pillar-orange/20",
    iconBg: "bg-pillar-orange/10",
    iconText: "text-pillar-orange",
  },
  purple: {
    bg: "bg-pillar-purple/5",
    border: "border-pillar-purple/20",
    iconBg: "bg-pillar-purple/10",
    iconText: "text-pillar-purple",
  },
};

const PillarCard: React.FC<PillarCardProps> = ({ titleKey, descriptionKey, icon, color, children }) => {
  const { t } = useLanguage();
  const colors = colorClasses[color];

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 transition-shadow hover:shadow-md",
        colors.bg,
        colors.border
      )}
    >
      <div className="flex items-start gap-4 rtl:flex-row-reverse mb-4">
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", colors.iconBg, colors.iconText)}>
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-foreground">{t(titleKey)}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t(descriptionKey)}</p>
        </div>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export default PillarCard;
