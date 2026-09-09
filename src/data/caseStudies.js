import { projects } from "./portfolio";

// Editorial expansion of the project facts already supplied in portfolio.js.
// Outcomes stay tied to those facts; no invented users, benchmarks or roles.
const studies = [
  {
    slug: "voiceforge-ai",
    sourceAvailable: false,
    cover: { src: "/case-studies/voiceforge-ai.svg", alt: "System illustration connecting a voice waveform to retrieved documents and source citations", caption: "System illustration: voice interaction, document retrieval, and cited responses." },
    headline: "Voice conversations, grounded in documents.",
    problem: "A voice interface is only as useful as the information behind its answers. VoiceForge AI brings document retrieval into a real-time browser conversation, with source citations that let a user trace an answer back to its evidence.",
    approach: "The system combines a Next.js browser experience with Python and FastAPI services. PostgreSQL and pgvector support the document knowledge layer, while hybrid retrieval and document-aware filtering shape the evidence available to a response. Docker packages the services for deployment.",
    flow: ["Browser voice interaction", "Hybrid document retrieval", "Relevant evidence", "Response with citations"],
    decisions: [
      { title: "Give the response more evidence", body: "The available retrieved context grew from 800 to 6,000 characters. This gives the response a larger evidence window while keeping document retrieval central to the conversation." },
      { title: "Keep retrieval tied to the document", body: "Document-aware filtering keeps answers relevant to their sources. Citations make that relationship visible in the browser experience." },
      { title: "Package the services together", body: "Containerized services bring the browser, API, and retrieval workflow into a deployable full-stack system." },
    ],
    takeaway: "This project connects an interactive voice experience to a grounded retrieval workflow: a browser interface, document data, backend services, and visible source attribution.",
  },
  {
    slug: "tradem8",
    sourceAvailable: false,
    cover: { src: "/case-studies/tradem8.svg", alt: "Illustration combining chart patterns, news and sentiment, and technical indicator validation", caption: "Analysis workflow illustration. The chart is illustrative, not market or performance data." },
    headline: "Chart patterns meet market context.",
    problem: "A chart pattern describes only one part of a market. TradeM8 brings visual pattern detection, technical indicators, financial news, and social sentiment into a confidence-based analysis experience.",
    approach: "The platform uses Python and FastAPI with a React interface and PostgreSQL. YOLOv8 and Transformers form part of the AI stack. CryptoPanic, RSS, and CoinGecko pipelines supply market context alongside chart-pattern analysis.",
    flow: ["Charts and market feeds", "Patterns and sentiment", "Indicator validation", "Confidence-based analysis"],
    decisions: [
      { title: "Combine different kinds of evidence", body: "Chart-pattern detection is considered alongside financial news and social sentiment. The project brings those inputs into one analysis workflow." },
      { title: "Validate signals with indicators", body: "EMA, RSI, and ADX provide additional technical context for the detected signals." },
      { title: "Connect the market-data pipelines", body: "CryptoPanic, RSS, and CoinGecko bring news and market data into the same platform as the visual analysis." },
    ],
    takeaway: "The engineering focus is the integration of computer vision, language-based analysis, external data pipelines, and a full-stack interface for reviewing their combined output.",
  },
  {
    slug: "tecaudex-website-cms",
    cover: { src: "/case-studies/tecaudex-website-cms.svg", alt: "System illustration showing CMS content passing through page generation into a public website", caption: "System illustration: content management, page generation, and delivery." },
    headline: "A company website its team can keep current.",
    problem: "Company pages and project portfolios need to change as the business changes. The Tecaudex platform puts content workflows behind the website so the team can update pages without changing application code.",
    approach: "A Next.js website works with a Ruby on Rails and PostgreSQL stack. Dynamic routes and automated page generation turn managed content into public pages. Search-friendly metadata, inquiry flows, and CDN media delivery complete the publishing experience.",
    flow: ["Team updates content", "CMS content workflows", "Generated website pages", "Visitors and inquiries"],
    decisions: [
      { title: "Separate publishing from code changes", body: "CMS-driven content workflows let the team update the website and portfolio through managed content instead of editing the application." },
      { title: "Treat each page as a discoverable destination", body: "Dynamic routes, automated page generation, and search-friendly metadata support the public content structure." },
      { title: "Complete the visitor journey", body: "Inquiry flows provide a contact path, while CDN integration improves the delivery of the site's media." },
    ],
    takeaway: "The work spans the public interface, content management, backend data, and delivery: the parts needed to maintain a company website beyond its first launch.",
  },
  {
    slug: "darzixpress",
    cover: { src: "/darzi.png", alt: "DarziXpress tailoring service logo with a sewing machine", caption: "DarziXpress project identity, from the original portfolio assets.", kind: "brand" },
    headline: "From finding a tailor to following an order.",
    problem: "A tailoring service involves customers, tailors, and administrators, each with different tasks. DarziXpress connects those roles in one booking and order-management platform, with visibility into an order as it progresses.",
    approach: "The MERN stack—MongoDB, Express, React, and Node.js—supports the web application. Separate role-based journeys organize the booking and management experience, with real-time order tracking and secure email notifications connecting the stages of an order.",
    flow: ["Customer booking", "Tailor workflow", "Order tracking", "Email notifications"],
    decisions: [
      { title: "Design around three distinct roles", body: "Customers, tailors, and administrators have separate flows, keeping their responsibilities clear within the shared platform." },
      { title: "Connect booking to fulfillment", body: "The experience continues beyond the initial booking into order management and real-time tracking." },
      { title: "Keep customers informed", body: "Secure email notifications complement order tracking, bringing updates into the communication flow." },
    ],
    takeaway: "DarziXpress demonstrates a complete service workflow: role-based interfaces, a shared backend, booking, order management, and customer communication.",
  },
];

export const caseStudies = projects.map((project, index) => {
  const study = studies[index];
  return {
    ...project,
    ...study,
    gallery: [
      { ...study.cover, title: study.cover.kind === "brand" ? "Project identity" : "System overview", width: study.cover.kind === "brand" ? 401 : 1440, height: study.cover.kind === "brand" ? 391 : 810 },
      { src: `/case-studies/${study.slug}-workflow.svg`, title: "How it works", alt: `${project.title} workflow: ${study.flow.join(", ")}`, caption: "An illustrated walkthrough of the project's implementation.", width: 1440, height: 900 },
      { src: `/case-studies/${study.slug}-detail.svg`, title: "A closer look", alt: `${project.title}: ${study.decisions[0].title}`, caption: `Implementation illustration: ${study.decisions[0].title.toLowerCase()}.`, width: 1440, height: 900 },
    ],
  };
});
