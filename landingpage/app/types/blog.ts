// types/blog.ts
// ─────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for all blog posts.
// To add a new post: add one object to blogPosts[].
// The listing page and the detail page both read from here automatically.
// ─────────────────────────────────────────────────────────────────

// ── Content block types ──────────────────────────────────────────
// Each blog body is an array of typed blocks — no raw HTML strings.
// This makes content safe, maintainable, and easy to style globally.

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "bullets"; items: string[] }
  | { type: "callout"; text: string }   // lime-accented highlight box
  | { type: "divider" };

// ── BlogPost interface ───────────────────────────────────────────
export interface BlogPost {
  id: string;           // URL slug: /resources/[id]
  title: string;
  excerpt: string;      // shown on listing cards
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;        // filename under /public/blog/
  featured?: boolean;
  content: ContentBlock[];
}

// ── Blog data ────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  // ── POST 1 ────────────────────────────────────────────────────
  {
    id: "what-is-student-finance",
    title: "What Is Student Finance and Who Can Apply?",
    excerpt:
      "A plain-English breakdown of the UK student finance system — tuition fee loans, maintenance loans, and who is actually eligible to apply.",
    category: "Student Finance",
    author: "Eligiby Team",
    date: "10 May 2026",
    readTime: "5 min read",
    image: "blog-hero-1.jpg",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "If you've ever searched 'student finance UK' and come away more confused than before, you're not alone. The system is full of jargon, moving parts, and eligibility rules that feel impossible to decode. This guide cuts through all of it.",
      },
      {
        type: "heading",
        text: "What Is Student Finance?",
      },
      {
        type: "paragraph",
        text: "Student Finance England (SFE) is a government service that provides loans to eligible students in England to help cover the cost of going to university or college. There are two main types of support:",
      },
      {
        type: "bullets",
        items: [
          "Tuition Fee Loan — paid directly to your university, covering up to £9,250 per year.",
          "Maintenance Loan — paid directly to you, to help with living costs like rent, food, and travel.",
          "Grants and bursaries — some students may also qualify for non-repayable support based on household income.",
        ],
      },
      {
        type: "heading",
        text: "Who Is Eligible?",
      },
      {
        type: "paragraph",
        text: "Eligibility is broader than most people realise. You don't need top grades, previous qualifications, or a certain age. The core criteria are:",
      },
      {
        type: "bullets",
        items: [
          "You are a UK national or have settled/pre-settled status.",
          "You normally live in England (Scotland, Wales, and Northern Ireland have separate systems).",
          "You are studying at an eligible UK university or college.",
          "You have not previously completed a degree at the same level.",
        ],
      },
      {
        type: "callout",
        text: "Even if you studied before, started a course and dropped out, or have a non-traditional background — you may still qualify. Use our free eligibility checker to find out in 60 seconds.",
      },
      {
        type: "heading",
        text: "How Much Maintenance Loan Can You Get?",
      },
      {
        type: "paragraph",
        text: "The maintenance loan amount depends on three factors: where you study, where you live while studying, and your household income. For the 2025/26 academic year, amounts range from approximately £8,877 to £13,348 per year for students studying in London.",
      },
      {
        type: "quote",
        text: "Student finance isn't a gift — it's an investment in yourself. And crucially, you only repay it when you're earning above the threshold, and any remaining balance is written off after 40 years.",
        attribution: "Eligiby",
      },
      {
        type: "heading",
        text: "When Do You Repay It?",
      },
      {
        type: "paragraph",
        text: "Repayment is income-contingent. From April 2026, you only start repaying once you earn over £25,000 per year. Repayments are 9% of anything above that threshold — so if you earn £27,000, you repay 9% of £2,000, which is £180 per year (£15 per month). If your income drops, repayments stop automatically.",
      },
      {
        type: "callout",
        text: "Ready to find out what you're entitled to? Run your free eligibility check — it takes 60 seconds and requires no documents.",
      },
    ],
  },
  

  // ── POST 2 ────────────────────────────────────────────────────
  {
    id: "maintenance-loan-explained",
    title: "The Maintenance Loan Explained: How Much Could You Get?",
    excerpt:
      "Your maintenance loan amount depends on where you study, where you live, and your household income. Here's exactly how it's calculated.",
    category: "Maintenance Loan",
    author: "Eligiby Team",
    date: "5 May 2026",
    readTime: "4 min read",
    image: "blog-hero-2.jpg",
    content: [
      {
        type: "paragraph",
        text: "The maintenance loan is the part of student finance most people overlook — but it can make or break your ability to actually afford to study. Unlike the tuition fee loan which goes straight to your university, the maintenance loan lands in your bank account every term.",
      },
      {
        type: "heading",
        text: "What Affects Your Maintenance Loan Amount?",
      },
      {
        type: "paragraph",
        text: "Three variables determine how much you receive each year. Understanding each one helps you estimate what you're likely to get before you even apply.",
      },
      {
        type: "subheading",
        text: "1. Where you study",
      },
      {
        type: "paragraph",
        text: "Students studying in London receive a significantly higher maintenance loan to account for the higher cost of living in the capital. The difference can be several thousand pounds per year.",
      },
      {
        type: "subheading",
        text: "2. Where you live while studying",
      },
      {
        type: "paragraph",
        text: "Students living at home with parents receive a lower amount than those who move into rented accommodation. This reflects the assumption that home-living students have lower living costs.",
      },
      {
        type: "subheading",
        text: "3. Household income",
      },
      {
        type: "paragraph",
        text: "This is where it gets nuanced. The full loan is available to students from households earning under approximately £25,000 per year. As household income rises, the amount decreases — but every eligible student receives a minimum baseline loan regardless of income.",
      },
      {
        type: "heading",
        text: "2025/26 Maintenance Loan Amounts",
      },
      {
        type: "bullets",
        items: [
          "Living at home: up to £8,877 per year",
          "Living away from home (outside London): up to £10,227 per year",
          "Living away from home (in London): up to £13,348 per year",
          "Living abroad for a year: up to £11,116 per year",
        ],
      },
      {
        type: "callout",
        text: "These figures are for 2025/26. Amounts are reviewed annually and typically increase slightly each year.",
      },
      {
        type: "heading",
        text: "Does Household Income Always Reduce the Loan?",
      },
      {
        type: "paragraph",
        text: "Yes — but not dramatically for most families. Even students from households earning £60,000+ per year receive around 65% of the maximum loan. The reduction is gradual, not a cliff edge. And if your parents or partner's income drops significantly in the year you apply (for example, due to redundancy), you can apply for a Current Year Income Assessment to recalculate based on the actual figure.",
      },
      {
        type: "quote",
        text: "The maintenance loan is not means-tested out of reach for middle-income families. Most students receive a meaningful amount regardless of household income.",
        attribution: "Eligiby",
      },
      {
        type: "heading",
        text: "When Is It Paid?",
      },
      {
        type: "paragraph",
        text: "The maintenance loan is split into three instalments, paid at the start of each academic term directly into your bank account. You'll typically receive the first payment a few days before or at the start of term, so it's important to apply well in advance of your course start date.",
      },
      {
        type: "callout",
        text: "Want to know exactly how much you're entitled to? Our free eligibility checker gives you a personalised estimate in under 60 seconds.",
      },
    ],
  },
  {
    id: "maintenance-loans-explained",
    title: "The Maintenance Loan Explained: How Much Could You Get?",
    excerpt:
      "Your maintenance loan amount depends on where you study, where you live, and your household income. Here's exactly how it's calculated.",
    category: "Maintenance Loan",
    author: "Eligiby Team",
    date: "5 May 2026",
    readTime: "4 min read",
    image: "blog-hero-2.jpg",
    content: [
      {
        type: "paragraph",
        text: "The maintenance loan is the part of student finance most people overlook — but it can make or break your ability to actually afford to study. Unlike the tuition fee loan which goes straight to your university, the maintenance loan lands in your bank account every term.",
      },
      {
        type: "heading",
        text: "What Affects Your Maintenance Loan Amount?",
      },
      {
        type: "paragraph",
        text: "Three variables determine how much you receive each year. Understanding each one helps you estimate what you're likely to get before you even apply.",
      },
      {
        type: "subheading",
        text: "1. Where you study",
      },
      {
        type: "paragraph",
        text: "Students studying in London receive a significantly higher maintenance loan to account for the higher cost of living in the capital. The difference can be several thousand pounds per year.",
      },
      {
        type: "subheading",
        text: "2. Where you live while studying",
      },
      {
        type: "paragraph",
        text: "Students living at home with parents receive a lower amount than those who move into rented accommodation. This reflects the assumption that home-living students have lower living costs.",
      },
      {
        type: "subheading",
        text: "3. Household income",
      },
      {
        type: "paragraph",
        text: "This is where it gets nuanced. The full loan is available to students from households earning under approximately £25,000 per year. As household income rises, the amount decreases — but every eligible student receives a minimum baseline loan regardless of income.",
      },
      {
        type: "heading",
        text: "2025/26 Maintenance Loan Amounts",
      },
      {
        type: "bullets",
        items: [
          "Living at home: up to £8,877 per year",
          "Living away from home (outside London): up to £10,227 per year",
          "Living away from home (in London): up to £13,348 per year",
          "Living abroad for a year: up to £11,116 per year",
        ],
      },
      {
        type: "callout",
        text: "These figures are for 2025/26. Amounts are reviewed annually and typically increase slightly each year.",
      },
      {
        type: "heading",
        text: "Does Household Income Always Reduce the Loan?",
      },
      {
        type: "paragraph",
        text: "Yes — but not dramatically for most families. Even students from households earning £60,000+ per year receive around 65% of the maximum loan. The reduction is gradual, not a cliff edge. And if your parents or partner's income drops significantly in the year you apply (for example, due to redundancy), you can apply for a Current Year Income Assessment to recalculate based on the actual figure.",
      },
      {
        type: "quote",
        text: "The maintenance loan is not means-tested out of reach for middle-income families. Most students receive a meaningful amount regardless of household income.",
        attribution: "Eligiby",
      },
      {
        type: "heading",
        text: "When Is It Paid?",
      },
      {
        type: "paragraph",
        text: "The maintenance loan is split into three instalments, paid at the start of each academic term directly into your bank account. You'll typically receive the first payment a few days before or at the start of term, so it's important to apply well in advance of your course start date.",
      },
      {
        type: "callout",
        text: "Want to know exactly how much you're entitled to? Our free eligibility checker gives you a personalised estimate in under 60 seconds.",
      },
    ],
  },
  // ── POST 3 ────────────────────────────────────────────────────
  {
    id: "no-prior-qualifications",
    title: "Can You Get Student Finance Without Prior Qualifications?",
    excerpt:
      "Many people assume they need A-levels or a degree to qualify. The reality is more flexible — and more accessible — than you might think.",
    category: "Eligibility",
    author: "Eligiby Team",
    date: "28 Apr 2026",
    readTime: "3 min read",
    image: "blog-hero-3.jpg",
    content: [
      {
        type: "paragraph",
        text: "One of the most persistent myths about student finance is that it's only for school-leavers with A-levels heading to a traditional university. In reality, the UK student finance system is designed to be far more inclusive than that.",
      },
      {
        type: "heading",
        text: "Do You Need Specific Qualifications?",
      },
      {
        type: "paragraph",
        text: "Student Finance England does not require you to hold specific prior qualifications to receive a loan. What matters is that you are accepted onto and enrolled in an eligible course at an approved institution — not how you got there.",
      },
      {
        type: "callout",
        text: "Student Finance England does not set entry requirements. Entry requirements are set by universities and colleges — and many offer access courses, foundation years, and alternative entry routes.",
      },
      {
        type: "heading",
        text: "What About People Returning to Education?",
      },
      {
        type: "paragraph",
        text: "The system actively accommodates adult learners returning to education after time in work, family life, or other circumstances. Key rules to understand:",
      },
      {
        type: "bullets",
        items: [
          "Age is not a barrier — there is no upper age limit for receiving a maintenance loan.",
          "Previous study matters more than qualifications — if you previously completed a full degree, you generally cannot get funding for another at the same level.",
          "Partial previous study may still allow full funding — if you started a degree but left before completing it, you may still qualify depending on how much you completed.",
          "Foundation years are fully fundable — if you need a foundation year before your main degree, student finance can cover this in many cases.",
        ],
      },
      {
        type: "heading",
        text: "What About Access to Higher Education Diplomas?",
      },
      {
        type: "paragraph",
        text: "Access to HE Diplomas are specifically designed for adults without traditional qualifications who want to move into higher education. They are one year full-time (or two years part-time) and are fully eligible for student finance — including both the tuition fee loan and the maintenance loan.",
      },
      {
        type: "quote",
        text: "The Access to HE Diploma is the most underused route into higher education in the UK. Thousands of people who assumed university was closed to them have used it to change their careers entirely.",
        attribution: "Eligiby",
      },
      {
        type: "heading",
        text: "What If I Have a Degree from Another Country?",
      },
      {
        type: "paragraph",
        text: "An overseas degree does not automatically disqualify you from UK student finance. The rules around equivalent or lower qualifications (ELQ) are complex and depend on the level and equivalency of your overseas award. In many cases, overseas qualifications do not count against you. This is one area where a personalised eligibility check is essential.",
      },
      {
        type: "heading",
        text: "The Bottom Line",
      },
      {
        type: "paragraph",
        text: "If you're worried that your background — no A-levels, a gap in education, an incomplete degree, or qualifications from overseas — disqualifies you from student finance, the most important thing you can do is check. Don't assume. The rules are genuinely more accommodating than most people expect.",
      },
      {
        type: "callout",
        text: "Check your eligibility for free in 60 seconds. No documents needed at this stage — just a few quick questions.",
      },
    ],
  },
];

// ── Helper to find a post by slug ─────────────────────────────────
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.id === slug);
}

// ── All slugs (for generateStaticParams) ─────────────────────────
export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.id);
}