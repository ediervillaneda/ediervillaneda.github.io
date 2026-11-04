/** Shape of `firebase-data/<lang>.json`, the single source of the site content. */
export interface SiteContent {
  meta: Meta;
  ui: UiText;
  hero: Hero;
  about: About;
  facts: Facts;
  skills: Skills;
  resume: Resume;
  portfolio: Portfolio;
  services: Services;
  references: References;
  contact: Contact;
}

export interface Meta {
  title: string;
  description: string;
}

export type SectionId =
  | 'about'
  | 'facts'
  | 'skills'
  | 'resume'
  | 'portfolio'
  | 'services'
  | 'references'
  | 'contact';

export type NavId = 'home' | Exclude<SectionId, 'facts'>;

export interface UiText {
  nav: Record<NavId, string>;
  sections: Record<SectionId, string>;
  about: {
    website: string;
    city: string;
    degree: string;
    email: string;
    freelance: string;
    photoAlt: string;
  };
  resume: { education: string; courses: string; experience: string; present: string };
  portfolio: { all: string; filters: string };
  contact: { location: string; email: string; social: string };
  footer: { rights: string; designedBy: string };
  a11y: {
    openMenu: string;
    closeMenu: string;
    mainMenu: string;
    backToTop: string;
    language: string;
  };
}

export interface SocialLink {
  /** Font Awesome brand icon name, e.g. `linkedin`. */
  icon: string;
  label: string;
  url: string;
}

export interface Hero {
  name: string;
  role: string;
  social: SocialLink[];
}

export interface About {
  description: string;
  title: string;
  summary: string;
  details: string;
  website: string;
  city: string;
  country: string;
  degree: string;
  email: string;
  freelance: string;
  image: string;
}

export interface Fact {
  /** Font Awesome solid icon name, e.g. `building`. */
  icon: string;
  /** Displayed value; a leading number is animated, e.g. `18+`. */
  value: string;
  label: string;
}

export interface Facts {
  description: string;
  items: Fact[];
}

export interface Skill {
  name: string;
  /** Percentage from 0 to 100. */
  level: number;
}

export interface Skills {
  description: string;
  items: Skill[];
}

export interface Education {
  title: string;
  date: string;
  institution: string;
  place: string;
}

export interface Experience {
  position: string;
  start: string;
  /** `null` while the position is current. */
  end: string | null;
  company: string;
  city: string;
  highlights: string[];
}

export interface Resume {
  description: string;
  education: Education[];
  courses: Education[];
  experience: Experience[];
}

export type PortfolioCategoryId = 'mainframe' | 'financial' | 'web';

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  label: string;
}

export interface Technology {
  name: string;
  color: string;
  textColor: string;
}

export interface PortfolioItem {
  title: string;
  category: PortfolioCategoryId;
  subtype: string;
  description: string;
  technologies: Technology[];
}

export interface Portfolio {
  description: string;
  categories: PortfolioCategory[];
  items: PortfolioItem[];
}

export type ServiceColor = 'blue' | 'orange' | 'pink' | 'yellow' | 'red' | 'teal';

export interface Service {
  /** Font Awesome solid icon name. */
  icon: string;
  color: ServiceColor;
  title: string;
  description: string;
}

export interface Services {
  description: string;
  items: Service[];
}

export interface Reference {
  name: string;
  position: string;
  company: string;
  testimonial: string;
}

export interface References {
  description: string;
  items: Reference[];
}

export interface Contact {
  description: string;
  location: string;
  email: string;
}
