import { useState } from "react";
import { useLanguage } from "@/i18n/useLanguage";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import DarkModeToggle from "@/components/DarkModeToggle";
import PillarCard from "@/components/PillarCard";
import NewsFeed from "@/components/NewsFeed";
import ChatBot from "@/components/ChatBot";
import ReviewsSection from "@/components/ReviewsSection";
import { links } from "@/data/links";
import { Building2, Briefcase, Heart, Newspaper, ExternalLink, Settings, Search, MessageCircle } from "lucide-react";
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

const heroQuickActions = [
  "quickCalcIndemnites",
  "quickDelaisRecherche",
  "quickFormation",
  "quickContester",
] as const;

const Index = () => {
  const { t, dir } = useLanguage();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState("");
  const [heroInput, setHeroInput] = useState("");

  const handleHeroSubmit = (text?: string) => {
    const msg = text || heroInput.trim();
    if (!msg) return;
    setChatInitialMessage(msg);
    setChatOpen(true);
    setHeroInput("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 rtl:flex-row-reverse">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            <span className="text-base font-bold text-foreground sm:text-lg">{t("chatbotTitle")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin">
              <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Admin">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <DarkModeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-4xl leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>

          {/* Search Bar */}
          <div className="mt-8 mx-auto max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 rtl:left-auto rtl:right-4 h-5 w-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={heroInput}
                onChange={(e) => setHeroInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleHeroSubmit();
                }}
                placeholder={t("heroPlaceholder")}
                dir={dir}
                className="w-full rounded-2xl border-2 border-primary/20 bg-card ps-12 pe-14 py-4 text-base text-foreground placeholder:text-muted-foreground shadow-lg focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
              />
              <Button
                size="icon"
                onClick={() => handleHeroSubmit()}
                disabled={!heroInput.trim()}
                className="absolute right-2 rtl:right-auto rtl:left-2 h-10 w-10 rounded-xl"
                aria-label={t("send")}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Reply Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {heroQuickActions.map((key) => (
              <button
                key={key}
                onClick={() => handleHeroSubmit(t(key))}
                className="rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t(key)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 flex-1">
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

        {/* Reviews */}
        <ReviewsSection />
      </main>

      {/* Legal Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            {t("legalDisclaimer")}
          </p>
        </div>
      </footer>

      {/* Chatbot — controlled open state */}
      <ChatBot
        externalOpen={chatOpen}
        onExternalOpenChange={setChatOpen}
        initialMessage={chatInitialMessage}
        onInitialMessageConsumed={() => setChatInitialMessage("")}
      />
    </div>
  );
};

export default Index;
