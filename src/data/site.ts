export const siteConfig = {
  name: "Miran",
  fullName: "Miran",
  title: "Miran — AI Engineer",
  description:
    "AI engineer building secure production-oriented systems across agentic AI, RAG, backend engineering and AI security.",
  url: "https://muhammadmiran.com",
  domain: "muhammadmiran.com",
  locale: "en_US",
  brandPath: "miran/",
  tagline: "AI engineer building secure intelligent systems.",
  summary:
    "I build AI systems around reliable backend, retrieval and security boundaries.",
  currently: "AI systems → AI security",
  aboutBlurb:
    "I like building systems where AI is useful because of the engineering around it — retrieval, permissions, APIs, evaluation and security.",
  statusLine: "> currently building production AI systems",
  github: {
    label: "GitHub",
    href: "https://github.com/miransec",
  },
  linkedin: {
    label: "LinkedIn",
    href: null as string | null,
    placeholder: true,
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
