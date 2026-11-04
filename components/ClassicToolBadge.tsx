import {
  siDocker,
  siCss,
  siExpress,
  siFastapi,
  siFigma,
  siGithub,
  siGithubactions,
  siGoogle,
  siHtml5,
  siJupyter,
  siJavascript,
  siJsonwebtokens,
  siGoogleappsscript,
  siMlflow,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPandas,
  siPhp,
  siPostgresql,
  siGooglesheets,
  siPassport,
  siPython,
  siReact,
  siScikitlearn,
  siSwagger,
  siTensorflow,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

const TOOL_ICONS: Record<string, SimpleIcon> = {
  Python: siPython,
  TensorFlow: siTensorflow,
  React: siReact,
  "Node.js": siNodedotjs,
  Express: siExpress,
  PostgreSQL: siPostgresql,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  FastAPI: siFastapi,
  pandas: siPandas,
  Matplotlib: siPython,
  Jupyter: siJupyter,
  "GitHub Actions": siGithubactions,
  HTML5: siHtml5,
  CSS3: siCss,
  JavaScript: siJavascript,
  "Google OAuth": siGoogle,
  JWT: siJsonwebtokens,
  "Passport.js": siPassport,
  Swagger: siSwagger,
  "scikit-learn": siScikitlearn,
  MLflow: siMlflow,
  Docker: siDocker,
  PHP: siPhp,
  MySQL: siMysql,
  GitHub: siGithub,
  "MobileNetV2": siTensorflow,
  joblib: siPython,
  Dompdf: siPhp,
  Figma: siFigma,
  "Google Sheets": siGooglesheets,
  "Google Apps Script": siGoogleappsscript,
  SQL: siPostgresql,
  EDA: siPandas,
  "Data Cleaning": siPandas,
  "Data Preprocessing": siPandas,
  "Data Transformation": siPandas,
  "Transfer Learning": siTensorflow,
  "Fine-Tuning": siTensorflow,
  "Model Evaluation": siScikitlearn,
  "REST APIs": siSwagger,
};

function ToolIcon({ tool }: { tool: string }) {
  const icon = TOOL_ICONS[tool];

  if (icon) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        style={{ color: `#${icon.hex}` }}
      >
        <path fill="currentColor" d={icon.path} />
      </svg>
    );
  }

  if (tool === "Excel") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
        <path fill="#217346" d="M5 3h16v18H5z" />
        <path fill="#185C37" d="M2 6h12v12H2z" />
        <path
          d="m5 9 6 6m0-6-6 6"
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (tool === "Power BI") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
        <path
          fill="#E6AD10"
          d="M3 13h4v8H3zm7-6h4v14h-4zm7-4h4v18h-4z"
        />
        <path fill="#F6D751" d="M1 17h4v4H1zm7-6h4v10H8zm7-5h4v15h-4z" />
      </svg>
    );
  }

  if (tool === "OCR") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2"
      >
        <path d="M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3m-8 0H5a1 1 0 0 1-1-1v-3" />
        <path d="M7 10h10M7 14h7" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 fill-none stroke-current text-slate-400"
    >
      <path
        d="M12 3.5 14.3 8l5 .7-3.6 3.5.9 5-4.6-2.4-4.6 2.4.9-5-3.6-3.5 5-.7L12 3.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function ClassicToolBadge({
  tool,
  compact = false,
}: {
  tool: string;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700 ${
        compact ? "px-2 py-1" : "px-3 py-1.5"
      }`}
      title={tool}
    >
      <ToolIcon tool={tool} />
      {tool}
    </span>
  );
}
