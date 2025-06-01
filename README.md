<div align="center">
  <h1>VideoGen</h1>
  <p>AI-powered video generation for real estate professionals</p>
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fflowmenta-videogen)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## 🎯 Overview

VideoGen is an AI-native, multilingual video generation tool built specifically for real estate professionals. Create professional-grade, branded videos with minimal input - just provide the tone, language, market region, and content focus. The platform supports multi-tenant access and integrates with leading AI and media APIs to deliver downloadable MP4 videos.

## ✨ Features

- **AI-Powered Video Creation** - Generate professional videos with AI-generated scripts, voiceovers, and visuals
- **Multilingual Support** - Create content in multiple languages with region-specific market insights
- **Brand Customization** - Personalize videos with your branding, tone, and style preferences
- **Multi-Tenant Architecture** - Secure, isolated workspaces for different teams and organizations
- **Easy Integration** - Built with Next.js, Supabase, and popular AI APIs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase project ([create one here](https://app.supabase.com))
- API keys for:
  - OpenAI (for script generation)
  - ElevenLabs (for voice synthesis)
  - Google Cloud Storage (for asset storage)
  - Stripe (for billing, optional in MVP)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flowmenta-videogen.git
   cd flowmenta-videogen# Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   
   # AI Services
   OPENAI_API_KEY=your-openai-key
   ELEVENLABS_API_KEY=your-elevenlabs-key
   
   # Storage
   GCS_BUCKET=your-gcs-bucket
   GCS_KEY=your-gcs-key