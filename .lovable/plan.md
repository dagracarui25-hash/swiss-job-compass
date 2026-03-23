

# Swiss Job Seeker Dashboard — Implementation Plan

## Overview
A production-ready, multilingual dashboard for Swiss job seekers with 8 languages (including Arabic RTL), 4 color-coded pillars, a news feed, and an AI chatbot. Clean, modular, Cursor-friendly architecture.

## Files to Create/Modify

### Data Layer
- **`src/i18n/locales.ts`** — All translations for 8 languages (FR, DE, IT, EN, PT, ES, SQ, AR), keyed by feature
- **`src/i18n/useLanguage.tsx`** — React context providing `t(key)`, `currentLang`, `setLang`, `dir` (rtl/ltr); sets `dir` attribute on `<html>`
- **`src/data/links.ts`** — Structured URLs per pillar (admin, jobs, social, news) including the Genially guide link
- **`src/data/news.json`** — Mock news entries with title, source, date, url fields

### Components
- **`src/components/LanguageSwitcher.tsx`** — Fixed top-right dropdown, 8 language options with native names
- **`src/components/PillarCard.tsx`** — Reusable colored card (blue/green/yellow/purple) with icon, translated title/description, and children slot for link buttons
- **`src/components/NewsCard.tsx`** — Displays news title, source badge, date, and "Read More" button
- **`src/components/NewsFeed.tsx`** — Renders news cards from JSON data, includes "Last Updated" status badge
- **`src/components/ChatBot.tsx`** — Floating chat widget with 3-persona toggle (ORP/Caisse/Social), message bubbles, placeholder responses

### Pages
- **`src/pages/Index.tsx`** — Dashboard layout: header with title + language switcher, 2x2 responsive grid of pillar cards, news section below, chatbot floating

### Styling
- **`src/index.css`** — Add CSS custom properties for pillar colors (blue, green, orange, purple) and RTL utility classes
- **`tailwind.config.ts`** — Extend with pillar color tokens

## Architecture Decisions

- **i18n**: Lightweight custom context (no external library) — `t("key")` returns translated string, falls back to French
- **RTL**: Arabic selection sets `dir="rtl"` on document root; Tailwind `rtl:` variants handle layout reversal
- **Component pattern**: All text via `t()`, all URLs from `links.ts`, all components accept `className` for composition
- **Pillar grid**: CSS Grid `grid-cols-1 md:grid-cols-2` with `gap-6`
- **Chatbot**: Local state only, placeholder responses per persona, ready for future API integration
- **Accessibility**: All interactive elements min 44px, focus-visible rings, semantic HTML, aria-labels via i18n

## Pillar Details

1. **Administration (Blue)** — Links to Job-Room, E-Services, Caisse de Chômage
2. **Job Search (Green)** — Job boards (Jobup, Indeed, LinkedIn) + CV tools (Canva, CVDesignR, Free Photo) + CTA button to Genially guide (opens new tab, external icon)
3. **Social Support (Orange)** — Cantonal social services, health insurance subsidies, housing aid
4. **ORP News (Purple)** — NewsFeed component with scraped/mock data and status badge

## Visual Style
- Clean, institutional Swiss feel — calm colors, rounded-2xl cards, soft shadows
- High legibility, generous spacing, mobile-first responsive
- No clutter — reassuring, trustworthy tone

