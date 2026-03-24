import { useLanguage } from "@/i18n/useLanguage";
import NewsCard from "./NewsCard";
import newsData from "@/data/news.json";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const NewsFeed = () => {
  const { t } = useLanguage();

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4 rtl:flex-row-reverse">
        <h2 className="text-xl font-semibold text-foreground">{t("newsTitle")}</h2>
        <Badge variant="outline" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {t("lastUpdated")}: {new Date().toLocaleDateString()}
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {newsData.map((item) => (
          <NewsCard
            key={item.id}
            title={item.titleKey}
            source={item.source}
            date={item.date}
            url={item.url}
            summary={item.summary}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsFeed;
