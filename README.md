# Noah AI - Landing Page

The official landing page for **Noah AI**, an intelligent health companion designed for older adults and their caregivers.

## About Noah AI

Noah AI is a voice-first mobile application that helps elderly users manage their health with warmth and simplicity. The app provides:

- **Voice Conversations** — Talk naturally anytime you need support
- **Medication Management** — Smart reminders, photo scanning, progress tracking
- **Doctor Visit Recording** — Hands-free recording with AI transcription and summaries
- **Emergency Contacts** — One-tap calling to trusted family members
- **Cognitive Stimulation** — Games and activities to stay sharp

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Language:** TypeScript
- **UI Components:** Radix UI + shadcn/ui
- **Internationalization:** Custom i18n (English + Spanish)
- **Deployment:** Vercel

## Color Palette — "Vintage Rasta"

| Color | Hex | Usage |
|-------|-----|-------|
| Ink | `#1F3842` | Primary text, CTAs |
| Sage | `#7EA088` | Brand accent, success states |
| Amber | `#D4A24D` | Warm accent, highlights |
| Terracotta | `#A95535` | Emergency, alerts |
| Cream | `#F5F1EA` | Backgrounds |

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Features

- Bilingual support (EN/ES) with one-click language toggle
- Fully responsive design (mobile-first)
- Animated hero with phone mockup and voice waveform
- Stats section highlighting problems Noah solves
- Interactive feature previews (chat, recording, medication tracking)
- Auto-scrolling testimonial carousel
- Accordion FAQ section
- SEO optimized with Open Graph and Twitter cards
- Custom SVG favicon (Noah N-mark)

## Project Structure

```
├── app/
│   ├── globals.css          # Theme variables & Tailwind config
│   ├── layout.tsx           # Root layout with SEO meta tags
│   └── page.tsx             # Main landing page
├── components/
│   ├── header.tsx           # Navigation with language toggle
│   ├── hero-section.tsx     # Hero with phone mockup
│   ├── stats-section.tsx    # Problem statistics cards
│   ├── services-section.tsx # 5 core features
│   ├── features-section.tsx # Detailed features + how it works
│   ├── cta-section.tsx      # Call to action with image
│   ├── testimonials-section.tsx # Auto-scroll testimonials
│   ├── faq-section.tsx      # FAQ accordion
│   └── footer.tsx           # Footer with links
├── lib/
│   ├── i18n.ts              # Translation strings (EN + ES)
│   └── language-context.tsx # React context for language state
└── public/
    ├── favicon.svg          # Noah N-mark favicon
    └── og-image.svg         # Open Graph social image
```

## Deployment

This project is configured for deployment on Vercel. Push to `main` to trigger automatic deployments.

## License

Proprietary — Pixpel.io
