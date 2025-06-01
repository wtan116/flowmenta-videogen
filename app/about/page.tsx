import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    title: "AI-Powered Video Generation",
    description: "Create professional, voice-narrated property and marketing videos in minutes with minimal input.",
    icon: "🎥"
  },
  {
    title: "Multilingual Support",
    description: "Generate videos in multiple languages to reach a global audience with localized content.",
    icon: "🌍"
  },
  {
    title: "Brand Personalization",
    description: "Customize videos with your branding, tone, and style to maintain a consistent professional image.",
    icon: "🎨"
  },
  {
    title: "Smart Workflow",
    description: "From script generation to final video production, our AI handles the heavy lifting for you.",
    icon: "⚡"
  },
  {
    title: "Secure & Scalable",
    description: "Built with enterprise-grade security and multi-tenant architecture for reliable performance.",
    icon: "🔒"
  },
  {
    title: "Easy Integration",
    description: "Seamlessly integrates with your existing tools and workflows.",
    icon: "🔌"
  },
];

const techStack = [
  {
    category: "AI & Processing",
    items: [
      { name: "OpenAI/Claude", description: "AI script generation" },
      { name: "ElevenLabs", description: "Voice synthesis" },
      { name: "RunwayML", description: "Video generation" },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Supabase", description: "Authentication & database" },
      { name: "Google Cloud Storage", description: "Asset storage" },
      { name: "Next.js 14", description: "Full-stack framework" },
    ],
  },
  {
    category: "Future Ready",
    items: [
      { name: "Multi-tenant", description: "Scalable architecture" },
      { name: "Stripe Integration", description: "Billing & subscriptions" },
      { name: "Modular Design", description: "Easy feature expansion" },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Transform Your Real Estate Marketing
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          VideoGen empowers real estate professionals to create stunning, AI-generated property videos in minutes.
          No technical skills required—just your vision and our powerful AI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { step: 1, title: "Input Details", description: "Provide basic info about your property or market update." },
            { step: 2, title: "AI Magic", description: "Our AI crafts a script and generates visuals automatically." },
            { step: 3, title: "Download & Share", description: "Get your professional video ready to impress clients." },
          ].map((item) => (
            <div key={item.step} className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary text-xl font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Technology Stack</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((section) => (
            <Card key={section.category} className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">{section.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-sm">
                          {item.name}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center bg-muted/50 rounded-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Real Estate Marketing?</h2>
        <p className="text-muted-foreground mb-8">
          Join leading real estate professionals who are already using VideoGen to save time and impress clients with stunning video content.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/sign-up">Get Started Free</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/faq">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
