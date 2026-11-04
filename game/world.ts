export const WORLD_WIDTH = 3840;
export const GROUND_Y = 300;

export const zones = [
  { name: "Spawn", x: 0, stop: 100 },
  { name: "About me", x: 390, stop: 590 },
  { name: "Experiences", x: 930, stop: 1000 },
  { name: "Skills", x: 2080, stop: 2240 },
  { name: "Projects", x: 2560, stop: 2620 },
  { name: "Contact", x: 3500, stop: 3520 },
];

export type WorldObject = {
  id: string;
  kind: "building" | "object";
  x: number;
  label: string;
  opens: string; // what it will open later (matches content/data.ts)
};

export const objects: WorldObject[] = [
  { id: "intro",   kind: "object",   x: 230,  label: "Intro",        opens: "intro" },
  { id: "about",   kind: "building", x: 670,  label: "About me",     opens: "about" },
  { id: "org",      kind: "building", x: 1200, label: "AIESEC Journey", opens: "aiesec" },
  { id: "intern-1", kind: "building", x: 1530, label: "XLSMART Intern",  opens: "experience:intern-1" },
  { id: "intern-2", kind: "building", x: 1860, label: "Ajaib Intern",  opens: "experience:intern-2" },
  { id: "skills",  kind: "object",   x: 2320, label: "Skills",       opens: "skills" },
  { id: "proj-1",  kind: "building", x: 2740, label: "GoiHunt",    opens: "project:0" },
  { id: "proj-2",  kind: "building", x: 3030, label: "Notalens",    opens: "project:1" },
  { id: "proj-3",  kind: "building", x: 3300, label: "All Projects",    opens: "projects" },
  { id: "mailbox", kind: "object",   x: 3600, label: "Contact",      opens: "contact" },
];