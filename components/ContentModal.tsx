"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { IconifyIcon } from "@iconify/types";
import {
  profile,
  experiences,
  skills,
  projects,
  contact,
  intro,
  about,
  education,
  certifications,
  aiesec,


} from "@/content/data";
import { zones } from "@/game/world";
import type { Role, PhotoData, AiesecArea } from "@/content/types";
import { createPortal } from "react-dom";
import {
  siExpress,
  siFastapi,
  siFigma,
  siGit,
  siGithub,
  siGithubactions,
  siGoogleappsscript,
  siGoogle,
  siGooglesheets,
  siJupyter,
  siJsonwebtokens,
  siPhp,
  siDocker,
  siCss,
  siHtml5,
  siJavascript,
  siMlflow,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPandas,
  siPassport,
  siPostgresql,
  siPython,
  siReact,
  siScikitlearn,
  siSwagger,
  siTensorflow,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

type Props = {
  target: string | null;
  onClose: () => void;
};

const ROLE_STYLE: Record<Role, { label: string; cls: string }> = {
  data: { label: "Data", cls: "bg-sky-100 text-sky-900" },
  ml: { label: "Machine Learning", cls: "bg-violet-100 text-violet-900" },
  web: { label: "Web", cls: "bg-emerald-100 text-emerald-900" },
};

function RoleChips({ tags }: { tags?: Role[] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <span className="inline-flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_STYLE[t].cls}`}
        >
          {ROLE_STYLE[t].label}
        </span>
      ))}
    </span>
  );
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    let videoId: string | null = null;

    if (host === "youtu.be") {
      videoId = parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (
      host === "youtube.com" ||
      host === "www.youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com" ||
      host === "www.youtube-nocookie.com"
    ) {
      videoId =
        parsed.searchParams.get("v") ??
        parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] ??
        null;
    }

    if (!videoId || !/^[\w-]{11}$/.test(videoId)) return null;
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return null;
  }
}

function getGitHubVideoUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol === "https:" &&
      parsed.hostname === "github.com" &&
      /^\/user-attachments\/assets\/[\w-]+\/?$/.test(parsed.pathname)
    ) {
      return parsed.href;
    }
    return null;
  } catch {
    return null;
  }
}

function GitHubMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.2 3.26.92.1-.72.39-1.2.71-1.47-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.5.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function UpnvjLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logos/upnvj.png"
      alt="UPNVJ Logo"
      width={512}
      height={512}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      className={`shrink-0 object-contain select-none pointer-events-none ${className}`}
    />
  );
}

const TECH_ICONS: Record<string, SimpleIcon> = {
  Express: siExpress,
  FastAPI: siFastapi,
  Figma: siFigma,
  Git: siGit,
  GitHub: siGithub,
  "GitHub Actions": siGithubactions,
  "Google Apps Script": siGoogleappsscript,
  "Google OAuth": siGoogle,
  "Google Sheets": siGooglesheets,
  Jupyter: siJupyter,
  JWT: siJsonwebtokens,
  PHP: siPhp,
  HTML5: siHtml5,
  CSS3: siCss,
  JavaScript: siJavascript,
  Docker: siDocker,
  MLflow: siMlflow,
  MySQL: siMysql,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  "Passport.js": siPassport,
  pandas: siPandas,
  PostgreSQL: siPostgresql,
  Python: siPython,
  React: siReact,
  "scikit-learn": siScikitlearn,
  Swagger: siSwagger,
  TensorFlow: siTensorflow,
  TypeScript: siTypescript,
};

const TOOL_ICONIFY_ICONS: Record<string, IconifyIcon> = {
  Excel: {
    width: 256,
    height: 256,
    body: '<path fill="currentColor" d="M200 24H72a16 16 0 0 0-16 16v24H40a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h16v24a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16m-40 80h40v48h-40Zm40-16h-40v-8a16 16 0 0 0-16-16V40h56ZM72 40h56v24H72ZM40 80h104v96H40Zm32 112h56v24H72Zm72 24v-24a16 16 0 0 0 16-16v-8h40v48Zm-78.15-69.12L81.59 128l-15.74-18.88a8 8 0 0 1 12.3-10.24L92 115.5l13.85-16.62a8 8 0 1 1 12.3 10.24L102.41 128l15.74 18.88a8 8 0 0 1-12.3 10.24L92 140.5l-13.85 16.62a8 8 0 0 1-12.3-10.24"/>',
  },
  "Power BI": {
    width: 256,
    height: 342,
    body: '<defs><linearGradient id="powerbi-a" x1="42.593%" x2="57.245%" y1="0%" y2="93.174%"><stop offset="0%" stop-color="#e6ad10"/><stop offset="100%" stop-color="#c87e0e"/></linearGradient><linearGradient id="powerbi-b" x1="40.122%" x2="62.028%" y1="0%" y2="95.592%"><stop offset="0%" stop-color="#f6d751"/><stop offset="100%" stop-color="#e6ad10"/></linearGradient><linearGradient id="powerbi-c" x1="27.774%" x2="55.012%" y1="0%" y2="96.828%"><stop offset="0%" stop-color="#f9e589"/><stop offset="100%" stop-color="#f6d751"/></linearGradient><path id="powerbi-shape" d="M142.222 14.222C142.222 6.368 148.59 0 156.444 0h85.334C249.632 0 256 6.368 256 14.222v312.89c0 7.854-6.368 14.221-14.222 14.221H14.222C6.368 341.333 0 334.966 0 327.111V184.89c0-7.855 6.368-14.222 14.222-14.222h56.89V99.556c0-7.855 6.367-14.223 14.222-14.223h56.888z"/></defs><mask id="powerbi-mask" fill="#fff"><use href="#powerbi-shape"/></mask><path fill="url(#powerbi-a)" d="M256 0v341.333H142.222V0z" mask="url(#powerbi-mask)"/><path fill-opacity=".2" d="M184.889 100.978v241.778H71.11v-256h99.556c7.854 0 14.222 6.367 14.222 14.222" mask="url(#powerbi-mask)"/><path fill-opacity=".18" d="M184.889 106.667v241.777H71.11v-256h99.556c7.854 0 14.222 6.368 14.222 14.223" mask="url(#powerbi-mask)"/><path fill="url(#powerbi-b)" d="M184.889 99.556v241.777H71.11v-256h99.556c7.854 0 14.222 6.368 14.222 14.223" mask="url(#powerbi-mask)"/><path fill="url(#powerbi-c)" d="M0 170.667v170.666h113.778V184.89c0-7.855-6.368-14.222-14.222-14.222z" mask="url(#powerbi-mask)"/>',
  },
};

function TechBadge({ technology }: { technology: string }) {
  const icon = TECH_ICONS[technology];
  const iconifyIcon = TOOL_ICONIFY_ICONS[technology];

  return (
    <li
      className={`inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-800 ${
        icon || iconifyIcon ? "bg-white" : "bg-neutral-100"
      }`}
      title={technology}
    >
      {icon ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0"
          style={{ color: `#${icon.hex}` }}
        >
          <path fill="currentColor" d={icon.path} />
        </svg>
      ) : iconifyIcon ? (
        <Icon
          icon={iconifyIcon}
          aria-hidden="true"
          className="h-4 w-4 shrink-0"
          style={technology === "Excel" ? { color: "#217346" } : undefined}
        />
      ) : null}
      {technology}
    </li>
  );
}

const SOCIAL_ICONS: Record<string, SimpleIcon> = {
  GitHub: siGithub,
};

function ContactContent({ onClose }: { onClose: () => void }) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const emailComposeUrl = `https://mail.google.com/mail/?${new URLSearchParams({
    view: "cm",
    fs: "1",
    to: contact.email,
    su: "Professional Inquiry",
    body: "Hello Daffa,\n\nI came across your portfolio and would like to connect with you regarding a potential opportunity or collaboration.\n\nLooking forward to hearing from you.\n\nBest regards,",
  }).toString()}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopyStatus("copied");
    } catch (error) {
      console.error("Failed to copy contact email to clipboard.", error);
      setCopyStatus("error");
    }
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
          Get in touch
        </p>
        <h2 className="mt-1 text-3xl font-bold leading-tight">
          Let&apos;s connect
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
          Have a project, opportunity, or just want to say hello? I&apos;d love
          to hear from you.
        </p>
        <p className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"
        />
        Open for Work: Developer / Data / and Machine Learning Opportunities!
      </p>
        </div>
        <a
          href={contact.cvUrl}
          download
          className="inline-flex items-center gap-2 rounded bg-amber-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current stroke-2"
          >
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3" />
          </svg>
          Download CV
        </a>
        
      </header>
      

      

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        <div className="group flex min-h-36 flex-col items-start rounded-lg border-2 border-neutral-900 bg-amber-50 p-4 shadow-[3px_3px_0_#171717] transition-transform hover:-translate-y-0.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-200 text-amber-950">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-current stroke-2"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </span>
          <span className="mt-4 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Email
          </span>
          <span className="mt-1 break-all font-semibold text-neutral-900">
            {contact.email}
          </span>
          <div className="mt-auto flex w-full items-center justify-between gap-2 pt-3">
            <a
              href={emailComposeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600"
            >
              Send a message
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-none stroke-current stroke-2"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy ${contact.email}`}
              className="inline-flex shrink-0 items-center gap-1 rounded border border-amber-900/20 px-2 py-1 text-xs font-semibold text-amber-950 transition-colors hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600"
            >
              {copyStatus === "copied" ? "Copied!" : "Copy email"}
            </button>
          </div>
          <span className="sr-only" aria-live="polite">
            {copyStatus === "copied"
              ? "Email address copied."
              : copyStatus === "error"
                ? "Could not copy email address."
                : ""}
          </span>
        </div>

        {contact.socials.map((social) => {
          const icon = SOCIAL_ICONS[social.label];
          const isLinkedIn = social.label === "LinkedIn";
          return (
            <a
              key={social.url}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-36 flex-col items-start rounded-lg border border-neutral-300 bg-white p-4 transition-colors hover:border-neutral-900 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600"
            >
              <span className="flex h-10 w-10 items-center justify-center">
                {icon ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    style={{ color: `#${icon.hex}` }}
                  >
                    <path fill="currentColor" d={icon.path} />
                  </svg>
                ) : isLinkedIn ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-7 w-7 fill-[#0a66c2]"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                  </svg>
                ) : null}
              </span>
              <span className="mt-4 block font-semibold text-neutral-900">
                {social.label}
              </span>
              <span className="mt-auto flex w-full items-center justify-between pt-3 text-xs text-neutral-500">
                View profile
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-none stroke-current stroke-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </span>
            </a>
          );
        })}
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded bg-neutral-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Close (Esc)
        </button>
      </footer>
    </section>
  );
}

function PhotoButton({
  photo,
  onOpen,
  wrapClass = "",
  imgClass = "",
}: {
  photo: PhotoData;
  onOpen: () => void;
  wrapClass?: string;
  imgClass?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onContextMenu={(e) => e.preventDefault()}
      aria-label={`View larger: ${photo.alt}`}
      className={`group block cursor-zoom-in select-none overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 ${wrapClass}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`pointer-events-none select-none transition-transform duration-200 group-hover:scale-105 ${imgClass}`}
      />
    </button>
  );
}

function Lightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: PhotoData[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const photo = photos[index];
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const go = (d: number) =>
    onChange((index + d + photos.length) % photos.length);

  // Capture phase: Esc dan panah ditangani di sini dan tidak diteruskan
  // ke kartu di belakangnya, jadi Esc hanya menutup foto
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "ArrowRight" && photos.length > 1) {
        e.stopPropagation();
        onChange((index + 1) % photos.length);
      } else if (e.key === "ArrowLeft" && photos.length > 1) {
        e.stopPropagation();
        onChange((index - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey, true);
    };
  }, [index, photos.length, onChange, onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-30 bg-black/95"
      onClick={onClose}
      onContextMenu={(e) => e.preventDefault()}
    >
      <button
        type="button"
        aria-label="Close image preview"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-3 top-3 z-30 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-slate-900/80 px-4 py-1.5 text-sm text-white hover:bg-white/30 sm:right-5 sm:top-5"
      >
        Close (Esc)
      </button>

      {photos.length > 1 && (
        <>
          <button
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 z-20 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/80 px-3 py-3 text-2xl text-white hover:bg-white/30 sm:left-5"
          >
            ‹
          </button>
          <button
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 z-20 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/80 px-3 py-3 text-2xl text-white hover:bg-white/30 sm:right-5"
          >
            ›
          </button>
        </>
      )}

      <figure
        className="absolute inset-x-14 bottom-24 top-16 z-0 flex flex-col items-center justify-center touch-pan-y sm:inset-x-20"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = touch
            ? { x: touch.clientX, y: touch.clientY }
            : null;
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          const touch = event.changedTouches[0];
          touchStart.current = null;
          if (!start || !touch || photos.length < 2) return;
          const deltaX = touch.clientX - start.x;
          const deltaY = touch.clientY - start.y;
          if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) {
            return;
          }
          go(deltaX < 0 ? 1 : -1);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.full ?? photo.src}
          alt={photo.alt}
          draggable={false}
          className="max-h-[calc(100dvh-13rem)] max-w-full select-none rounded-lg object-contain"
          onClick={(event) => event.stopPropagation()}
        />
        <figcaption className="mt-3 text-center text-sm text-white/80">
          {photo.caption ?? photo.alt}
          {photos.length > 1 && (
            <span className="text-white/50">
              {" "}
              · {index + 1} / {photos.length}
            </span>
          )}
        </figcaption>
      </figure>
      {photos.length > 1 && (
        <div
          className="absolute bottom-3 left-1/2 z-20 flex max-w-[88vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-lg bg-black/40 px-1 pb-2 pt-1"
          aria-label="Photo previews"
          onClick={(e) => e.stopPropagation()}
        >
          {photos.map((preview, previewIndex) => (
            <button
              key={preview.src}
              type="button"
              aria-label={`View photo ${previewIndex + 1}: ${preview.alt}`}
              aria-pressed={previewIndex === index}
              onClick={() => onChange(previewIndex)}
              className={`shrink-0 overflow-hidden rounded-md border-2 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 ${
                previewIndex === index
                  ? "border-amber-400 opacity-100"
                  : "border-white/20 opacity-60"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview.src}
                alt=""
                draggable={false}
                className="h-14 w-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}

function AboutContent() {
  const [viewer, setViewer] = useState<number | null>(null);
  const heading =
    "mt-6 text-sm font-semibold uppercase tracking-wider text-neutral-500";
  // Urutan tampilan besar: portrait dulu, lalu galeri
  const photos = [about.portrait, ...about.gallery];

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
        About me
      </p>

      <div className="mt-3 flex gap-4">
        <PhotoButton
          photo={about.portrait}
          onOpen={() => setViewer(0)}
          wrapClass="h-40 w-32 shrink-0"
          imgClass="h-full w-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="mt-2 leading-relaxed text-neutral-700">
            {about.tagline}
          </p>
          {about.location && (
            <p className="mt-3 text-sm text-neutral-500">
              Based in {about.location}
            </p>
          )}
        </div>
      </div>

      <h3 className={heading}>Education</h3>
      <div className="mt-3 space-y-5">
        {education.map((e) => (
          <div key={e.id} className="border-l-2 border-neutral-300 pl-4">
            <div className="flex items-start gap-3">
              {e.school.includes("Universitas Pembangunan Nasional") && (
                <UpnvjLogo className="h-16 w-16 shrink-0" />
              )}

              <div className="min-w-0">
                <p className="font-medium leading-snug">{e.degree}</p>

                <p className="mt-0.5 text-sm text-neutral-600">
                  {e.school}
                </p>

                <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                  <span>{e.start} – {e.end}</span>

                  {e.gpa && (
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-700">
                      GPA {e.gpa}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {e.highlights && (
              <ul className="mt-1 list-disc pl-5 text-sm">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {about.interests.length > 0 && (
        <>
          <h3 className={heading}>Outside Work</h3>
          <p className="mt-2 flex flex-wrap gap-2">
            {about.interests.map((i) => (
              <span
                key={i.label}
                className="rounded-full bg-neutral-100 px-3 py-1 text-sm"
              >
                {i.label}
                {i.note ? (
                  <span className="text-neutral-500"> · {i.note}</span>
                ) : null}
              </span>
            ))}
          </p>
        </>
      )}

      {about.gallery.length > 0 && (
        <>
          <h3 className={heading}>Snapshots</h3>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {about.gallery.map((g, i) => (
              <figure key={g.src}>
                <PhotoButton
                  photo={g}
                  onOpen={() => setViewer(i + 1)}
                  wrapClass="w-full"
                  imgClass="aspect-[4/3] w-full object-cover"
                />
                {g.caption && (
                  <figcaption className="mt-1 text-xs text-neutral-500">
                    {g.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </>
      )}

      {viewer !== null && (
        <Lightbox
          photos={photos}
          index={viewer}
          onChange={setViewer}
          onClose={() => setViewer(null)}
        />
      )}
    </>
  );
}

const AREA_STYLE: Record<AiesecArea, { label: string; cls: string }> = {
  marketing: { label: "Marketing", cls: "bg-rose-100 text-rose-900" },
  cx: { label: "Customer Experience", cls: "bg-orange-100 text-orange-900" },
  logistics: { label: "Event Logistics", cls: "bg-slate-200 text-slate-800" },
  web: { label: "Web", cls: "bg-blue-200 text-slate-800" },
};

function AreaPill({ area }: { area: AiesecArea }) {
  const s = AREA_STYLE[area];
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Favorite role"
      title="Favorite role"
      className={`text-amber-500 ${className}`}
    >
      ★
    </span>
  );
}

function AiesecContent() {
  const [roleId, setRoleId] = useState<string | null>(null);
  const [viewer, setViewer] = useState<{
    photos: PhotoData[];
    index: number;
  } | null>(null);

  const role = aiesec.roles.find((r) => r.id === roleId) ?? null;
  const heading =
    "mt-6 text-sm font-semibold uppercase tracking-wider text-neutral-500";

  useEffect(() => {
    if (!roleId || viewer) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        setRoleId(null);
      }
    };

    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [roleId, viewer]);

  const lightbox = viewer && (
    <Lightbox
      photos={viewer.photos}
      index={viewer.index}
      onChange={(i) => setViewer({ photos: viewer.photos, index: i })}
      onClose={() => setViewer(null)}
    />
  );

  // ---------- Detail of one role ----------
  if (role) {
    const scope = aiesec.scopes.find((s) => s.id === role.scope);
    const photos = role.photos ?? [];
    return (
      <>
        <h2 className="text-2xl font-bold leading-snug">
          {role.favorite && <Star className="mr-2" />}
          {role.title}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {scope?.label} · {role.start} – {role.end}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-2">
          <AreaPill area={role.area} />
          <RoleChips tags={role.tags} />
          {role.directReports ? (
            <span className="text-xs text-neutral-500">
              Led {role.directReports} people directly
            </span>
          ) : null}
        </p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5">
          {role.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        {photos.length > 0 && (
          <>
            <h3 className={heading}>Photos</h3>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((p, i) => (
                <PhotoButton
                  key={p.src}
                  photo={p}
                  onOpen={() => setViewer({ photos, index: i })}
                  wrapClass="w-full"
                  imgClass="aspect-[4/3] w-full object-cover"
                />
              ))}
            </div>
          </>
        )}
        {lightbox}
      </>
    );
  }

  // ---------- Overview ----------
  const gallery = aiesec.gallery;
  const shown = gallery.slice(0, 6);
  const more = gallery.length - shown.length;

  const directReports = aiesec.roles.reduce(
    (n, r) => n + (r.directReports ?? 0),
    0
  );
  const parts = aiesec.roles
    .filter((r) => r.directReports)
    .map((r) => r.directReports);
  const hasFavorites = aiesec.roles.some((r) => r.favorite);

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
        Organization
      </p>
      <div className="mt-2 flex items-center gap-3">
        {aiesec.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={aiesec.logo.src}
            alt={aiesec.logo.alt}
            draggable={false}
            className="h-10 w-auto select-none object-contain"
          />
        )}
        <h2 className="text-2xl font-bold">{aiesec.title}</h2>
      </div>
      {aiesec.summary.map((p) => (
        <p key={p} className="mt-3 text-neutral-700">
          {p}
        </p>
      ))}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {directReports > 0 && (
          <div className="rounded-lg bg-neutral-900 p-3 text-center text-white">
            <p className="text-lg font-bold">{directReports}</p>
            <p className="mt-0.5 text-xs leading-snug text-white/80">
              direct reports led ({parts.join(" + ")})
            </p>
          </div>
        )}
        {aiesec.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-neutral-100 p-3 text-center"
          >
            <p className="text-lg font-bold">{s.value}</p>
            <p className="mt-0.5 text-xs leading-snug text-neutral-600">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {hasFavorites && (
        <p className="mt-4 text-s text-neutral-500">
          <Star className="mr-1" />
          Favorite Role
        </p>
      )}

      {aiesec.scopes.map((s) => (
        <section key={s.id}>
          <h3 className={heading}>{s.label}</h3>
          <p className="text-xs text-neutral-500">{s.note}</p>
          <ul className="mt-2 space-y-2">
            {aiesec.roles
              .filter((r) => r.scope === s.id)
              .map((r) => {
                const photos = r.photos ?? [];
                const thumbnail = photos[0];

                return (
                  <li
                    key={r.id}
                    className="flex items-stretch gap-3 rounded-lg border border-neutral-300 p-3 hover:border-neutral-900 hover:bg-neutral-50"
                  >
                    {thumbnail && (
                      <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                        <PhotoButton
                          photo={thumbnail}
                          onOpen={() => setViewer({ photos, index: 0 })}
                          wrapClass="h-full w-full"
                          imgClass="h-full w-full object-cover"
                        />
                        {photos.length > 1 && (
                          <span className="pointer-events-none absolute bottom-1 right-1 rounded bg-neutral-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            +{photos.length - 1} photos
                          </span>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setRoleId(r.id)}
                      className="flex min-w-0 flex-1 items-start gap-3 text-left"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium leading-snug">
                          {r.favorite && <Star className="mr-1" />}
                          {r.title}
                        </span>
                        <span className="block text-xs text-neutral-500">
                          {r.start} – {r.end}
                        </span>
                        <span className="mt-1 block text-sm text-neutral-700">
                          {r.summary}
                        </span>
                        <span className="mt-2 flex flex-wrap items-center gap-2">
                          <AreaPill area={r.area} />
                          <RoleChips tags={r.tags} />
                          {r.directReports ? (
                            <span className="text-xs text-neutral-500">
                              Led {r.directReports} people
                            </span>
                          ) : null}
                        </span>
                      </span>
                      <span aria-hidden className="mt-1 text-neutral-400">
                        ›
                      </span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}

      {gallery.length > 0 && (
        <>
          <h3 className={heading}>Moments</h3>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {shown.map((p, i) => {
              const isLast = i === shown.length - 1 && more > 0;
              return (
                <div key={p.src} className="relative">
                  <PhotoButton
                    photo={p}
                    onOpen={() => setViewer({ photos: gallery, index: i })}
                    wrapClass="w-full"
                    imgClass="aspect-[4/3] w-full object-cover"
                  />
                  {isLast && (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-black/55 text-lg font-semibold text-white">
                      +{more}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      {lightbox}
    </>
  );
}

function SkillsContent() {
  const [viewer, setViewer] = useState<{
    photos: PhotoData[];
    index: number;
  } | null>(null);

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
        Skills, Certifications &amp; Trainings
      </p>
      <h2 className="mt-1 text-2xl font-bold">Skills</h2>
      <p className="mt-2 text-sm text-neutral-600">
        Tools and capabilities I have applied across analytics, machine
        learning, and web development.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {skills.map((group) => {
          const certificates = group.certificates ?? [];
          const isLanguageGroup = group.id === "lang";
          return (
            <section
              key={group.id}
              className={`rounded-lg border border-neutral-200 p-4 ${
                isLanguageGroup
                  ? "sm:col-span-2 text-center"
                  : ""
              }`}
            >
              <h3 className="font-semibold">{group.label}</h3>
              <ul
                className={`mt-3 flex flex-wrap gap-1.5 ${
                  isLanguageGroup ? "justify-center" : ""
                }`}
              >
                {group.items.map((item) => (
                  <TechBadge key={item} technology={item} />
                ))}
              </ul>
              {certificates.length > 0 && (
                <div
                  className={`mt-4 flex flex-wrap gap-4 ${
                    isLanguageGroup ? "justify-center" : ""
                  }`}
                >
                  {certificates.map((certificate, index) => (
                    <figure key={certificate.src} className="w-40">
                      <PhotoButton
                        photo={certificate}
                        onOpen={() =>
                          setViewer({ photos: certificates, index })
                        }
                        wrapClass="w-full"
                        imgClass="aspect-[3/2] w-full object-cover"
                      />
                      <figcaption className="mt-1 text-[10px] leading-snug text-neutral-500">
                        {certificate.caption ?? certificate.alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <h2 className="mt-8 text-2xl font-bold">Certifications &amp; training</h2>
      <div className="mt-3 grid items-start gap-3 sm:grid-cols-2">
        {certifications.map((certification) => (
          <CertificationCard
            key={certification.id}
            certification={certification}
            onOpenPhoto={(photos, index) => setViewer({ photos, index })}
          />
        ))}
      </div>
      {viewer && (
        <Lightbox
          photos={viewer.photos}
          index={viewer.index}
          onChange={(index) => setViewer({ ...viewer, index })}
          onClose={() => setViewer(null)}
        />
      )}
    </>
  );
}

function CertificationCard({
  certification,
  onOpenPhoto,
}: {
  certification: (typeof certifications)[number];
  onOpenPhoto: (photos: PhotoData[], index: number) => void;
}) {
  const photos = certification.photos ?? [];

  return (
    <article
      className={`grid items-start gap-4 rounded-lg border border-neutral-200 p-4 ${
        photos.length > 0 ? "md:grid-cols-[minmax(0,1fr)_120px]" : ""
      }`}
    >
      <div className="min-w-0">
        <h4 className="font-semibold leading-snug">{certification.title}</h4>
        <p className="mt-1 text-sm text-neutral-600">{certification.issuer}</p>
        <p className="mt-1 text-xs text-neutral-500">
          Issued {certification.issued}
          {certification.expires ? ` · Expires ${certification.expires}` : ""}
        </p>
        <dl className="mt-2 grid gap-y-1 text-xs text-neutral-600">
          <div>
            <dt className="inline font-medium text-neutral-800">When: </dt>
            <dd className="inline">
              {certification.activityDate ?? "Details to be added"}
            </dd>
          </div>
          <div>
            <dt className="inline font-medium text-neutral-800">Where: </dt>
            <dd className="inline">
              {certification.location ?? "Details to be added"}
            </dd>
          </div>
        </dl>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <RoleChips tags={certification.tags} />
          {certification.url && (
            <a
              href={certification.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium underline underline-offset-2 hover:text-neutral-600"
            >
              View credential
            </a>
          )}
        </div>
      </div>
      {photos.length > 0 && (
        <div>
          <figure>
            <div className="relative">
              <PhotoButton
                photo={photos[0]}
                onOpen={() => onOpenPhoto(photos, 0)}
                wrapClass="w-full"
                imgClass="aspect-[4/3] w-full object-cover"
              />
              {photos.length > 1 && (
                <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-neutral-950/80 px-2 py-1 text-[10px] font-semibold text-white">
                  +{photos.length - 1} photos
                </span>
              )}
            </div>
            {photos[0].caption && (
              <figcaption className="mt-1 text-[10px] leading-snug text-neutral-500">
                {photos[0].caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </article>
  );
}

function ExperienceContent({ id }: { id: string }) {
  const [viewer, setViewer] = useState<number | null>(null);
  const experience = experiences.find((item) => item.id === id);
  if (!experience) return null;

  const photos = experience.photos ?? [];
  const heading =
    "mt-6 text-sm font-semibold uppercase tracking-wider text-neutral-500";

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-neutral-600">
            {experience.org}
          </p>
          {experience.industry && (
            <p className="mt-1 text-sm text-neutral-500">
              Industry: {experience.industry}
            </p>
          )}
          <h2 className="mt-1 text-2xl font-bold leading-snug">
            {experience.role}
          </h2>
        </div>
        {experience.companyLogo && (
          <Image
            src={experience.companyLogo.src}
            alt={experience.companyLogo.alt}
            width={180}
            height={64}
            className="h-10 w-auto max-w-24 shrink-0 object-contain object-right"
          />
        )}
      </div>
      <p className="mt-1 text-xs text-neutral-500">
        {experience.start} – {experience.end}
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-2">
        <span className="inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
          {experience.type === "internship" ? "Internship" : "Organization"}
        </span>
        <RoleChips tags={experience.tags} />
      </p>

      <h3 className={heading}>Responsibilities &amp; impact</h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5">
        {experience.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      {experience.tools && experience.tools.length > 0 && (
        <section>
          <h3 className={heading}>Tools used</h3>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {experience.tools.map((tool) => (
              <TechBadge key={tool} technology={tool} />
            ))}
          </ul>
        </section>
      )}

      {experience.proofOfWork && experience.proofOfWork.length > 0 && (
        <>
          <h3 className={heading}>Proof of work</h3>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500">
            Recreated from memory for portfolio purposes. All data is synthetic
            and does not represent actual customer or company records.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {experience.proofOfWork.map((item, index) => (
              <figure
                key={item.src}
                className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3"
              >
                <PhotoButton
                  photo={item}
                  onOpen={() => setViewer(index)}
                  wrapClass="w-full"
                  imgClass="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="text-sm leading-relaxed text-neutral-700">
                  {item.caption ?? item.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}

      {photos.length > 0 && (
        <>
          <h3 className={heading}>Photos</h3>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.map((photo, index) => (
              <PhotoButton
                key={photo.src}
                photo={photo}
                onOpen={() =>
                  setViewer((experience.proofOfWork?.length ?? 0) + index)
                }
                wrapClass="w-full"
                imgClass="aspect-[4/3] w-full object-cover"
              />
            ))}
          </div>
        </>
      )}

      {viewer !== null && (
        <Lightbox
          photos={[...(experience.proofOfWork ?? []), ...photos]}
          index={viewer}
          onChange={setViewer}
          onClose={() => setViewer(null)}
        />
      )}
    </>
  );
}

function ProjectContent({ index }: { index: number }) {
  const [viewer, setViewer] = useState<number | null>(null);
  const project = projects[index];
  if (!project) return null;

  const photos = project.photos ?? [];
  const embedUrl = project.demoVideoUrl
    ? getYouTubeEmbedUrl(project.demoVideoUrl)
    : null;
  const githubVideoUrl = project.demoVideoUrl
    ? getGitHubVideoUrl(project.demoVideoUrl)
    : null;
  const heading =
    "mt-6 text-sm font-semibold uppercase tracking-wider text-neutral-500";

  return (
    <>
      {project.category ? (
        <header className="rounded-xl bg-neutral-900 p-5 text-white sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            {project.category}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            {project.title}
          </h2>
          <p className="mt-2 max-w-xl leading-relaxed text-white/75">
            {project.tagline}
          </p>
          
      {project.tags && project.tags.length > 0 && (
        <div className="mt-3">
          <RoleChips tags={project.tags} />
        </div>
      )}

        </header>
      ) : (
        <>
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <p className="mt-1 text-neutral-500">{project.tagline}</p>
          
        </>
        
      )}

      <div className="mt-5 space-y-4">
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Overview
          </h3>
          <p className="mt-1.5 leading-relaxed">{project.problem}</p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600"></p>
        </section>

        <section className="rounded-lg border border-neutral-200 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Tech stack
          </h3>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((technology) => (
              <TechBadge key={technology} technology={technology} />
            ))}
          </ul>
        </section>

        <section className="rounded-lg border-l-4 border-neutral-900 bg-neutral-50 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Key outcome
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed">{project.result}</p>
        </section>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {project.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
              link.url.includes("github.com")
                ? "bg-[#24292f] text-white hover:bg-[#32383f]"
                : "border border-neutral-300 text-neutral-800 hover:border-neutral-900 hover:bg-neutral-50"
            }`}
          >
            {link.url.includes("github.com") && <GitHubMark />}
            {link.label}
          </a>
        ))}
        {project.thesisUrl && (
          <a
          href={project.thesisUrl}
          target="_blank"
          rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0b4d2b] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#073b20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
            <UpnvjLogo className="h-7 w-7 rounded bg-white p-0.5" />
            Thesis Repo
          </a>
        )}
        {!project.thesisUrl && project.thesisRepositoryPlaceholder && (
          <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#0b4d2b]/40 bg-[#0b4d2b]/5 px-4 py-2 font-medium text-neutral-500">
            <UpnvjLogo className="h-7 w-7 rounded bg-white p-0.5" />
            {project.thesisRepositoryPlaceholder}
          </span>
        )}
      {project.appUrl && (
        <a
          href={project.appUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          {project.id === "goihunt" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/logos/goihunt.ico"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 rounded-sm object-contain"
            />
          )}
          {project.id === "notalens" && (
            <div className="bg-white rounded">
              {/* // eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/notalens.ico"
                alt=""
                aria-hidden="true"
                className="h-5 w-5 rounded-sm object-contain"
              />
            </div>
          )}
          {project.id === "9am" && (
            <div className="bg-white rounded">
              {/* // eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/9AM.svg"
                alt=""
                aria-hidden="true"
                className="p-0.5 h-5 w-5 rounded-sm object-contain"
              />
            </div>
          )}
          Open App
        </a>
      )}
      {!project.appUrl && project.appUrlPlaceholder && (
        <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-emerald-700/40 bg-emerald-50 px-4 py-2 font-medium text-neutral-500">
          {project.appUrlPlaceholder}
        </span>
      )}
      </div>


      {(project.demoVideoUrl || project.demoVideoPlaceholder) && (
        <>
          <h3 className={heading}>Demo video</h3>
          {embedUrl ? (
            <div className="mt-2 aspect-video overflow-hidden rounded-lg bg-neutral-100">
              <iframe
                src={embedUrl}
                title={`${project.title} demo video`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          ) : githubVideoUrl ? (
            <div className="mt-2 aspect-video overflow-hidden rounded-lg bg-neutral-950">
              <video
                src={githubVideoUrl}
                title={`${project.title} demo video`}
                controls
                preload="metadata"
                playsInline
                className="h-full w-full"
              />
            </div>
          ) : project.demoVideoUrl ? (
            <p className="mt-2 text-sm text-amber-800">
              The demo URL is not a supported YouTube or GitHub video link.
            </p>
          ) : (
            <div className="mt-2 flex aspect-video items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-sm text-neutral-500">
              {project.demoVideoPlaceholder}
            </div>
          )}
        </>
      )}

      {photos.length > 0 && (
        <>
          <h3 className={heading}>
            {project.id === "hangman"
              ? "Game screenshots"
              : project.id === "heart-disease-prediction" ||
                  project.id === "heart-disease-preprocessing"
                ? "Project documentation"
                : "App screenshots"}
          </h3>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {photos.map((photo, photoIndex) => (
              <figure key={photo.src}>
                <PhotoButton
                  photo={photo}
                  onOpen={() => setViewer(photoIndex)}
                  wrapClass="w-full"
                  imgClass={`w-full ${
                    project.id === "goihunt" || project.id === "notalens"
                      ? "aspect-[9/16] bg-neutral-100 object-contain"
                      : "aspect-video bg-neutral-100 object-contain"
                  }`}
                />
                {photo.caption && (
                  <figcaption className="mt-1 text-xs text-neutral-500">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </>
      )}

      {viewer !== null && (
        <Lightbox
          photos={photos}
          index={viewer}
          onChange={setViewer}
          onClose={() => setViewer(null)}
        />
      )}
    </>
  );
}

function renderContent(target: string, onClose?: () => void) {
  const [kind, idx] = target.split(":");
  const i = Number(idx);
    

    if (kind === "about") return <AboutContent />;

    if (kind === "aiesec") return <AiesecContent />;

    if (kind === "intro") {
    const stops = zones.slice(1); // lewati Spawn
    return (
      <>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Now boarding
        </p>
        <h2 className="mt-1 text-2xl font-bold">{intro.greeting}</h2>
        {intro.paragraphs.map((p) => (
          <p key={p} className="mt-3">
            {p}
          </p>
        ))}
        {intro.status && (
          <p className="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-900">
            {intro.status}
          </p>
        )}

        {/* Garis rute: stasiun-stasiun di depan */}
        <ol className="mt-6 flex text-center text-xs text-neutral-600">
          {stops.map((z, i) => (
            <li key={z.name} className="relative flex-1">
              <span className="relative z-10 mx-auto block h-3 w-3 rounded-full border-2 border-neutral-900 bg-white" />
              {i < stops.length - 1 && (
                <span className="absolute left-1/2 top-[5px] h-0.5 w-full bg-neutral-900" />
              )}
              <span className="mt-1.5 block">{z.name}</span>
            </li>
          ))}
        </ol>
      </>
    );
  }

  if (kind === "profile") {
    return (
      <>
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        <p className="text-neutral-500">{profile.role}</p>
        <p className="mt-4">{profile.pitch}</p>
        <p className="mt-2">{profile.bio}</p>
        <p className="mt-4 text-sm">
          Interests: {profile.interests.join(", ")}
        </p>
      </>
    );
  }

  

  if (kind === "experience") {
    return <ExperienceContent id={idx} />;
  }

  if (kind === "skills") {
    return <SkillsContent />;
  }

  if (kind === "project") {
    return <ProjectContent index={i} />;
  }

  if (kind === "contact") {
    return onClose ? <ContactContent onClose={onClose} /> : null;
  }

  return null;
}

function ProjectsMarket() {
  const [detail, setDetail] = useState<number | null>(null);

  useEffect(() => {
    if (detail === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setDetail(null);
    };

    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [detail]);

  if (detail !== null) {
    return renderContent(`project:${detail}`);
  }

  return (
    <>
      <h2 className="text-2xl font-bold">All Projects</h2>
      <p className="mt-1 text-neutral-500">
        Explore {projects.length} projects and their details.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setDetail(i)}
              className="flex h-full w-full flex-col rounded-lg border border-neutral-300 p-4 text-left transition-colors hover:border-neutral-900 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500"
            >
              {p.category && (
                <span className="mb-2 self-start rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
                  {p.category}
                </span>
              )}
              <span className="font-semibold">{p.title}</span>
              <span className="mt-1 text-sm text-neutral-600">{p.tagline}</span>
              <span className="mt-2">
                <RoleChips tags={p.tags} />
              </span>
              <span className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {p.stack.map((technology) => (
                  <TechBadge key={technology} technology={technology} />
                ))}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function ContentModal({ target, onClose }: Props) {
  // Esc closes the modal
  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target, onClose]);

  if (!target) return null;

  const isWideModal =
    target === "about" ||
    target === "aiesec" ||
    target === "contact" ||
    target === "skills" ||
    target.startsWith("experience:") ||
    target.startsWith("project:") ||
    target === "projects";

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className={`max-h-[80vh] w-full overflow-y-auto border-4 border-neutral-900 bg-white p-6 text-neutral-900 shadow-[6px_6px_0_#b88746,10px_10px_0_#171717] ${
          isWideModal ? "max-w-4xl" : "max-w-lg"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {target === "projects" ? (
          <ProjectsMarket />
        ) : (
          renderContent(target, onClose)
        )}
        {target !== "contact" && (
          <button
            className="mt-6 rounded bg-neutral-900 px-4 py-2 text-white"
            onClick={onClose}
          >
            {target === "intro" ? "Start Walking (Esc)" : "Close (Esc)"}
          </button>
        )}
      </div>
    </div>
  );
}