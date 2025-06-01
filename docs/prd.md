# VideoGen Product Requirements Document (PRD)

## Overview
VideoGen is an AI-native, multilingual video generation tool built for real estate professionals. Agents can easily produce professional-grade, branded videos by providing minimal inputs like tone, language, market region, and content focus. The tool supports multi-tenant access and integrates with AI and media APIs to deliver downloadable MP4 videos.

## Goals
- Generate high-quality, voice-narrated property or marketing videos from form inputs
- Support multilingual and multi-tone options for personalization
- Enable preview, download, and sharing of created videos
- Ensure tenant-level data isolation and access control
- Scaffold for scalable billing, usage tracking, and module expansion

## Pages
1. **Landing Page** – Public marketing page featuring feature overview, testimonials, and sample videos.
2. **Authentication Page** – Email-based magic link sign-in using Supabase auth.
3. **Agent Onboarding Page** – Collect agent/company info: name, logo, tone, preferred language, and region.
4. **Dashboard** – Personalized view with project settings, usage stats, and video history.
5. **Generate Video Page** – Input form with fields for:
   - Video purpose (listing, testimonial, market update)
   - Language and tone
   - Region/area
   - Optional market insights or notes
6. **Video Library** – Displays generated videos with thumbnails, creation date, preview, download, and share links.
7. **Admin Panel (Phase 2)** – Usage tracking, module access control, billing overview, and error logs.

## Features

### 🔄 Video Creation Workflow
- Frontend input triggers `/api/ai/generate` with:
  ```json
  {
    "project_id": "tenant_001",
    "module": "video",
    "tone": "professional",
    "language": "en",
    "context": {
      "region": "Vancouver",
      "client_type": "seller",
      "market_data": "Listings up 8% YoY"
    }
  }
  ```
- AI writes script (OpenAI or Claude)
- ElevenLabs synthesizes voice
- RunwayML generates visuals
- Final MP4, thumbnail, voice file, and script are uploaded to Google Cloud Storage
- Metadata stored in Supabase `videos` table (with `project_id`-based isolation)

### 📊 AI Usage Logging
- Logged to `ai_logs` with:
  - Prompt, response
  - Module name
  - Duration, cost, model used
  - Timestamp, user_id, project_id

### 🎛 Multi-Tenant Architecture
- Data access scoped by `project_id`
- RLS policies enforced on all relevant Supabase tables
- Users assigned roles via `user_roles` table: agent, admin, viewer

### 🎚 Module Gating
- Table: `modules_enabled`
- Toggle modules per tenant ("video": true)
- Supports future modules like SmartFollow, ContentCraft

### 🧠 Personalization
- Table: `agent_profile`
- Store preferences (voice model, tone, language, branding)
- Used to pre-fill form and prompt context

### 💳 Billing (Scaffolded in MVP)
- Stripe integration via `user_plans` + `plan_id`
- Plans: Starter ($20), Pro ($39), optional add-ons for voice packs
- Future: Enforce limits via route guards based on `user_plans`

### 📩 Notifications & Help
- Optional: Resend email when new video is ready
- Help center linked via Notion for user onboarding and support

### 📦 Storage Architecture
- All assets stored in Google Cloud Storage (GCS), with paths tagged by `project_id`
- Signed URLs control video access
- Coldline rules can be applied for archiving older assets

## Deployment & Environment
- Deploy via Vercel at `videogen.realenta.com`
- Clone to Windsurf for frontend dev
- Required environment variables:
  - SUPABASE_URL, SUPABASE_ANON_KEY
  - OPENAI_API_KEY, ELEVENLABS_API_KEY
  - STRIPE_SECRET_KEY, GCS_KEY

## Future Considerations
- Admin UI for tenant management
- AI memory: long-term personalization and suggestion tuning
- Support for white-label tenants and additional verticals
- Real-time collaboration for team usage

## Summary
VideoGen is a powerful, AI-powered video tool tailored for real estate agents. It delivers value quickly through automated, branded video generation, while laying the foundation for modular growth, advanced billing, and smart personalization across multiple tenants. This MVP PRD supports a production-grade build on Flowmenta OS, ready for launch and future scaling.
