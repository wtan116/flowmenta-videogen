import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const techStack = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js 14", description: "React framework for server-rendered applications" },
      { name: "TypeScript", description: "Strongly typed JavaScript" },
      { name: "Shadcn UI", description: "Beautifully designed components" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Next.js API Routes", description: "Serverless API endpoints" },
      { name: "Supabase", description: "Open source Firebase alternative" },
      { name: "PostgreSQL", description: "Powerful open source database" },
    ],
  },
  {
    category: "Deployment",
    items: [
      { name: "Vercel", description: "Cloud platform for static and serverless deployment" },
      { name: "GitHub Actions", description: "CI/CD pipeline automation" },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About Flowmenta VideoGen</h1>
      
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-lg text-muted-foreground mb-6 text-center">
          A modern video generation platform built with cutting-edge web technologies to deliver
          exceptional performance and developer experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techStack.map((section) => (
          <Card key={section.category} className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl">{section.category}</CardTitle>
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

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Why This Stack?</h2>
        <div className="max-w-3xl mx-auto text-muted-foreground space-y-4">
          <p>
            We've carefully selected these technologies to ensure a fast, scalable, and maintainable
            application. The combination of Next.js, TypeScript, and Supabase provides a robust
            foundation for both frontend and backend development.
          </p>
          <p>
            The use of modern tooling and best practices ensures excellent developer experience
            and high performance for end-users.
          </p>
        </div>
      </div>
    </div>
  );
}
