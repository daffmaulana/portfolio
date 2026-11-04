"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import {
  aiesec,
  contact,
  experiences,
  profile,
  projects,
} from "@/content/data";
import { siGithub } from "simple-icons";
import ClassicToolBadge from "@/components/ClassicToolBadge";
import type { Link, PhotoData } from "@/content/types";

type Props = {
  target: string | null;
  onClose: () => void;
};

function PhotoGallery({
  photos,
  onSelect,
}: {
  photos: PhotoData[];
  onSelect: (index: number) => void;
}) {
  if (photos.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo, index) => (
        <button
          key={photo.src}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`View ${photo.caption ?? photo.alt}`}
          className="group text-left"
        >
          <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          </span>
          {photo.caption && (
            <span className="mt-2 block text-xs text-slate-500">
              {photo.caption}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function DetailLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-cyan-600 hover:text-cyan-800"
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

type ProjectAction = Link & {
  icon: "github" | "app" | "document" | "external";
};

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

function ProjectActionLink({ action }: { action: ProjectAction }) {
  return (
    <a
      href={action.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-cyan-600 hover:text-cyan-800"
    >
      {action.icon === "github" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current"
        >
          <path d={siGithub.path} />
        </svg>
      ) : action.icon === "app" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-none stroke-current stroke-2"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      ) : action.icon === "external" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-none stroke-current stroke-2"
        >
          <path d="M14 4h6v6m-11 4L20 4M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-none stroke-current stroke-2"
        >
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v5h5M9 13h6m-6 4h6" />
        </svg>
      )}
      {action.label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function ClassicDetailModal({ target, onClose }: Props) {
  const [selectedGallery, setSelectedGallery] = useState<{
    photos: PhotoData[];
    index: number;
  } | null>(null);
  const [kind, value] = target?.split(":") ?? [];
  const project =
    kind === "project" && value !== undefined
      ? projects[Number(value)]
      : undefined;
  const experience =
    kind === "experience"
      ? experiences.find((item) => item.id === value)
      : undefined;
  const demoVideoEmbedUrl = project?.demoVideoUrl
    ? getYouTubeEmbedUrl(project.demoVideoUrl)
    : null;
  const githubVideoUrl = project?.demoVideoUrl
    ? getGitHubVideoUrl(project.demoVideoUrl)
    : null;

  useEffect(() => {
    if (!target) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedGallery) setSelectedGallery(null);
        else onClose();
      }
      if (event.key === "ArrowLeft") {
        setSelectedGallery((current) =>
          current
            ? {
                ...current,
                index:
                  (current.index - 1 + current.photos.length) %
                  current.photos.length,
              }
            : current,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedGallery((current) =>
          current
            ? {
                ...current,
                index: (current.index + 1) % current.photos.length,
              }
            : current,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, selectedGallery, target]);

  if (!target || typeof document === "undefined") return null;

  let title = "A little more about me";
  let eyebrow = "Profile";
  let content = (
    <div className="space-y-5">
      <p className="leading-7 text-slate-600">{profile.bio}</p>
      <p className="text-sm text-slate-500">
        Outside work: {profile.interests.join(" · ")}
      </p>
    </div>
  );
  let photos: PhotoData[] = [];
  let proofOfWorkPhotos: PhotoData[] = [];
  let photosHeading = "Photos & work samples";
  let projectTagline: string | null = null;

  if (project) {
    title = project.title;
    eyebrow = project.category ?? "Selected project";
    projectTagline = project.tagline;
    content = (
      <div className="space-y-7">
        <div className="grid gap-6 md:grid-cols-2">
          <section>
            <h3 className="text-sm font-semibold text-slate-950">Overview</h3>
            <p className="mt-2 leading-7 text-slate-600">{project.problem}</p>
          </section>
          <section>
            <h3 className="text-sm font-semibold text-slate-950">
              Outcome & stack
            </h3>
            <p className="mt-2 leading-7 text-slate-600">{project.result}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <ClassicToolBadge key={item} tool={item} />
              ))}
            </div>
          </section>
        </div>
        {project.demoVideoUrl && (
          <section>
            <h3 className="text-sm font-semibold text-slate-950">
              Demo video
            </h3>
            {demoVideoEmbedUrl ? (
              <div className="mt-2 aspect-video overflow-hidden rounded-xl bg-slate-100">
                <iframe
                  src={demoVideoEmbedUrl}
                  title={`${project.title} demo video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            ) : githubVideoUrl ? (
              <div className="mt-2 aspect-video overflow-hidden rounded-xl bg-slate-950">
                <video
                  src={githubVideoUrl}
                  title={`${project.title} demo video`}
                  controls
                  preload="metadata"
                  playsInline
                  className="h-full w-full"
                />
              </div>
            ) : (
              <p className="mt-2 text-sm text-amber-800">
                The demo URL is not a supported YouTube or GitHub video link.
              </p>
            )}
          </section>
        )}
      </div>
    );
    photos = project.photos ?? [];
  } else if (experience) {
    title = experience.role;
    eyebrow = experience.org;
    content = (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {experience.companyLogo && (
            <Image
              src={experience.companyLogo.src}
              alt={experience.companyLogo.alt}
              width={220}
              height={64}
              className="h-10 w-auto shrink-0 object-contain object-left"
            />
          )}
          <p className="text-sm font-medium text-slate-700">{experience.org}</p>
        </div>
        {experience.industry && (
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Industry:</span>{" "}
            {experience.industry}
          </p>
        )}
        <p className="text-sm font-medium text-slate-500">
          {experience.start} — {experience.end}
        </p>
        <ul className="space-y-2">
          {experience.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-3 leading-6 text-slate-600"
            >
              <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600" />
              {highlight}
            </li>
          ))}
        </ul>
        {experience.tools && experience.tools.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-slate-950">Tools used</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {experience.tools.map((tool) => (
                <ClassicToolBadge key={tool} tool={tool} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
    photos = experience.photos ?? [];
    proofOfWorkPhotos = experience.proofOfWork ?? [];
    photosHeading = "Additional photos";
  } else if (kind === "aiesec-role" && value !== undefined) {
    const role = aiesec.roles.find((item) => item.id === value);
    if (role) {
      title = role.title;
      eyebrow = `${
        aiesec.scopes.find((scope) => scope.id === role.scope)?.label ??
        "Organization experience"
      }`;
      content = (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500">
            {role.start} — {role.end}
          </p>
          <p className="text-base leading-6 text-slate-700">{role.summary}</p>
          <ul className="space-y-2">
            {role.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 leading-6 text-slate-600"
              >
                <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      );
      photos = role.photos ?? [];
    }
  } else if (kind === "contact") {
    title = "Let’s connect";
    eyebrow = "Contact";
    content = (
      <div className="space-y-5">
        <p className="leading-7 text-slate-600">
          Have a project, opportunity, or just want to say hello? I’d love to
          hear from you.
        </p>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
        >
          Email {contact.email}
        </a>
        <div className="flex flex-wrap gap-2">
          {contact.socials.map((social) => (
            <DetailLink key={social.url} href={social.url}>
              {social.label}
            </DetailLink>
          ))}
        </div>
      </div>
    );
  }

  const projectActions: ProjectAction[] = project
    ? [
        ...project.links.map((link) => ({
          ...link,
          icon: link.url.includes("github.com")
            ? ("github" as const)
            : ("external" as const),
        })),
        ...(project.appUrl
          ? [{ label: "Open app", url: project.appUrl, icon: "app" as const }]
          : []),
        ...(project.thesisUrl
          ? [
              {
                label: "Thesis repository",
                url: project.thesisUrl,
                icon: "document" as const,
              },
            ]
          : []),
      ]
    : [];

  const modalPhotos = [...proofOfWorkPhotos, ...photos];

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm sm:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="classic-detail-title"
        className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl shadow-slate-950/20"
      >
        <header className="relative border-b border-slate-200 px-6 py-5 sm:px-8">
          <div className="grid gap-5 pr-10 md:grid-cols-[minmax(0,1fr)_minmax(220px,auto)] md:items-start">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">
                {eyebrow}
              </p>
              <h2
                id="classic-detail-title"
                className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
              >
                {title}
              </h2>
              {projectTagline && (
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {projectTagline}
                </p>
              )}
            </div>
            {projectActions.length > 0 && (
              <div className="flex flex-wrap gap-2 md:justify-end">
                {projectActions.map((action) => (
                  <ProjectActionLink key={action.url} action={action} />
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 sm:right-6 sm:top-5"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-current stroke-2"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </header>
        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
          {content}
          {proofOfWorkPhotos.length > 0 && (
            <section className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="mb-4 text-sm font-semibold text-slate-950">
                Work proof
              </h3>
              <p className="mb-3 text-xs leading-relaxed text-slate-500">
                Recreated from memory for portfolio purposes. All data shown
                here is synthetic and does not represent actual customer or
                company records.
              </p>
              <PhotoGallery
                photos={proofOfWorkPhotos}
                onSelect={(index) =>
                  setSelectedGallery({ photos: modalPhotos, index })
                }
              />
            </section>
          )}
          {photos.length > 0 && (
            <section className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="mb-4 text-sm font-semibold text-slate-950">
                {photosHeading}
              </h3>
              <PhotoGallery
                photos={photos}
                onSelect={(index) =>
                  setSelectedGallery({
                    photos: modalPhotos,
                    index: proofOfWorkPhotos.length + index,
                  })
                }
              />
            </section>
          )}
        </div>
      </section>
      {selectedGallery && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            selectedGallery.photos[selectedGallery.index]?.caption ??
            selectedGallery.photos[selectedGallery.index]?.alt ??
            "Image preview"
          }
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-5"
          onMouseDown={() => setSelectedGallery(null)}
        >
          <button
            type="button"
            aria-label="Close photo"
            onClick={() => setSelectedGallery(null)}
            className="absolute right-5 top-5 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
          >
            Close
          </button>
          {selectedGallery.photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onMouseDown={(event) => event.stopPropagation()}
                onClick={() =>
                  setSelectedGallery((current) =>
                    current
                      ? {
                          ...current,
                          index:
                            (current.index - 1 + current.photos.length) %
                            current.photos.length,
                        }
                      : current,
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                aria-label="Next image"
                onMouseDown={(event) => event.stopPropagation()}
                onClick={() =>
                  setSelectedGallery((current) =>
                    current
                      ? {
                          ...current,
                          index: (current.index + 1) % current.photos.length,
                        }
                      : current,
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
              >
                <span aria-hidden="true">→</span>
              </button>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/70">
                {selectedGallery.index + 1} / {selectedGallery.photos.length}
              </span>
            </>
          )}
          <figure
            className="flex max-h-full max-w-6xl flex-col items-center"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="relative h-[75vh] w-[90vw]">
              {selectedGallery.photos[selectedGallery.index] && (
                <Image
                  src={
                    selectedGallery.photos[selectedGallery.index].full ??
                    selectedGallery.photos[selectedGallery.index].src
                  }
                  alt={selectedGallery.photos[selectedGallery.index].alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              )}
            </div>
            {selectedGallery.photos[selectedGallery.index]?.caption && (
              <figcaption className="mt-3 text-center text-sm text-white/75">
                {selectedGallery.photos[selectedGallery.index].caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </div>,
    document.body,
  );
}
