// ─────────────────────────────────────────────────────────────────────────────
// BLOG DATA — Single source of truth
// To add a new blog post: copy a BlogPost object, give it a unique slug,
// fill in the fields, and add it to the POSTS array.
// To add a category: add it to CATEGORIES and use the slug in a post's category field.
// ─────────────────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;           // URL: /resources/your-slug-here
  title: string;          // SEO title & card heading
  excerpt: string;        // Short description shown on cards (max ~160 chars)
  category: string;       // Must match a Category slug below
  author: string;
  authorRole: string;
  date: string;           // ISO format: "2026-05-01"
  readTime: string;       // e.g. "5 min read"
  image: string;          // Path from /public or external URL
  featured: boolean;      // If true, shows as the featured hero post (only one should be true)
  // Full article content — each block renders differently
  content: ContentBlock[];
  // SEO
  metaDescription?: string; // Defaults to excerpt if not set
  keywords?: string[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "bulletList"; items: string[] }
  | { type: "numberedList"; items: string[] }
  | { type: "divider" };

export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;           // Tailwind-compatible hex or CSS color for accent
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES — Add or rename freely
// ─────────────────────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  { slug: "option-1",  name: "Option 1",  description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-2",  name: "Option 2",  description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-3",  name: "Option 3",  description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-4",  name: "Option 4",  description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-5",  name: "Option 5",  description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-6",  name: "Option 6",  description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-7",  name: "Option 7",  description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-8",  name: "Option 8",  description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-9",  name: "Option 9",  description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-10", name: "Option 10", description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-11", name: "Option 11", description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
  { slug: "option-12", name: "Option 12", description: "Explore articles and guides in this category. More content coming soon.", color: "#D6FD70" },
];

// ─────────────────────────────────────────────────────────────────────────────
// POSTS — Add new blog posts here
// ─────────────────────────────────────────────────────────────────────────────
export const POSTS: BlogPost[] = [
  {
    slug: "understanding-uk-student-finance",
    title: "Understanding UK Student Finance: A Complete Guide for 2026",
    excerpt: "Navigating student finance in the UK can feel overwhelming. This guide breaks down everything you need to know about tuition fee loans, maintenance loans, and how to apply.",
    category: "option-1",
    author: "Primeleed HR",
    authorRole: "Student Finance Advisor",
    date: "2026-05-01",
    readTime: "8 min read",
    image: "/blog/blog-1.jpg",
    featured: true,
    metaDescription: "A complete guide to UK student finance in 2026 — covering tuition fee loans, maintenance loans, eligibility, and how to apply step by step.",
    keywords: ["UK student finance", "tuition fee loan", "maintenance loan", "student loan 2026"],
    content: [
      {
        type: "paragraph",
        text: "Student finance in the UK is one of the most misunderstood systems in higher education. Many eligible students miss out on thousands of pounds every year simply because they believe myths about who qualifies. This guide cuts through the confusion.",
      },
      {
        type: "heading",
        text: "What is Student Finance?",
      },
      {
        type: "paragraph",
        text: "Student Finance England (SFE) provides two main types of financial support: a Tuition Fee Loan to cover your course costs (up to £9,250 per year), and a Maintenance Loan paid directly to you to help with living costs (up to £13,022 per year depending on your circumstances).",
      },
      {
        type: "quote",
        text: "You don't repay anything until you're earning over £25,000 per year — and even then, repayments are income-based and manageable.",
        attribution: "Student Finance England",
      },
      {
        type: "heading",
        text: "Who Qualifies?",
      },
      {
        type: "paragraph",
        text: "Eligibility depends on your nationality, residency, and prior study history. Most UK nationals and many EU nationals with settled or pre-settled status qualify. There is no age limit for tuition fee loans.",
      },
      {
        type: "bulletList",
        items: [
          "UK nationals living in England",
          "EU nationals with settled or pre-settled status",
          "Irish nationals resident in the UK",
          "ILR holders who have lived in the UK for 3+ years",
          "Refugees and their family members",
        ],
      },
      {
        type: "heading",
        text: "How to Apply",
      },
      {
        type: "numberedList",
        items: [
          "Check your eligibility using our free eligibility checker",
          "Create a Student Finance account at gov.uk",
          "Complete your application before the deadline",
          "Submit supporting documents if requested",
          "Your loan is paid directly to your university each term",
        ],
      },
      {
        type: "quote",
        text: "Many people think they won't qualify because they didn't study in the UK or they work full-time. These are myths. The criteria are broader than most people realise.",
      },
      {
        type: "heading",
        text: "Common Misconceptions",
      },
      {
        type: "paragraph",
        text: "The most damaging myth is that student finance is only for school leavers. Adults returning to education, career changers, and people who have previously studied abroad can all potentially qualify. If you're unsure, the fastest way to find out is to use our free eligibility checker — it takes under 60 seconds.",
      },
    ],
  },
  {
    slug: "5-myths-about-student-loans",
    title: "5 Myths About Student Loans That Are Stopping You From Applying",
    excerpt: "From 'I'm too old' to 'I work full-time so I can't study' — we break down the five most common myths that stop eligible people from claiming the funding they deserve.",
    category: "option-2",
    author: "Primeleed HR",
    authorRole: "Student Finance Advisor",
    date: "2026-04-20",
    readTime: "5 min read",
    image: "/blog/blog-2.jpg",
    featured: false,
    metaDescription: "Think you're not eligible for a student loan? Read the 5 biggest myths about UK student finance and find out why you might qualify after all.",
    keywords: ["student loan myths", "UK student finance eligibility", "adult learners", "part-time study"],
    content: [
      {
        type: "paragraph",
        text: "Every day, eligible people across the UK miss out on thousands of pounds in student funding because of myths and misinformation. Here are the five we hear most often — and the truth behind each one.",
      },
      {
        type: "heading",
        text: "Myth 1: I'm Too Old",
      },
      {
        type: "paragraph",
        text: "There is no upper age limit for a tuition fee loan in the UK. Whether you are 25 or 55, if you meet the residency and nationality requirements, you can apply. The maintenance loan does have some age-related restrictions, but the tuition fee loan does not.",
      },
      {
        type: "heading",
        text: "Myth 2: I Work Full-Time So I Can't Study",
      },
      {
        type: "paragraph",
        text: "Student finance does not require you to study full-time. Many universities offer part-time, evening, and weekend courses that are fully compatible with working life. You can study while employed and still receive a loan.",
      },
      {
        type: "heading",
        text: "Myth 3: I Didn't Study in the UK So I'm Not Eligible",
      },
      {
        type: "paragraph",
        text: "Where you previously studied has no bearing on your eligibility for UK student finance. What matters is your nationality and your UK residency history.",
      },
      {
        type: "heading",
        text: "Myth 4: I Don't Have My Certificates",
      },
      {
        type: "paragraph",
        text: "You do not need academic certificates to apply for student finance. The application is about funding your course — not proving your past academic history. Universities assess your qualifications separately during admissions.",
      },
      {
        type: "heading",
        text: "Myth 5: I Had a Loan Before So I Can't Get Another",
      },
      {
        type: "paragraph",
        text: "Previous study or loans do not automatically disqualify you. The key factor is how many years of prior funding you have received. Most students who studied for 3 years or fewer still have remaining entitlement.",
      },
      {
        type: "quote",
        text: "The fastest way to find out if you qualify is to use our free eligibility checker. It takes under 60 seconds and requires no documents.",
      },
    ],
  },
  {
    slug: "eu-nationals-student-finance-guide",
    title: "EU Nationals & UK Student Finance: What You Need to Know",
    excerpt: "If you're an EU national living in the UK, your eligibility for student finance depends on your settlement status. Here's exactly what you need to know before applying.",
    category: "option-3",
    author: "Primeleed HR",
    authorRole: "Student Finance Advisor",
    date: "2026-04-10",
    readTime: "6 min read",
    image: "/blog/blog-3.jpg",
    featured: false,
    metaDescription: "EU nationals with settled or pre-settled status may qualify for UK student finance. This guide explains the rules, requirements, and how to apply.",
    keywords: ["EU national student finance", "settled status student loan", "pre-settled status", "EU student UK"],
    content: [
      {
        type: "paragraph",
        text: "Since Brexit, the rules around EU nationals and UK student finance have changed significantly. However, many EU nationals — particularly those with settled or pre-settled status — remain eligible for the same support as UK nationals.",
      },
      {
        type: "heading",
        text: "The Key Requirement: EU Settlement Scheme Status",
      },
      {
        type: "paragraph",
        text: "To qualify for student finance as an EU national, you generally need to hold either Settled Status or Pre-Settled Status under the EU Settlement Scheme, and you must have been living in the UK for at least 3 years before your course starts.",
      },
      {
        type: "bulletList",
        items: [
          "Settled Status (indefinite leave to remain) — full eligibility",
          "Pre-Settled Status — eligible in most cases",
          "No status — not currently eligible",
        ],
      },
      {
        type: "heading",
        text: "Which EU Countries Are Included?",
      },
      {
        type: "paragraph",
        text: "The rules apply to nationals of all 27 EU member states, plus Switzerland, Norway, Iceland, and Liechtenstein (EEA countries). Irish nationals are treated separately and have the same rights as UK nationals.",
      },
      {
        type: "quote",
        text: "Having Pre-Settled Status does not mean you are ineligible. Many people with Pre-Settled Status successfully receive full student finance support.",
      },
      {
        type: "heading",
        text: "What Support Can You Get?",
      },
      {
        type: "paragraph",
        text: "Eligible EU nationals can access both the Tuition Fee Loan (up to £9,250/year) and in most cases the Maintenance Loan. The exact amount of maintenance support depends on your household income and where you study.",
      },
      {
        type: "heading",
        text: "Next Steps",
      },
      {
        type: "paragraph",
        text: "The fastest way to find out whether you personally qualify is to use our free eligibility checker. It covers EU nationals specifically and gives you a clear answer in under 60 seconds — with no documents required.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS — Used by pages, do not edit
// ─────────────────────────────────────────────────────────────────────────────
export function getAllPosts(): BlogPost[] {
  return POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPost(): BlogPost | undefined {
  return POSTS.find((p) => p.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return POSTS.filter((p) => p.category === categorySlug).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}