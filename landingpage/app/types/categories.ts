// app/types/categories.ts
// ─────────────────────────────────────────────────────────────────
// Single source of truth for all resource categories.
// To add/edit a category: update this file only.
// ─────────────────────────────────────────────────────────────────

export interface Category {
  id: string;                  // URL slug  e.g. "option-1"
  label: string;               // Display name
  tagline: string;             // One-liner shown on card hover
  description: string;         // Full paragraph shown on detail page
  accentColor: string;         // Tailwind-safe hex — used for pill + icon ring
  icon: string;                // Lucide icon name (string, resolved in component)
  comingSoon?: boolean;        // Greyed-out badge if not yet published
}

export const categories: Category[] = [
  {
    id: "option-1",
    label: "Option 1",
    tagline: "Coming soon",
    description:
      "This category will cover everything you need to know about Option 1. Full guides, step-by-step breakdowns, and plain-English explanations are on their way.",
    accentColor: "#D6FD70",
    icon: "BookOpen",
    comingSoon: true,
  },
  {
    id: "option-2",
    label: "Option 2",
    tagline: "Coming soon",
    description:
      "Detailed resources for Option 2 are being prepared. Check back soon for comprehensive guides tailored specifically for this topic.",
    accentColor: "#D6FD70",
    icon: "GraduationCap",
    comingSoon: true,
  },
  {
    id: "option-3",
    label: "Option 3",
    tagline: "Coming soon",
    description:
      "Option 3 resources will provide in-depth coverage, practical examples, and expert-reviewed content to help you navigate this area with confidence.",
    accentColor: "#D6FD70",
    icon: "Lightbulb",
    comingSoon: true,
  },
  {
    id: "option-4",
    label: "Option 4",
    tagline: "Coming soon",
    description:
      "We're building out the Option 4 section with clear, actionable guides that remove the jargon and get straight to what matters.",
    accentColor: "#D6FD70",
    icon: "FileText",
    comingSoon: true,
  },
  {
    id: "option-5",
    label: "Option 5",
    tagline: "Coming soon",
    description:
      "Option 5 content is in development. Expect structured articles, checklists, and real-world examples designed to make this topic approachable.",
    accentColor: "#D6FD70",
    icon: "Calculator",
    comingSoon: true,
  },
  {
    id: "option-6",
    label: "Option 6",
    tagline: "Coming soon",
    description:
      "Guides for Option 6 will walk you through every step, from the basics to advanced considerations, in plain language you can actually act on.",
    accentColor: "#D6FD70",
    icon: "ClipboardList",
    comingSoon: true,
  },
  {
    id: "option-7",
    label: "Option 7",
    tagline: "Coming soon",
    description:
      "Option 7 resources are being carefully crafted. When published, you'll find everything you need to understand this area without the overwhelm.",
    accentColor: "#D6FD70",
    icon: "Map",
    comingSoon: true,
  },
  {
    id: "option-8",
    label: "Option 8",
    tagline: "Coming soon",
    description:
      "Comprehensive Option 8 content is on its way — including eligibility criteria, timelines, and worked examples from real scenarios.",
    accentColor: "#D6FD70",
    icon: "Calendar",
    comingSoon: true,
  },
  {
    id: "option-9",
    label: "Option 9",
    tagline: "Coming soon",
    description:
      "Option 9 will be covered with dedicated guides addressing the most common questions and misconceptions in this area.",
    accentColor: "#D6FD70",
    icon: "HelpCircle",
    comingSoon: true,
  },
  {
    id: "option-10",
    label: "Option 10",
    tagline: "Coming soon",
    description:
      "Option 10 resources will include comparison tables, decision flowcharts, and expert commentary to help you make sense of the options available.",
    accentColor: "#D6FD70",
    icon: "BarChart2",
    comingSoon: true,
  },
  {
    id: "option-11",
    label: "Option 11",
    tagline: "Coming soon",
    description:
      "We're developing thorough Option 11 coverage, structured to take you from zero knowledge to full confidence in this subject area.",
    accentColor: "#D6FD70",
    icon: "Layers",
    comingSoon: true,
  },
  {
    id: "option-12",
    label: "Option 12",
    tagline: "Coming soon",
    description:
      "Option 12 content is planned and will bring together essential guidance, FAQs, and downloadable resources once published.",
    accentColor: "#D6FD70",
    icon: "Star",
    comingSoon: true,
  },
];