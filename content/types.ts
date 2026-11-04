export type Link = { label: string; url: string };

export type Profile = {
  name: string;
  role: string;
  pitch: string;
  bio: string;
  interests: string[];
};

export type Experience = {
  id: string;
  type: "organization" | "internship";
  role: string;
  org: string;
  companyLogo?: PhotoData;
  industry?: string;
  start: string;
  end: string; // isi "Present" kalau masih berjalan
  highlights: string[];
  tools?: string[];
  tags?: Role[];
  proofOfWork?: PhotoData[];
  photos?: PhotoData[];
};

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
  certificates?: PhotoData[];
};

export type Project = {
  id: string;
  title: string;
  category?: string;
  tagline: string;
  problem: string;
  role: string;
  stack: string[];
  result: string;
  links: Link[];
  tags?: Role[];
  appUrl?: string;
  appUrlPlaceholder?: string;
  thesisUrl?: string;
  thesisRepositoryPlaceholder?: string;
  photos?: PhotoData[];
  demoVideoUrl?: string;
  demoVideoPlaceholder?: string;
};

export type Contact = {
  email: string;
  socials: Link[];
  cvUrl: string;
};

export type Intro = {
  greeting: string;
  paragraphs: string[];
  status?: string; // opsional, mis. "Open to internships"
};

export type PhotoData = {
  src: string;
  full?: string; // versi lebih besar untuk tampilan besar (opsional)
  alt: string;
  caption?: string;
};

export type Education = {
  id: string;
  degree: string;
  school: string;
  start: string;
  end: string; // isi "Present" kalau masih berjalan
  gpa?: string;
  focus?: string; // tugas akhir atau peminatan
  highlights?: string[];
};

export type About = {
  portrait: PhotoData;
  tagline: string;     // satu kalimat personal di bawah namamu
  location?: string;
  interests: { label: string; note?: string }[];
  gallery: PhotoData[];
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  expires?: string;
  activityDate?: string;
  location?: string;
  format?: "Online" | "Offline" | "To be added";
  url?: string;
  relatedProjectId?: string;
  tags?: Role[];
  photos?: PhotoData[];
};

export type Role = "web" | "data" | "ml";

export type AiesecRole = {
  id: string;
  scope: "campus" | "national";
  title: string;
  area: AiesecArea;        // the one pill that says what the role relates to
  start: string;
  end: string;
  summary: string;
  directReports?: number;  // people you led directly
  favorite?: boolean;      // shows the star
  highlights: string[];
  tags?: Role[];
  photos?: PhotoData[];
};

export type Aiesec = {
  logo?: { src: string; alt: string };
  title: string;
  summary: string[];
  stats: { value: string; label: string }[];
  scopes: { id: "campus" | "national"; label: string; note: string }[];
  roles: AiesecRole[];
  gallery: PhotoData[];
};

export type AiesecArea =
  | "marketing"
  | "cx"
  | "logistics"
  | "web";