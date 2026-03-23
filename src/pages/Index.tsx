import { useLanguage } from "@/i18n/useLanguage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import DarkModeToggle from "@/components/DarkModeToggle";
import PillarCard from "@/components/PillarCard";
import NewsFeed from "@/components/NewsFeed";
import ChatBot from "@/components/ChatBot";
import { links } from "@/data/links";
import { Building2, Briefcase, Heart, Newspaper, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const LinkButton = ({ nameKey, url }: { nameKey: string; url: string }) => {
  const { t } = useLanguage();
  const label = t(nameKey) === nameKey ? nameKey : t(nameKey);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rtl:flex-row-reverse"
    >
      <span>{label}</span>
      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
    </a>
  );
};

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 rtl:flex-row-reverse">
          <div>
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">{t("dashboardTitle")}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{t("dashboardSubtitle")}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 1. Administration */}
          <PillarCard
            titleKey="adminTitle"
            descriptionKey="adminDesc"
            icon={<Building2 className="h-6 w-6" />}
            color="blue"
          >
            {links.admin.map((link) => (
              <LinkButton key={link.url} nameKey={link.nameKey} url={link.url} />
            ))}
          </PillarCard>

          {/* 2. Job Search & Tools */}
          <PillarCard
            titleKey="jobsTitle"
            descriptionKey="jobsDesc"
            icon={<Briefcase className="h-6 w-6" />}
            color="green"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              {t("jobPlatforms")}
            </p>
            {links.jobs.map((link) => (
              <LinkButton key={link.url} nameKey={link.nameKey} url={link.url} />
            ))}
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-3 mb-1">
              {t("cvTools")}
            </p>
            {links.cvTools.map((link) => (
              <LinkButton key={link.url} nameKey={link.nameKey} url={link.url} />
            ))}
            {/* CTA Guide Button */}
            <a
              href={links.guide.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block"
            >
              <Button className="w-full h-12 text-sm font-semibold bg-pillar-green hover:bg-pillar-green/90 text-primary-foreground">
                {t("guideButton")}
                <ExternalLink className="h-4 w-4 ms-2" />
              </Button>
            </a>
          </PillarCard>

          {/* 3. Social Support */}
          <PillarCard
            titleKey="socialTitle"
            descriptionKey="socialDesc"
            icon={<Heart className="h-6 w-6" />}
            color="orange"
          >
            {links.social.map((link) => (
              <LinkButton key={link.url} nameKey={link.nameKey} url={link.url} />
            ))}
          </PillarCard>

          {/* 4. News & ORP Measures */}
          <PillarCard
            titleKey="newsTitle"
            descriptionKey="newsDesc"
            icon={<Newspaper className="h-6 w-6" />}
            color="purple"
          >
            <p className="text-xs text-muted-foreground">
              {t("newsDesc")}
            </p>
          </PillarCard>
        </div>

        {/* News Feed */}
        <NewsFeed />
      </main>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
