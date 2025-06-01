'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is VideoGen?",
    answer: "VideoGen is an AI-native, multilingual video generation tool built specifically for real estate professionals. It allows agents to easily produce professional-grade, branded videos with minimal inputs like tone, language, market region, and content focus."
  },
  {
    question: "How does the video generation process work?",
    answer: "The process is simple: 1) Fill out a form with your video requirements, 2) Our AI writes a script and generates visuals, 3) Voice narration is added, and 4) You receive a downloadable MP4 video. The entire process is automated and takes just minutes."
  },
  {
    question: "What information do I need to provide to create a video?",
    answer: "You'll need to provide: the video's purpose (listing, testimonial, market update), preferred language and tone, target region/area, and any specific market insights or notes you'd like included."
  },
  {
    question: "Is there a limit to how many videos I can create?",
    answer: "Limits depend on your subscription plan. The Starter plan includes a set number of videos per month, while the Pro plan offers more. Additional videos can be purchased as add-ons."
  },
  {
    question: "Can I customize the videos with my branding?",
    answer: "Yes! During onboarding, you can add your company logo, choose colors, and set your preferred tone and style. These preferences will be automatically applied to all your videos."
  },
  {
    question: "What languages are supported?",
    answer: "VideoGen supports multiple languages. You can select your preferred language when creating a video, and the script and narration will be generated accordingly."
  },
  {
    question: "How do I access my created videos?",
    answer: "All your videos are stored in your Video Library, where you can preview, download, or share them. You'll also receive email notifications when new videos are ready."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade security measures including data encryption, secure authentication, and strict access controls. Your data is isolated by project ID and protected by robust security policies."
  }
];

export function FAQSection() {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b">
            <AccordionTrigger className="text-left hover:no-underline">
              <h3 className="text-lg font-medium">{faq.question}</h3>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
