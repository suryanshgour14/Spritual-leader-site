# Sadhvi Samahita Ji — Official Website

Official website for Sadhvi Samahita Didi, katha vachak and spiritual guide based in Shri Dham Vrindavan.

## Requirements

- Node.js 18+
- npm 9+

## Setup

```bash
# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — loads in Hindi by default.  
English version: [http://localhost:3000/en](http://localhost:3000/en)

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `YOUTUBE_API_KEY` | YouTube Data API v3 key (for live detection + satsang page) |
| `YOUTUBE_CHANNEL_ID` | Didi's YouTube channel ID (from channel URL) |
| `EMAILJS_SERVICE_ID` | EmailJS service ID (for contact form) |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Primary WhatsApp number (no `+`, e.g. `918650620909`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER_2` | Secondary WhatsApp number |
| `NEXT_PUBLIC_EMAIL` | Contact email address |

## Full Specification

See `CLAUDE.md` for the complete project specification including:
- Tech stack details
- Color palette and design tokens
- Page-by-page spec
- Folder structure
- Component specs
- i18n (Hindi/English) setup
- Content JSON schemas
- Mobile responsiveness rules
