

# AI Chatbot Interface — Upgrade Plan

## What Changes

### 1. New Components
- **`src/components/ChatMessage.tsx`** — Standalone message bubble component with avatar, timestamp, RTL-aware alignment. User messages right-aligned (or left in RTL), assistant messages left-aligned with persona icon.
- **`src/components/ChatContainer.tsx`** — Chat logic container: manages messages state, persona selection screen, quick action buttons, mock response function. Imported by `ChatBot.tsx`.

### 2. Rewrite `src/components/ChatBot.tsx`
- Larger floating window: `w-[420px] h-[600px]` (expandable to near full-screen on mobile)
- **Persona selection screen**: On open, show 3 large cards (not small tabs):
  - "Conseiller ORP" — Briefcase icon, blue theme
  - "Conseiller Caisse" — Banknote icon, green theme  
  - "Assistant Social" — Heart icon, orange theme
- After selection, transition to chat view with:
  - Colored header bar matching persona theme
  - Welcome message in current language
  - **Quick action buttons** below welcome: 3 pill-shaped suggestion buttons
  - Modern WhatsApp-style bubbles via `ChatMessage.tsx`
  - Ability to switch persona (resets conversation)

### 3. Mock Response System
- `mockResponse(persona, userMessage)` function in `ChatContainer.tsx`
- Returns persona-appropriate placeholder text (i18n-aware)
- Simulates typing delay (800ms) with a "typing..." indicator
- Designed for easy replacement with real AI API call

### 4. i18n Updates (`src/i18n/locales.ts`)
- Add keys for all 8 languages:
  - `quickActionDeadlines` — "Quels sont mes délais ce mois ?"
  - `quickActionCV` — "Aidez-moi pour mon CV"
  - `quickActionGain` — "Comment déclarer un gain intermédiaire ?"
  - `chooseAdvisor` — "Choisissez votre conseiller"
  - `changeAdvisor` — "Changer de conseiller"
  - `typing` — "En train d'écrire..."

### 5. RTL Support
- Chat bubbles use `ms-auto`/`me-auto` (logical properties) for correct RTL flip
- Input area and quick action buttons use `rtl:flex-row-reverse`
- Persona selection cards work in both directions

## File Summary

| File | Action |
|------|--------|
| `src/components/ChatMessage.tsx` | Create |
| `src/components/ChatContainer.tsx` | Create |
| `src/components/ChatBot.tsx` | Rewrite |
| `src/i18n/locales.ts` | Add ~6 new keys × 8 languages |

