import type {
  Profile,
  Experience,
  SkillGroup,
  Project,
  Contact,
  Intro,
  About,
  Education,
  Certification,
  Aiesec,
  
} from "./types";

export const profile: Profile = {
  name: "Daffa Bagus Maulana",
  role: "Developer · Data · Machine Learning Enthusiast",
  pitch:
    "Computer Science graduate who connects data, machine learning, and software development to build useful, AI-powered applications.",
  bio: "Informatics graduate (GPA 3.87/4.00) working across data analytics, machine learning, and program development. I've analyzed 26,000+ customer feedback records with Python, Excel, and Power BI, trained an image classifier to 96.69% test accuracy, and built full-stack apps with React, Next.js, Node.js, and FastAPI.",
  interests: ["Music", "Food", "Movie"],
};

export const intro: Intro = {
  greeting: "Welcome aboard!",
  paragraphs: [
    "I'm Daffa Bagus Maulana, nice to see you here!",
    "This line runs from my story to my projects, with stops at my experience and skills along the way. Take your time, or hop between stops with the bar below.",
  ],
  // Hapus tanda // di bawah kalau mau menampilkan status (dan perbarui secara berkala)
  status: "Open to Work: Dev / Data / and Machine Learning Opportunities!",
};

export const about: About = {
  portrait: { src: "/photos/portrait.jpg", alt: "Portrait of Daffa" },
  tagline: "Computer Science graduate who loves connecting data, machine learning, and program development, from analyzing feedback to building AI powered apps",
  location: "Tangerang",
  interests: [
    { label: "Food", note:"Exploring viral yums" },
    { label: "Music", note:"Playing piano or guitar"},
    { label: "Gaming", note:"Roblox Maniac" },
  ],
  gallery: [
    { src: "/photos/campus-1.jpg", alt: "Graduation", caption: "Graduation" },
    { src: "/photos/campus-2.jpg", alt: "Campus Event w/ Friends", caption: "Campus Event w/ Friends" },
    { src: "/photos/campus-3.jpeg", alt: "Bimbingan Skripsi", caption: "Bimbingan Skripsi" },
  ],
};

export const education: Education[] = [
  {
    id: "s1",
    degree: "Bachelor of Computer Science (Informatics)",
    school: "Universitas Pembangunan Nasional 'Veteran' Jakarta",
    start: "Aug 2022",
    end: "Jul 2026",
    gpa: "3.87 / 4.00",
    highlights: [
      "Thesis: GoiHunt, an AI-powered Japanese vocabulary learning app, more detail at Projects",
      "Completed 160 credits (SKS), above the 144-credit requirement, while holding organizational leadership roles",
      "Coursework: Data Analytics, Machine Learning, Big Data, Algorithms, Data Structures, Data Management",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Data Analytics",
    issuer: "Pearson",
    issued: "Oct 2025",
    expires: "Oct 2030",
    activityDate: "Oct 2025",
    location: "Universitas Pembangunan Nasional 'Veteran' Jakarta",
    url: "https://www.credly.com/badges/7b989dc3-8e64-4cc5-a1e3-02d1b822d46c/public_url",
    tags: ["data"],
    photos: [
      {
        src: "/photos/pearson/pearson-1.jpg",
        alt: "Certificate Completion",
        caption: "Certificate Completion",
      },]
  },
  {
    id: "cert-2",
    title: "AI Engineer Intensive Course",
    issuer: "Pijak Dicoding x IBM SkillsBuild",
    issued: "Jul 2026",
    expires: "Jul 2031",
    activityDate: "Jan - Jul 2026",
    location: "Online Learning/ Offline Graduation",
    url: "https://drive.google.com/file/d/1DO_YCKNTsydOAlfsrTskbKHQoaVogR0H/view?usp=sharing",
    relatedProjectId: "notalens",
    tags: ["ml"],
    photos: [
      {
        src: "/photos/pijak/pijak-1.jpg",
        alt: "Certificate Completion",
        caption: "Certificate Completion",
      },
      {
        src: "/photos/pijak/pijak-2.png",
        alt: "Learning Outcomes",
        caption: "Learning Outcomes",
      },
      {
        src: "/photos/pijak/pijak-3.jpeg",
        alt: "Capstone project team (-2 members on photo)",
        caption: "Capstone project team (-2 members on photo)",
      },
    ],
  },
];

export const experiences: Experience[] = [
  // {
  //   id: "org",
  //   type: "organization",
  //   role: "Staff Divisi IT",
  //   org: "Nama Organisasi 1",
  //   start: "2021",
  //   end: "2022",
  //   highlights: ["Poin pencapaian 1", "Poin pencapaian 2"],
  // },
  {
    id: "intern-1",
    type: "internship",
    role: "Customer Experience Management Intern",
    org: "PT XLSMART Telecom Sejahtera Tbk",
    companyLogo: {
      src: "/logos/xlsmart.png",
      alt: "XLSMART logo",
    },
    industry: "Telecommunications and mobile network services",
    start: "Sep 2024",
    end: "Dec 2024",
    highlights: [
      "Analyzed 16,000+ NPS responses across 6+ brands with Python and Excel to compare customer experience and surface service issues",
      "Built Excel and Power BI dashboards to track NPS metrics and communicate insights for customer journey improvements",
      "Managed 5+ market research surveys and proposed an AI-powered dashboard combining NPS metrics, verbatims, and competitor analysis",
    ],
    tools: ["Python", "Excel", "Power BI", "Figma"],
    tags: ["data"],
    proofOfWork: [
      {
        src: "/photos/xlsmart/xlwork-1.jpg",
        alt: "Customer feedback data cleaning and categorization",
        caption: "Customer feedback data cleaning and categorization",
      },
      {
        src: "/photos/xlsmart/xlwork-2.png",
        alt: "XL Prepaid NPS performance dashboard",
        caption: "NPS performance dashboard and customer experience insights",
      },
      {
        src: "/photos/xlsmart/xlwork-3.png",
        alt: "XLKM Graduation event campaign designs",
        caption: "Event campaign visual designs",
      },
    ],
    photos: [
      {
        src: "/photos/xlsmart/xl-1.jpeg",
        alt: "XLSMART internship photo 1",
      },
      {
        src: "/photos/xlsmart/xl-2.jpeg",
        alt: "XLSMART internship photo 2",
      },
      {
        src: "/photos/xlsmart/xl-3.jpeg",
        alt: "XLSMART internship photo 3",
      },
      {
        src: "/photos/xlsmart/xl-4.JPG",
        alt: "XLSMART internship photo 4",
      },
      {
        src: "/photos/xlsmart/xl-5.jpg",
        alt: "XLSMART internship photo 5",
      },
    ],
  },
  {
    id: "intern-2",
    type: "internship",
    role: "Customer Success Operations Intern",
    org: "PT Ajaib Sekuritas",
    companyLogo: {
      src: "/logos/ajaib.png",
      alt: "Ajaib logo",
    },
    industry: "Digital investment and financial services",
    start: "Jan 2026",
    end: "Apr 2026",
    highlights: [
      "Cleaned and standardized 10,000+ CSAT and DSAT records with Python and Excel, then ran EDA to find recurring complaint patterns and pain points",
      "Turned findings into Excel and Power BI reports supporting recommendations for SOP revisions, UI/UX improvements, and customer response",
      "Automated ticket allocation and quality monitoring with Google Sheets and Apps Script, including a round-robin system and QC reports adopted by 11 team members",
    ],
    tools: [
      "Python",
      "Excel",
      "Power BI",
      "Google Sheets",
      "Google Apps Script",
    ],
    tags: ["data"],
    proofOfWork: [
      {
        src: "/photos/ajaib/ajaibwork-1.jpg",
        alt: "Synthetic CSAT and DSAT feedback dataset",
        caption: "CSAT/DSAT data source and categorized feedback",
      },
      {
        src: "/photos/ajaib/ajaibwork-2.jpg",
        alt: "Synthetic customer feedback dashboard and Apps Script automation",
        caption: "Customer feedback dashboard and ticket-allocation automation",
      },
    ],
    photos: [
      {
        src: "/photos/ajaib/ajaib-1.jpg",
        alt: "Ajaib office photo",
      },
      {
        src: "/photos/ajaib/ajaib-2.jpg",
        alt: "Ajaib team photo",
      },
    ],
  },
];

export const aiesec: Aiesec = {
  title: "",
  summary: [
    "AIESEC is a youth-run organization that develops youth through leadership experiences such as volunteer projects and exchange experiences.",
    "Over more than two years, I worked at AIESEC in Indonesia (national scope) and AIESEC in UPNVJ (campus scope).",
  ],
  logo: { src: "/logos/aiesec.png", alt: "AIESEC logo" },
  stats: [
    { value: "12", label: "direct team members led" },
    { value: "+14%", label: "over registration target (1,564 vs 1,376)" },
    { value: "40,000+", label: "monthly users on aiesec.or.id" },
    { value: "9.51/10", label: "delegate NPS, Edlevate 2.0" },
  ],
  scopes: [
    { id: "campus", label: "AIESEC in UPNVJ", note: "Campus Scope" },
    {
      id: "national",
      label: "AIESEC in Indonesia",
      note: "National Scope",
    },
  ],
  roles: [
    // ---- Campus: AIESEC in UPNVJ (newest first) ----
    {
      id: "head-marketing",
      scope: "campus",
      title: "Head of Marketing Department",
      start: "Feb 2024",
      end: "Jan 2025",
      area: "marketing",
      favorite: true,
      summary:
        "Led 3 subteams and the annual marketing strategy for 7 products, with 1,564 registrants (+14% over target).",
      highlights: [
        "Led 3 subteams across Brand, Initiatives, and ELD while developing and executing the annual marketing strategy for 7 youth leadership and exchange products",
        "Oversaw campaign planning, KPI monitoring, team capability development, and offline market expansion across multiple universities and public venues",
        "Exceeded aggregate registration targets by approximately 14% (1,564 registrants against a target of 1,376) and earned 2 departmental performance recognitions (Q1 and August)",
      ],
      photos: [
        {
          src: "/photos/aiesec/vp-1.jpeg",
          alt: "Head of Marketing Department at AIESEC",
        },
        {
          src: "/photos/aiesec/vp-2.jpeg",
          alt: "Head of Marketing Department at AIESEC",
        },
        {
          src: "/photos/aiesec/vp-3.jpg",
          alt: "Head of Marketing Department at AIESEC",
        },
        {
          src: "/photos/aiesec/vp-4.jpg",
          alt: "Head of Marketing Department at AIESEC",
        },
        {
          src: "/photos/aiesec/vp-5.jpg",
          alt: "Head of Marketing Department at AIESEC",
        },
      ],
    },
    {
      id: "oc-cx-edlevate",
      scope: "campus",
      title: "Organizing Committee, Customer Experience · Edlevate 2.0",
      start: "Sep 2023",
      end: "Dec 2023",
      area: "cx",
      summary: "Looked after 33 delegates, reaching an NPS of 9.51/10 with no one leaving midway.",
      highlights: [
        "Served 33 delegates to keep them engaged and developing throughout the project",
        "Achieved a delegate satisfaction NPS score of 9.51/10.00",
        "Retained all 33 delegates through the 1-month realization, with none leaving midway",
      ],
      photos: [
        {
          src: "/photos/aiesec/lp-1.jpg",
          alt: "Customer Experience at Edlevate 2.0",
        },
        {
          src: "/photos/aiesec/lp2.jpg",
          alt: "Customer Experience at Edlevate 2.0",
        },
      ],
    },
    {
      id: "oc-logistics-ic",
      scope: "campus",
      title: "Organizing Committee, Logistics · Impact Circle 5.0",
      start: "Mar 2023",
      end: "May 2023",
      area: "logistics",
      summary: "Ran sound, screen, and lighting, plus logistics and vendor research, on event day.",
      highlights: [
        "Operated sound, screen, and lighting on event day and coordinated logistics operations",
        "Managed asset preparation, equipment setup, and on-site operations to cover the needs of the entire event",
        "Researched vendors for decoration, catering, and venue",
      ],
      photos: [
        {
          src: "/photos/aiesec/ic_1.jpg",
          alt: "Logistics team at Impact Circle 5.0",
        },
        {
          src: "/photos/aiesec/ic-2.jpg",
          alt: "Logistics team at Impact Circle 5.0",
        },
      ],
    },
    {
      id: "tl-marketing",
      scope: "campus",
      title: "Team Leader of Marketing Department",
      start: "Feb 2023",
      end: "Jan 2024",
      area: "marketing",
      summary:
        "Marketing for 3 products: 40+ Instagram content pieces, 3,000+ engagements, and 10+ offline activations.",
      highlights: [
        "Handled and synergized marketing for 3 products: Local Project, Impact Circle, and Youth Today",
        "Created 40+ pieces of Instagram content, generating 3,000+ total engagements",
        "Executed 10+ offline marketing activations, including a promotional booth, direct outreach, guerrilla marketing, videotron, and more",
      ],
      photos: [
        {
          src: "/photos/aiesec/tl-1.jpeg",
          alt: "Team Leader of Marketing Department at AIESEC",
        },
        {
          src: "/photos/aiesec/tl-2.jpeg",
          alt: "Team Leader of Marketing Department at AIESEC",
        },
        {
          src: "/photos/aiesec/tl-3.jpeg",
          alt: "Team Leader of Marketing Department at AIESEC",
        },
        {
          src: "/photos/aiesec/tl-4.jpg",
          alt: "Team Leader of Marketing Department at AIESEC",
        },
        {
          src: "/photos/aiesec/tl-5.jpg",
          alt: "Team Leader of Marketing Department at AIESEC",
        },
      ],
    },

    // ---- National: AIESEC in Indonesia (newest first) ----
    {
      id: "oc-brand-kawula17",
      scope: "national",
      title: "Organizing Committee, Brand Marketing · Kawula17 Goes To School",
      start: "Sep 2024",
      end: "Jun 2025",
      area: "marketing",
      summary: "Led digital promotion across 4+ cities and 6 schools, and built the campaign's visual identity.",
      highlights: [
        "Led digital marketing and promotional activities across more than 4 cities and 6 schools",
        "Managed campaign timelines and promotional execution to support participant attendance targets and strengthen brand awareness among students and partner schools",
        "Developed the visual identity and communication materials (logos, banners, posters, design guidelines, and social media content), keeping branding consistent across all campaign channels",
      ],
      photos: [
        {
          src: "/photos/aiesec/k17-1.JPG",
          alt: "Brand Marketing at Kawula17 Goes To School",
        },
        {
          src: "/photos/aiesec/k17-2.JPG",
          alt: "Brand Marketing at Kawula17 Goes To School",
        },
        {
          src: "/photos/aiesec/k17-3.jpg",
          alt: "Brand Marketing at Kawula17 Goes To School",
        },
      ],
    },
    {
      id: "nst-platform",
      scope: "national",
      title: "National Supporting Team, Platform Coordinator",
      start: "Aug 2024",
      end: "Jan 2025",
      area: "web",
      summary: "Coordinated 3 specialist teams and optimised aiesec.or.id, which serves 40,000+ monthly users.",
      favorite: true,
      highlights: [
        "Coordinated 3 specialist teams across UI/UX, CRM, and SEO content, managing timelines and deliverables",
        "Optimised aiesec.or.id, serving 40,000+ monthly users, by improving website performance and revamping 6 key pages",
        "Developed automated email workflows for form registrations across 27 local branches and 4 events, reducing manual follow-up",
      ],
      photos: [
        {
          src: "/photos/aiesec/nst-3.jpg",
          alt: "National Supporting Team Platform Coordinator at AIESEC",
        },
        {
          src: "/photos/aiesec/nst-4.jpg",
          alt: "National Supporting Team Platform Coordinator at AIESEC",
        },
      ],
    },
    {
      id: "oc-logistics-ysf",
      scope: "national",
      title: "Organizing Committee, Logistics · Youth Speak Forum 2024",
      start: "Sep 2023",
      end: "Mar 2024",
      area: "logistics",
      summary: "Logistics for an event with 300+ participants and 13 external speakers.",
      highlights: [
        "Coordinated logistics for an event with 300+ participants and 13 external speakers, and operated sound, screen, and lighting on event day",
        "Prepared assets, set up equipment, and ran on-site operations to cover the needs of all speakers and participants",
        "Researched vendors for decoration, catering, and venue",
      ],
      photos: [
        {
          src: "/photos/aiesec/ysf-1.jpg",
          alt: "Logistics team at Youth Speak Forum 2024",
        },
        {
          src: "/photos/aiesec/ysf-2.jpg",
          alt: "Logistics team at Youth Speak Forum 2024",
        },
        {
          src: "/photos/aiesec/ysf-3.jpg",
          alt: "Logistics team at Youth Speak Forum 2024",
        },
      ],
    },
  ],
  // Foto campuran untuk halaman utama. Isi nanti, contoh:
  // { src: "/photos/aiesec/event-1.jpg", alt: "Edlevate 2.0 delegates", caption: "Edlevate 2.0" },
  gallery: [
    // { src: "/photos/campus-1.jpg", alt: "Edlevate 2.0 delegates", caption: "Edlevate 2.0" },
  ],
};

export const skills: SkillGroup[] = [
  {
    id: "data",
    label: "Data",
    items: ["Python", "SQL", "Excel", "Google Sheets", "Power BI", "EDA", "Data Cleaning", "Data Preprocessing", "Data Transformation", "pandas", "Jupyter", "Matplotlib", "PostgreSQL", "MySQL"],
  },
  {
    id: "ml",
    label: "Machine Learning",
    items: ["Python", "TensorFlow", "scikit-learn", "MLflow", "MobileNetV2", "Transfer Learning", "Fine-Tuning", "Model Evaluation", "OCR"],
  },
  {
    id: "web",
    label: "Web",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "PHP", "Node.js", "Express", "FastAPI", "REST APIs", "PostgreSQL"],
  },
  { id: "tools", label: "Tools & Automation", items: ["Google Apps Script", "Git", "GitHub", "GitHub Actions", "Docker"] },
  {
    id: "lang",
    label: "Languages",
    items: ["Indonesian (Native)", "English (Advanced/Intermediate)"],
    certificates: [
      {
        src: "/photos/language/ept.jpg",
        alt: "EPT English proficiency certificate",
        caption: "EPT Certificate",
      },
      {
        src: "/photos/language/ef.jpg",
        alt: "EF English proficiency certificate",
        caption: "EF Certificate",
      },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "goihunt",
    title: "GoiHunt",
    category: "Undergraduate Thesis",
    tagline: "AI Powered Japanese Vocabulary Learning Web App",
    problem: "A fullstack web app that uses an image classification model to support Japanese vocabulary learning, with user profiles, learning progress tracking, and gamification.",
    stack: ["Python", "TensorFlow", "MobileNetV2", "React", "Node.js", "Express", "PostgreSQL"],
    result: "Trained a MobileNetV2 classifier with transfer learning on 10,000 self-collected images (96.69% test accuracy), backed by 28 REST API endpoints and a 10-table PostgreSQL database.",
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/daffmaulana/goihunt",
      },
    ],
    tags: ["ml", "web"],
    appUrl: "https://goihunt.daff.my.id",
    thesisUrl: "http://repository.upnvj.ac.id/id/eprint/50942",
    demoVideoUrl: "https://github.com/user-attachments/assets/e33168ea-3e61-4f51-ad99-c684e8d5825f",
    photos: [
      {
        src: "/photos/goihunt/scan.png",
        alt: "GoiHunt scan screen recognizing an object with the device camera",
        caption: "Scan — identify an object with the camera",
      },
      {
        src: "/photos/goihunt/vocabulary.png",
        alt: "GoiHunt vocabulary detail screen with Japanese reading and meaning",
        caption: "Vocabulary — learn the Japanese word and its meaning",
      },
      {
        src: "/photos/goihunt/quiz.png",
        alt: "GoiHunt multiple-choice vocabulary quiz",
        caption: "Quiz — practice vocabulary with multiple choice",
      },
      {
        src: "/photos/goihunt/collection.png",
        alt: "GoiHunt collection of discovered Japanese vocabulary",
        caption: "Collection — review discovered vocabulary",
      },
      {
        src: "/photos/goihunt/gamification.png",
        alt: "GoiHunt gamification screen with leaderboard, missions, and achievements",
        caption: "Gamification — leaderboard, missions, and achievements",
      },
    ],
    role: ""
  },
  {
    id: "notalens",
    title: "Notalens",
    category: "Pijak Capstone",
    tagline: "AI-powered receipt scanner and expense management app",
    problem:
      "A full-stack app that extracts structured data from receipts with OCR, lets users verify it manually, and exports to PDF or Excel, with transaction and workspace management.",
    role: "Full-stack development, OCR integration, database design",
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "OCR"],
    result:
      "Integrated AI-powered OCR (Python, FastAPI) with manual verification and PDF/Excel export, plus 15 REST API endpoints across transaction and workspace modules and an indexed 5-table PostgreSQL database.",
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/daffmaulana/notalens",
      },
    ],
    tags: ["ml", "web"],
    appUrl: "https://notalens-pijak.vercel.app/",
    demoVideoUrl: "https://github.com/user-attachments/assets/e6c2213b-57ba-4bbd-a389-eaaa4ab299bc",
    photos: [
      {
        src: "/photos/notalens/recap.png",
        alt: "NotaLens expense recap screen",
        caption: "Recap — review personal expense summaries",
      },
      {
        src: "/photos/notalens/verify-scan.png",
        alt: "NotaLens receipt scan verification screen",
        caption: "Verify scan — review AI-extracted receipt details",
      },
      {
        src: "/photos/notalens/receipt-detail.png",
        alt: "NotaLens receipt transaction detail screen",
        caption: "Receipt detail — inspect transaction information",
      },
      {
        src: "/photos/notalens/workspace.png",
        alt: "NotaLens shared expense workspace",
        caption: "Workspace — manage shared expenses",
      },
      {
        src: "/photos/notalens/manage-workspace.png",
        alt: "NotaLens workspace management screen",
        caption: "Manage workspace — collaborate with a team",
      },
    ],
  },
  {
    id: "heart-disease-preprocessing",
    title: "Heart Disease Prediction: Data Preprocessing",
    category: "Data Preprocessing & EDA",
    tagline:
      "From raw clinical records to a clean, model-ready dataset, automatically on every push.",
    problem:
      "The first stage of a two-repository heart disease prediction pipeline. This project explores the Cleveland heart disease dataset, validates and cleans its records, renames abbreviated columns, and prepares the resulting CSV for model training.",
    role: "Data preprocessing and automation",
    stack: ["Python", "pandas", "Matplotlib", "Jupyter", "GitHub Actions"],
    result:
      "Processed the raw dataset from 303 to 296 rows by removing records with invalid ca and thal values, then renamed 11 columns for readability. GitHub Actions reruns the preprocessing script on every push to main and commits the generated dataset. This is the first stage; the resulting data feeds the adjacent Heart Disease Prediction: CI-CD project.",
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/daffmaulana/Heart-Disease-Prediction-Preprocessing",
      },
      {
        label: "Next stage: CI/CD",
        url: "https://github.com/daffmaulana/Heart-Disease-Prediction-CI-CD",
      },
    ],
    tags: ["data", "ml"],
    photos: [
      {
        src: "/projects/preprocess/preprocess-1.png",
        alt: "Raw heart disease dataset before preprocessing with abbreviated column names",
        caption: "Before preprocessing — raw dataset with abbreviated columns",
      },
      {
        src: "/projects/preprocess/preprocess-2.png",
        alt: "Heart disease dataset after preprocessing with descriptive column names",
        caption: "After preprocessing — clean dataset with descriptive column names",
      },
    ],
  },
  {
    id: "heart-disease-prediction",
    title: "Heart Disease Prediction: CI-CD",
    category: "CI-CD Workflow",
    tagline:
      "A reproducible heart disease prediction pipeline that retrains and publishes a model automatically on every push.",
    problem:
      "A machine learning pipeline for binary heart disease classification using 13 clinical features from a dataset of 296 samples. A Random Forest model is trained with an 80/20 train-test split, and the workflow uses MLflow to track training parameters, metrics, and model artifacts.",
    role: "End-to-end machine learning and MLOps pipeline",
    stack: [
      "Python",
      "pandas",
      "scikit-learn",
      "MLflow",
      "Docker",
      "GitHub Actions",
      "joblib",
    ],
    result:
      "Every push to main triggers GitHub Actions to retrain the model, store MLflow parameters, metrics, and artifacts, then build and publish a Docker serving image to Docker Hub. On a 60-patient hold-out test set, the model recorded 83.33% accuracy, 76.47% precision, and 92.86% recall. The trained model is also exported as random_forest_model.pkl.",
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/daffmaulana/Heart-Disease-Prediction-CI-CD",
      },
    ],
    tags: ["data", "ml"],
    photos: [
      {
        src: "/projects/cicd/cicd-1.png",
        alt: "ci.yml configuration for the project's GitHub Actions workflow",
        caption: "CI workflow configuration — ci.yml",
      },
      {
        src: "/projects/cicd/cicd-2.png",
        alt: "GitHub Actions workflow run for the heart disease prediction project",
        caption: "GitHub Actions — automated workflow run",
      },
    ],
  },
  {
    id: "9am",
    title: "9AM",
    category: "PHP Native Web",
    tagline:
      "A job-search platform for Indonesian job seekers, bringing job listings, career tips, and CV creation into one place.",
    problem:
      "A PHP web application where users can browse and search job listings, read career articles, and build and download a CV as a PDF. It also includes account registration, login, password recovery, profile management, and an admin dashboard for managing platform content.",
    role: "Project lead & primary full-stack developer",
    stack: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Dompdf"],
    result:
      "Built a job-search platform with job and article search, pagination, user authentication and profiles, a PDF CV builder, and an admin dashboard. The MySQL database organizes six main areas: users, jobs, articles, testimonials, homepage carousel images, and CV data.",
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/daffmaulana/9AM",
      },
    ],
    tags: ["web"],
    appUrl: "https://9am.kesug.com/",
    photos: [
      {
        src: "/projects/9am/9am-1.png",
        alt: "9AM homepage dashboard with navigation, promotional carousel, and popular job listings",
        caption: "Homepage — browse popular job listings",
      },
      {
        src: "/projects/9am/9am-2.png",
        alt: "9AM job detail page showing the job title, company, employment details, and description",
        caption: "Job details — review role information and description",
      },
      {
        src: "/projects/9am/9am-3.png",
        alt: "9AM CV Builder form for entering personal information and work experience",
        caption: "CV Builder — enter details for a professional CV",
      },
    ],
  },
  {
    id: "padelpop",
    title: "PadelPop",
    category: "Fullstack Web",
    tagline:
      "Book your padel court with real-time availability and easy reservation management.",
    problem:
      "A web application for padel court reservations. Users can browse courts and available schedules, book a time slot, and manage their reservations. Admins can manage court listings, bookings, and user accounts through a dedicated dashboard.",
    role: "Full-stack development",
    stack: [
      "HTML5",
      "JavaScript",
      "Node.js",
      "Express",
      "MySQL",
      "Passport.js",
      "Google OAuth",
      "JWT",
      "Swagger",
      "Docker",
    ],
    result:
      "Built an end-to-end reservation experience with court availability, booking management, and an admin dashboard. The backend provides REST API services for authentication, courts, bookings, and users, with JWT authentication, Google OAuth, rate limiting, API documentation, and Docker Compose support.",
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/daffmaulana/PadelPop",
      },
    ],
    tags: ["web"],
    photos: [
      {
        src: "/projects/padelpop/padelpop-1.png",
        alt: "PadelPop homepage with court booking introduction and featured booking steps",
        caption: "Home — discover PadelPop and start a reservation",
      },
      {
        src: "/projects/padelpop/padelpop-2.png",
        alt: "List of available padel courts with locations and booked schedules",
        caption: "Available courts — browse locations and schedules",
      },
      {
        src: "/projects/padelpop/padelpop-3.png",
        alt: "PadelPop booking form to choose a court, date, and play time",
        caption: "Booking — select a court, date, and time slot",
      },
      {
        src: "/projects/padelpop/padelpop-4.png",
        alt: "PadelPop My Bookings page showing reservations and cancel booking actions",
        caption: "My Bookings — review and manage reservations",
      },
    ],
  },
  {
    id: "hangman",
    title: "Hangman Guessing Game",
    category: "Python Terminal Game",
    tagline:
      "Guess the hidden word one letter at a time and save the Hangman before the lives run out.",
    problem:
      "An Indonesian-language terminal game that selects a random word from four categories: fruits, animals, vegetables, and countries. Players guess one letter at a time, with seven lives to reveal the word. The game supports guest play as well as account registration and login.",
    role: "Python game development",
    stack: ["Python"],
    result:
      "Built a complete terminal game flow with a lobby, tutorial, guest and logged-in modes, scoring, and a leaderboard. Logged-in players gain one point for a win and lose one point for a loss, with scores never dropping below zero.",
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/daffmaulana/Hangman",
      },
    ],
    photos: [
      {
        src: "/projects/hangman/hangman-1.png",
        alt: "Hangman terminal lobby with tutorial, start, sign-up, login, and guest options",
        caption: "Lobby — choose how to start playing",
      },
      {
        src: "/projects/hangman/hangman-2.png",
        alt: "Hangman terminal gameplay showing remaining lives, used letters, category, and hidden word",
        caption: "Gameplay — guess letters before the seven lives run out",
      },
      {
        src: "/projects/hangman/hangman-3.png",
        alt: "Hangman game result with the leaderboard and replay options",
        caption: "Leaderboard — review scores after a round",
      },
    ],
  },
];


export const contact: Contact = {
  email: "daffabagus41@gmail.com",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/daffamaulana" },
    { label: "GitHub", url: "https://github.com/daffmaulana/" },
  ],
  cvUrl: "/CV.pdf",
};