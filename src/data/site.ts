export const siteConfig = {
  name: "Miran",
  fullName: "Miran",
  title: "Miran — AI Engineer",
  description:
    "AI engineer building secure production-oriented systems across agentic AI, RAG, backend engineering and AI security.",
  url: "https://muhammadmiran.com",
  domain: "muhammadmiran.com",
  locale: "en_US",
  positioning: "AI Engineer · Agentic Systems · RAG · Backend · Security",
  tagline: "AI Engineer building secure, production-oriented AI systems.",
  summary:
    "I build AI systems that combine model intelligence with reliable backend engineering, retrieval, security, evaluation, and production infrastructure.",
  statusLine: "Currently building VaaniDesk and AtlasCore.",
  github: {
    label: "GitHub",
    href: "https://github.com/Mod-With-Miran",
  },
  linkedin: {
    label: "LinkedIn",
    href: null as string | null,
    placeholder: true,
  },
  email: {
    label: "Email",
    href: null as string | null,
    placeholder: true,
  },
  resume: {
    path: "/resume.pdf",
    available: false,
  },
  profileImage: {
    path: "/profile.jpg",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;
