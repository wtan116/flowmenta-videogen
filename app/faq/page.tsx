import { Metadata } from 'next';
import { FAQSection } from './components/faq-section';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - VideoGen',
  description: 'Get answers to common questions about VideoGen, the AI-powered video generation tool for real estate professionals.',
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions about VideoGen and how it can help you create professional real estate videos.
        </p>
      </div>
      
      <FAQSection />
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          Still have questions? Contact our support team for assistance.
        </p>
        <a 
          href="mailto:support@realenta.com" 
          className="text-primary hover:underline font-medium"
        >
          support@realenta.com
        </a>
      </div>
    </div>
  );
}
