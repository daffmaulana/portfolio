"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { siGithub, type SimpleIcon } from "simple-icons";
import {
  about,
  aiesec,
  certifications,
  contact,
  education,
  experiences,
  profile,
  projects,
  skills,
} from "@/content/data";
import ClassicDetailModal from "@/components/ClassicDetailModal";
import ClassicToolBadge from "@/components/ClassicToolBadge";
import type { PhotoData } from "@/content/types";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          dark ? "text-cyan-300" : "text-cyan-700"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-2 text-3xl font-semibold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 leading-relaxed ${
            dark ? "text-white/60" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GamepadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 fill-none stroke-current stroke-[1.7]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.5 8h9a4 4 0 0 1 3.8 2.8l1.1 3.5a2.2 2.2 0 0 1-3.6 2.3l-2.2-1.9H8.4l-2.2 1.9a2.2 2.2 0 0 1-3.6-2.3l1.1-3.5A4 4 0 0 1 7.5 8Z" />
      <path d="M8 10.5v4m-2-2h4m6-1h.01M18 14h.01" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current stroke-[1.7]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* klip di atas */}
      <rect x="8" y="2" width="8" height="4" rx="1" />
      {/* badan papan */}
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function stopOutsideImageClick(event: MouseEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  const bounds = image.getBoundingClientRect();
  if (!image.naturalWidth || !image.naturalHeight) {
    return;
  }

  const scale = Math.min(
    bounds.width / image.naturalWidth,
    bounds.height / image.naturalHeight,
  );
  const imageWidth = image.naturalWidth * scale;
  const imageHeight = image.naturalHeight * scale;
  const imageLeft = bounds.left + (bounds.width - imageWidth) / 2;
  const imageTop = bounds.top + (bounds.height - imageHeight) / 2;
  if (
    event.clientX >= imageLeft &&
    event.clientX <= imageLeft + imageWidth &&
    event.clientY >= imageTop &&
    event.clientY <= imageTop + imageHeight
  ) {
    event.stopPropagation();
  }
}

function PhotoLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: PhotoData[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const photo = photos[index];
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!photo) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate((index - 1 + photos.length) % photos.length);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate((index + 1) % photos.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, onClose, onNavigate, photo, photos.length]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption ?? photo.alt}
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close image preview"
        className="absolute right-3 top-3 z-30 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 sm:right-5 sm:top-5"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        Close <span aria-hidden="true">×</span>
      </button>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index - 1 + photos.length) % photos.length);
            }}
            className="absolute left-2 top-1/2 z-20 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 p-3 text-white transition hover:bg-white/20 sm:left-5"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index + 1) % photos.length);
            }}
            className="absolute right-2 top-1/2 z-20 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 p-3 text-white transition hover:bg-white/20 sm:right-5"
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}
      <figure
        className="absolute inset-x-14 bottom-24 top-16 z-0 flex flex-col items-center touch-pan-y sm:inset-x-20"
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
          onNavigate((index + (deltaX < 0 ? 1 : -1) + photos.length) % photos.length);
        }}
      >
        <div className="relative min-h-0 w-full flex-1">
          <Image
            src={photo.full ?? photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 72vw, 80vw"
            className="object-contain"
            onClick={stopOutsideImageClick}
          />
        </div>
        {(photo.caption || photo.alt) && (
          <figcaption className="mt-3 text-center text-sm text-white/75">
            {photo.caption ?? photo.alt}
          </figcaption>
        )}
      </figure>
      {photos.length > 1 && (
        <div
          aria-label="Photo previews"
          className="absolute bottom-1 left-1/2 z-20 flex max-w-[88vw] -translate-x-1/2 gap-2 overflow-x-auto px-1 pb-1"
          onClick={(event) => event.stopPropagation()}
        >
          {photos.map((preview, previewIndex) => (
            <button
              key={preview.src}
              type="button"
              aria-label={`View photo ${previewIndex + 1}: ${preview.alt}`}
              aria-pressed={previewIndex === index}
              onClick={() => onNavigate(previewIndex)}
              className={`shrink-0 overflow-hidden rounded-md border-2 ${
                previewIndex === index
                  ? "border-cyan-300"
                  : "border-white/20 opacity-65"
              }`}
            >
              <Image
                src={preview.src}
                alt=""
                width={80}
                height={56}
                className="h-12 w-16 object-cover sm:h-14 sm:w-20"
              />
            </button>
          ))}
        </div>
      )}
      {photos.length > 1 && (
        <span className="absolute bottom-[4.5rem] left-1/2 z-10 -translate-x-1/2 text-xs text-white/70">
          {index + 1} / {photos.length}
        </span>
      )}
    </div>
  );
}

function PhotoTile({
  photo,
  onClick,
  className = "",
}: {
  photo: PhotoData;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={`View ${photo.caption ?? photo.alt}`}
      onClick={onClick}
      className={`group relative block overflow-hidden rounded-2xl bg-slate-100 text-left ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 640px) 45vw, 260px"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
      {photo.caption && (
        <span className="absolute inset-x-3 bottom-3 text-xs font-medium text-white">
          {photo.caption}
        </span>
      )}
    </button>
  );
}

function PhotoPreviewThumbnail({
  photos,
  onClick,
}: {
  photos: PhotoData[];
  onClick: () => void;
}) {
  const firstPhoto = photos[0];
  if (!firstPhoto) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${photos.length} photos`}
      className="group relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
    >
      <Image
        src={firstPhoto.src}
        alt={firstPhoto.alt}
        fill
        sizes="128px"
        className="object-cover transition duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
      <span className="absolute inset-x-2 bottom-2 text-xs font-semibold text-white">
        +{photos.length - 1} photos
      </span>
    </button>
  );
}

export default function ClassicPortfolio() {
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const [modalTarget, setModalTarget] = useState<string | null>(null);
  const [gameWarningOpen, setGameWarningOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{
    photos: PhotoData[];
    index: number;
  } | null>(null);
  const navigateLightbox = (index: number) =>
    setLightbox((current) => (current ? { ...current, index } : current));
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const languageGroup = skills.find((group) => group.id === "lang");
  const languageCertificates = languageGroup?.certificates ?? [];
  const emailComposeUrl = `https://mail.google.com/mail/?${new URLSearchParams({
    view: "cm",
    fs: "1",
    to: contact.email,
    su: "Professional Inquiry",
    body: "Hello Daffa,\n\nI came across your portfolio and would like to connect with you regarding a potential opportunity or collaboration.\n\nLooking forward to hearing from you.\n\nBest regards,",
  }).toString()}`;

  useEffect(() => {
    document.documentElement.classList.add("classic-page");
    return () => document.documentElement.classList.remove("classic-page");
  }, []);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - previousScrollY;

      if (currentScrollY < 80) {
        setHeaderVisible(true);
      } else if (Math.abs(scrollDifference) > 8) {
        if (
          scrollDifference < 0 ||
          headerRef.current?.contains(document.activeElement)
        ) {
          setHeaderVisible(true);
        } else {
          setHeaderVisible(false);
        }
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!gameWarningOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGameWarningOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameWarningOpen]);

  function openGamePage() {
    const supportsGame = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)",
    ).matches;
    if (supportsGame) {
      router.push("/");
      return;
    }
    setGameWarningOpen(true);
  }

  function scrollToSection(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    const scrollMarginTop = Number.parseFloat(
      window.getComputedStyle(target).scrollMarginTop,
    );
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      (Number.isFinite(scrollMarginTop) ? scrollMarginTop : 0);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
    window.history.pushState(null, "", href);
  }

  function openRelatedProject(projectId: string) {
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId,
    );
    const projectSection = document.getElementById("projects");
    if (projectIndex < 0 || !projectSection) {
      console.error(`Unable to open related project "${projectId}".`);
      return;
    }

    const openModal = () => setModalTarget(`project:${projectIndex}`);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      projectSection.scrollIntoView({ behavior: "instant", block: "start" });
      openModal();
      return;
    }

    let timeoutId = 0;
    const finishNavigation = () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scrollend", finishNavigation);
      openModal();
    };
    window.addEventListener("scrollend", finishNavigation, { once: true });
    timeoutId = window.setTimeout(finishNavigation, 1200);
    projectSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
    <main className="classic-portfolio min-h-screen overflow-x-clip bg-[#f7f9fc] text-slate-900">
      <header
        ref={headerRef}
        onFocusCapture={() => setHeaderVisible(true)}
        className={`sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-transform duration-300 motion-reduce:transition-none ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center gap-1 px-2 py-3 sm:gap-2 sm:px-3 md:gap-1 md:px-2 min-[900px]:gap-2 min-[900px]:px-4 xl:gap-6 xl:px-8"
        >
          <div
            aria-label={`${profile.name}, open to work`}
            className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2"
          >
            <a
              href="#home"
              onClick={(event) => scrollToSection(event, "#home")}
              aria-label={`${profile.name} — Home`}
              className="shrink-0 rounded-xl transition hover:opacity-75"
            >
              <Image
                src="/logos/portofolio.ico"
                width={38}
                height={38}
                unoptimized
                alt=""
                className="h-[34px] w-[34px] object-contain sm:h-[38px] sm:w-[38px]"
              />
            </a>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[10px] font-semibold tracking-tight text-slate-950 sm:text-xs">
                Daffa Bagus Maulana
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-emerald-700 sm:gap-1.5 sm:text-[9px] sm:tracking-[0.12em]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                />
                Open to work
              </span>
            </span>
          </div>
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-3 text-[9px] font-medium text-slate-600 md:flex min-[900px]:gap-3 min-[900px]:text-xs xl:gap-3 xl:text-sm">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => scrollToSection(event, item.href)}
                className="shrink-0 rounded-lg px-0.5 py-2 transition hover:bg-slate-100 hover:text-slate-950 min-[900px]:px-1 xl:px-3"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 md:ml-0 md:gap-1 min-[900px]:gap-2">
            <button
              type="button"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:border-cyan-600 hover:text-cyan-800 md:hidden sm:h-11 sm:w-11"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                {mobileMenuOpen ? "×" : "☰"}
              </span>
            </button>
            <button
              type="button"
              onClick={openGamePage}
              aria-haspopup="dialog"
              className="hidden items-center gap-1 rounded-lg border border-slate-300 bg-white px-1.5 py-2 text-[10px] font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-800 min-[400px]:inline-flex min-[900px]:gap-1.5 min-[900px]:px-2.5 min-[900px]:py-2.5 min-[900px]:text-xs xl:gap-2 xl:px-3.5 xl:text-sm"
            >
              <GamepadIcon />
              Play as a Game
            </button>
            <a
              href={contact.cvUrl}
              download
              className="inline-flex shrink-0 rounded-lg bg-slate-900 px-2 py-2.5 text-[10px] font-semibold text-white transition hover:bg-cyan-800 sm:px-3 sm:text-xs md:px-1.5 md:py-2 md:text-[10px] min-[900px]:px-2.5 min-[900px]:py-2.5 min-[900px]:text-xs xl:px-4 xl:text-sm"
            >
              Download CV
            </a>
          </div>
        </nav>
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-slate-200 bg-white px-5 py-3 md:hidden sm:px-8"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    setMobileMenuOpen(false);
                    scrollToSection(event, item.href);
                  }}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section
        id="home"
        className="relative isolate scroll-mt-24 overflow-hidden border-b border-slate-200"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_22%,rgba(103,232,249,0.18),transparent_28%),linear-gradient(115deg,#f8fafc_0%,#eef5fb_54%,#f8fafc_100%)]" />
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:pb-14 lg:pt-24">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Open to Work Opportunities
              </p>
              <div className="mt-6 grid grid-cols-[minmax(0,1fr)_clamp(5.25rem,22vw,8rem)] items-center gap-3 sm:mt-8 sm:grid-cols-[minmax(0,1fr)_clamp(7rem,20vw,9rem)] lg:block">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-800 sm:text-xs sm:tracking-[0.2em]">
                    Hello, It&apos;s me
                  </p>
                  <h1 className="mt-2 text-[clamp(1.75rem,8vw,3.75rem)] font-semibold leading-[1.03] tracking-[-0.055em] text-slate-950 sm:mt-3 sm:text-6xl lg:max-w-3xl lg:text-[4.5rem] lg:leading-[1.02]">
                    {profile.name}
                    <span className="text-cyan-600">.</span>
                  </h1>
                </div>
                <div className="relative aspect-[0.88] w-full overflow-hidden rounded-2xl border-2 border-white bg-slate-100 shadow-lg shadow-slate-900/10 lg:hidden">
                  <Image
                    src={about.portrait.src}
                    alt={about.portrait.alt}
                    fill
                    priority
                    sizes="(max-width: 640px) 22vw, 144px"
                    className="object-cover object-[center_30%]"
                  />
                </div>
              </div>
              <p className="mt-5 text-lg font-medium text-slate-700 sm:text-xl">
                {profile.role}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                A Computer Science graduate with a track record of turning
                customer feedback and product ideas into practical, measurable
                work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  onClick={(event) => scrollToSection(event, "#projects")}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-cyan-800"
                >
                  Explore projects <ArrowIcon />
                </a>
                <a
                  href={contact.cvUrl}
                  download
                  className="rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-white"
                >
                  Download CV
                </a>
                <a
                  href="#contact"
                  onClick={(event) => scrollToSection(event, "#contact")}
                  className="rounded-full px-4 py-3 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-50"
                >
                  Let&apos;s connect <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="relative mx-auto hidden w-full max-w-[300px] lg:mr-8 lg:block">
              <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-cyan-200/60 blur-3xl" />
              <div className="relative rounded-[1.75rem] border border-white bg-white/75 p-2 shadow-xl shadow-slate-900/10">
                <div className="relative aspect-[0.88] overflow-hidden rounded-[1.3rem] bg-slate-100">
                  <Image
                    src={about.portrait.src}
                    alt={about.portrait.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 75vw, 330px"
                    className="object-cover object-[center_30%]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 border-y border-slate-200/80 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
            <div className="border-l border-slate-200 px-3 first:border-l-0 sm:px-5">
              <p className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                2+ years
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500 sm:text-xs">
                Leadership experience
              </p>
            </div>
            <div className="border-l border-slate-200 px-3 sm:px-5">
              <p className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                {aiesec.stats[0]?.value ?? "—"}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500 sm:text-xs">
                Direct team members led
              </p>
            </div>
            <div className="border-l border-slate-200 px-3 sm:px-5">
              <p className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                {experiences.filter((experience) => experience.type === "internship").length}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500 sm:text-xs">
                Internship experiences
              </p>
            </div>
            <div className="border-l border-slate-200 px-3 sm:px-5">
              <p className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                26,000+
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500 sm:text-xs">
                Feedback records analyzed
              </p>
            </div>
            <div className="border-l border-slate-200 px-3 sm:px-5">
              <p className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                {education[0]?.gpa ?? "—"}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500 sm:text-xs">
                Academic GPA
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 border-y border-slate-200 bg-white/70"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading
            eyebrow="About"
            title="A little more about me."
          />

          <div className="grid items-start gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
            <div className="max-w-xl">
              <p className="text-base leading-7 text-slate-600">
                I&apos;m an Informatics graduate who enjoys turning data and
                practical ideas into useful products. My experience spans
                customer analytics, machine learning, and full-stack
                development.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Across two internships, I analyzed more than 26,000 customer
                feedback records. I also spent over two years with AIESEC,
                leading teams and creating youth leadership experiences, while
                building web applications and machine learning projects.
              </p>

              {education[0] && (
                <div className="mt-7 border-t border-slate-200 pt-5">
                  <div className="flex items-start gap-3">
                    <Image
                      src="/logos/upnvj.png"
                      alt="UPNVJ logo"
                      width={36}
                      height={36}
                      className="mt-0.5 h-9 w-9 shrink-0 object-contain"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-800">
                        Education
                      </p>
                      <h3 className="mt-1 font-semibold text-slate-950">
                        {education[0].degree}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {education[0].school}
                      </p>
                      <p className="mt-1.5 text-xs text-slate-500">
                        {education[0].start} — {education[0].end}
                        {education[0].gpa && ` · GPA ${education[0].gpa}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Outside work
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                {about.interests.map((interest) => (
                  <div key={interest.label}>
                    <p className="font-medium text-slate-800">
                      {interest.label}
                    </p>
                    {interest.note && (
                      <p className="mt-0.5 text-sm text-slate-500">
                        {interest.note}
                      </p>
                    )}
                  </div>
                ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {about.gallery.map((photo, index) => (
                <PhotoTile
                  key={photo.src}
                  photo={photo}
                  onClick={() =>
                    setLightbox({ photos: about.gallery, index })
                  }
                  className="aspect-[0.78/1]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="scroll-mt-24 border-y border-slate-200 bg-white/70"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-8 flex max-w-4xl items-start gap-5">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Organization experience
              </p>
              <h2 className="mt-1 flex items-center gap-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                <span>AIESEC Journey</span>
                {aiesec.logo && (
                  <Image
                    src={aiesec.logo.src}
                    alt={aiesec.logo.alt}
                    width={96}
                    height={96}
                    className="h-[4.5rem] w-[4.5rem] shrink-0 object-contain sm:h-24 sm:w-24"
                  />
                )}
              </h2>
              <p className="mt-2 leading-relaxed text-slate-600">
                {aiesec.summary.join(" ")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {aiesec.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-3xl font-semibold tracking-tight text-cyan-800">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-5 text-slate-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {aiesec.scopes.map((scope) => (
              <div
                key={scope.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">
                  {scope.note}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">
                  {scope.label}
                </h3>
                <ul className="relative mt-4 pl-5 before:absolute before:bottom-4 before:left-[5px] before:top-4 before:w-px before:bg-slate-200">
                  {aiesec.roles
                    .filter((role) => role.scope === scope.id)
                    .map((role) => (
                      <li key={role.id} className="relative py-1">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[19px] top-[1.15rem] h-3 w-3 rounded-full border-2 border-cyan-700 bg-white"
                        />
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setModalTarget(`aiesec-role:${role.id}`)
                            }
                            className="min-w-0 flex-1 rounded-xl border border-transparent px-4 py-3 text-left transition duration-200 hover:border-cyan-100 hover:bg-cyan-50/70 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
                          >
                            <span className="block text-sm font-semibold text-slate-900">
                              {role.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-slate-500">
                              {role.start} — {role.end}
                            </span>
                            <span className="mt-1 block text-sm leading-5 text-slate-600">
                              {role.summary}
                            </span>
                            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-cyan-800">
                              Role details <ArrowIcon />
                            </span>
                          </button>
                          {role.photos && role.photos.length > 0 && (
                            <PhotoPreviewThumbnail
                              photos={role.photos}
                              onClick={() =>
                                setLightbox({ photos: role.photos ?? [], index: 0 })
                              }
                            />
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="internships"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24"
      >
        <SectionHeading
          eyebrow="Internships"
          title="Experience with measurable impact."
          description="I use data, operations, and thoughtful collaboration to improve customer and team experiences."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {[...experiences].reverse().map((experience) => {
            const photos = [
              ...(experience.proofOfWork ?? []),
              ...(experience.photos ?? []),
            ];
            return (
              <article
                key={experience.id}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-700">
                      {experience.type}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">
                      {experience.role}
                    </h3>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-600">
                      {experience.companyLogo && (
                        <Image
                          src={experience.companyLogo.src}
                          alt={experience.companyLogo.alt}
                          width={160}
                          height={48}
                          className="h-7 w-auto shrink-0 object-contain object-left"
                        />
                      )}
                      <span>{experience.org}</span>
                    </p>
                    {experience.industry && (
                      <p className="mt-1 text-xs text-slate-500">
                        Industry: {experience.industry}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
                      {experience.start} — {experience.end}
                    </span>
                    {photos.length > 0 && (
                      <PhotoPreviewThumbnail
                        photos={photos}
                        onClick={() => setLightbox({ photos, index: 0 })}
                      />
                    )}
                  </div>
                </div>
                <ul className="mt-5 flex-1 space-y-3 text-sm leading-6 text-slate-600">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                {experience.tools && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience.tools.map((tool) => (
                      <ClassicToolBadge key={tool} tool={tool} />
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setModalTarget(`experience:${experience.id}`)
                  }
                  className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-cyan-800 hover:text-cyan-600"
                >
                  Experience details <ArrowIcon />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="projects"
        className="scroll-mt-24 border-y border-slate-200 bg-white/70"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="Selected work"
            title="Selected projects."
            description="A selection of applications, data work, and machine learning projects."
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {projects.map((project, index) => {
              const thumbnail = project.photos?.[0];
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setModalTarget(`project:${index}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-slate-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    {thumbnail ? (
                      <Image
                        src={thumbnail.src}
                        alt={thumbnail.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.3),transparent_30%),linear-gradient(135deg,#0f172a,#164e63)]" />
                    )}
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                    {project.category && (
                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
                        {project.category}
                      </span>
                    )}
                  </div>
                  <span className="flex flex-1 flex-col p-3 sm:p-5">
                    <span className="text-base font-semibold tracking-tight text-slate-950 sm:text-xl">
                      {project.title}
                    </span>
                    <span className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600 sm:line-clamp-none sm:text-sm sm:leading-6">
                      {project.tagline}
                    </span>
                    {project.tags && (
                      <span className="mt-3 flex max-h-6 flex-wrap gap-1.5 overflow-hidden sm:max-h-none">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-cyan-50 px-2 py-1 text-[10px] font-medium capitalize text-cyan-900 sm:px-2.5 sm:text-xs"
                          >
                            {tag === "ml" ? "Machine Learning" : tag}
                          </span>
                        ))}
                      </span>
                    )}
                    <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                      {project.stack
                        .slice(0, 4)
                        .map((technology, badgeIndex) => (
                          <span
                            key={technology}
                            className={
                              badgeIndex > 1 ? "hidden sm:inline-flex" : ""
                            }
                          >
                            <ClassicToolBadge tool={technology} compact />
                          </span>
                        ))}
                      {project.stack.length > 2 && (
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500 sm:hidden">
                          +{project.stack.length - 2}
                        </span>
                      )}
                      {project.stack.length > 4 && (
                        <span className="hidden rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500 sm:inline-flex">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800 sm:mt-5 sm:gap-2 sm:text-sm">
                      View project <ArrowIcon />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="certifications"
        className="scroll-mt-24 border-y border-slate-200 bg-white/70"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="Certifications"
            title="Learning that keeps moving."
            description="Certifications and trainings that support my work."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((certification) => (
              <article
                key={certification.id}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-700">
                    {certification.issuer}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">
                    {certification.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Issued {certification.issued}
                    {certification.expires &&
                      ` · Expires ${certification.expires}`}
                  </p>
                  <dl className="mt-2 grid gap-y-1 text-sm text-slate-600">
                    <div>
                      <dt className="inline font-medium text-slate-800">
                        When:{" "}
                      </dt>
                      <dd className="inline">
                        {certification.activityDate ?? certification.issued}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-slate-800">
                        Where:{" "}
                      </dt>
                      <dd className="inline">
                        {certification.location ?? "Not specified"}
                      </dd>
                    </div>
                  </dl>
                </div>
                {(certification.url || certification.relatedProjectId) && (
                  <div className="mt-4 flex flex-col items-start gap-2 border-t border-slate-100 pt-4">
                    {certification.url && (
                      <a
                        href={certification.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-800"
                      >
                        Credential <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {certification.relatedProjectId && (
                      <button
                        type="button"
                        onClick={() => {
                          const relatedProjectId =
                            certification.relatedProjectId;
                          if (relatedProjectId) {
                            openRelatedProject(relatedProjectId);
                          }
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-cyan-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
                      >
                        View Capstone Project <ArrowIcon />
                      </button>
                    )}
                  </div>
                )}
                {certification.photos && (
                  <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                    {certification.photos.map((photo, index) => (
                      <PhotoTile
                        key={photo.src}
                        photo={photo}
                        onClick={() =>
                          setLightbox({
                            photos: certification.photos ?? [],
                            index,
                          })
                        }
                        className="aspect-[4/3]"
                      />
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="scroll-mt-24 border-y border-slate-200 bg-white/70"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="Toolkit"
            title="What I work with."
            description="A practical mix of tools and methods, organized by where I use them."
          />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {skills
                .filter((group) => group.id !== "lang")
                .map((group, index) => (
                  <section
                    key={group.id}
                    className={`grid gap-3 px-5 py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6 sm:px-7 ${
                      index > 0 ? "border-t border-slate-200" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-5 text-slate-950 sm:whitespace-nowrap">
                        {group.label}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <ClassicToolBadge key={skill} tool={skill} />
                      ))}
                    </div>
                  </section>
                ))}
            </div>

            {languageGroup && (
              <aside className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-[#eef6f8] p-6 sm:p-7">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[24px] border-white/50"
                />
                <div className="relative">
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    Languages
                  </h3>
                  <div className="mt-6 space-y-4">
                    {languageGroup.items.map((language) => {
                      const [name, proficiency] = language.split(" (");
                      return (
                        <div
                          key={language}
                          className="flex items-center justify-between gap-3 border-b border-cyan-900/10 pb-3 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {name}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">
                              {proficiency?.replace(")", "")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {languageCertificates.length > 0 && (
                    <div className="mt-6 border-t border-cyan-900/10 pt-5">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Proficiency certificates
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {languageCertificates.map((photo, index) => (
                          <PhotoTile
                            key={photo.src}
                            photo={photo}
                            onClick={() =>
                              setLightbox({
                                photos: languageCertificates,
                                index,
                              })
                            }
                            className="aspect-[3/2]"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="relative flex min-h-svh scroll-mt-0 flex-col overflow-hidden border-t border-cyan-100 bg-[#eef6f8] text-slate-900"
      >
        <div className="absolute -right-32 top-12 h-96 w-96 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="absolute -bottom-48 -left-24 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col px-5 sm:px-8">
          <div className="my-auto py-20 text-center">
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800">
                Open to good conversations
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Have something in mind?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                I&apos;d love to hear what you&apos;re working on.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center gap-6">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <a
                  href={emailComposeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-semibold tracking-tight text-slate-950 transition hover:text-cyan-800 sm:text-2xl"
                >
                  {contact.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={
                    copyStatus === "copied"
                      ? "Email address copied"
                      : "Copy email address"
                  }
                  title={
                    copyStatus === "copied"
                      ? "Email copied"
                      : copyStatus === "error"
                        ? "Could not copy email"
                        : "Copy email"
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-white hover:text-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700"
                >
                  {copyStatus === "copied" ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-none stroke-current stroke-2"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  ) : (
                    <ClipboardIcon />
                  )}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copyStatus === "copied"
                    ? "Email address copied."
                    : copyStatus === "error"
                      ? "Could not copy email address."
                      : ""}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {contact.socials.map((social) => {
                  const icon: SimpleIcon | undefined =
                    social.label === "GitHub" ? siGithub : undefined;
                  return (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-slate-600 transition hover:border-cyan-600 hover:text-cyan-800"
                    >
                      {icon ? (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-current"
                        >
                          <path d={icon.path} />
                        </svg>
                      ) : social.label === "LinkedIn" ? (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-current"
                        >
                          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                        </svg>
                      ) : (
                        <span className="text-xs font-semibold">
                          {social.label.slice(0, 1)}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={openGamePage}
                  aria-haspopup="dialog"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-800"
                >
                  <GamepadIcon />
                  Play as a Game
                </button>
                <a
                  href={contact.cvUrl}
                  download
                  className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-300/70 py-5 text-xs text-slate-500">
            <span>© {profile.name}</span>
            <span>Made with promptmaxxing.</span>
          </div>
        </div>
      </footer>

      {gameWarningOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-5 backdrop-blur-sm"
          onClick={() => setGameWarningOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-warning-title"
            className="w-full max-w-md rounded-2xl border border-white/70 bg-white p-7 shadow-2xl shadow-slate-950/20"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">
                  A desktop-only experience
                </p>
                <h2
                  id="game-warning-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-slate-950"
                >
                  Sorry, this page needs a bigger screen :(
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close warning"
                onClick={() => setGameWarningOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The game page is designed for screens at least 1024px wide with a
              mouse. You can keep exploring this portfolio page
              on this device.
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => setGameWarningOpen(false)}
              className="w-full mt-6 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800"
            >
              Continue Exploring
            </button>
          </section>
        </div>
      )}

      <ClassicDetailModal
        target={modalTarget}
        onClose={() => setModalTarget(null)}
      />
      {lightbox && (
        <PhotoLightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={navigateLightbox}
        />
      )}
    </main>
  );
}