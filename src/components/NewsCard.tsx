import { useLanguage } from "@/i18n/useLanguage";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  title: string;
  source: string;
  date: string;
  url: string;
  summary: string;
}

const sourceColorMap: Record<string, string> = {
  ORP: "bg-pillar-purple/10 text-pillar-purple border-pillar-purple/20",
  SECO: "bg-pillar-blue/10 text-pillar-blue border-pillar-blue/20",
  Canton: "bg-pillar-orange/10 text-pillar-orange border-pillar-orange/20",
  RAV: "bg-pillar-purple/10 text-pillar-purple border-pillar-purple/20",
  URC: "bg-pillar-purple/10 text-pillar-purple border-pillar-purple/20",
};

const NewsCard: React.FC<NewsCardProps> = ({ title, source, date, url, summary }) => {
  const { t } = useLanguage();
  const sourceKey = `source${source}` as string;
  const translatedSource = t(sourceKey);

  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-3 rtl:flex-row-reverse">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap rtl:flex-row-reverse">
            <Badge
              variant="outline"
              className={cn("text-xs font-medium", sourceColorMap[source] || "bg-muted text-muted-foreground")}
            >
              {translatedSource}
            </Badge>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{summary}</p>
        </div>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded rtl:flex-row-reverse"
      >
        {t("readMore")}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
};

export default NewsCard;
