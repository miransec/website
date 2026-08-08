export const siteConfig = {
  name: "Miran",
  fullName: "Miran",
  title: "Miran — AI Engineer",
  description:
    "AI engineer building secure, production-oriented AI systems across RAG, backend infrastructure, retrieval, evaluation, and security.",
  url: "https://muhammadmiran.com",
  domain: "muhammadmiran.com",
  locale: "en_US",
  brandPath: "miran/",
  tagline: "AI engineer building secure, intelligent systems.",
  summary:
    "I build AI systems where models work inside reliable backend, retrieval, authorization, and security boundaries.",
  currently: "AI engineering × cybersecurity",
  availability:
    "Open to AI engineering, applied AI, and secure systems internships.",
  aboutBlurb:
    "My work is centered on retrieval, grounded generation, controlled actions, evaluation, multi-tenant backend systems, and infrastructure that makes AI behavior easier to test and trust.",
  statusLine: "> open to AI engineering internships",
  github: {
    label: "GitHub",
    href: "https://github.com/miransec",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-miran-3672a242",
    placeholder: false,
  },
  email: {
    label: "Email",
    address: "contact@muhammadmiran.com",
    href: "mailto:contact@muhammadmiran.com",
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
  { href: "/projects", label: "work" },
  { href: "/about", label: "about" },
  { href: "/writing", label: "writing" },
  { href: "/contact", label: "contact" },
] as const;
