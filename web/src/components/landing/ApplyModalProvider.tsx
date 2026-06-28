"use client";

import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { SiteConfig } from "@/config/site-config-schema";
import { ApplicationForm } from "./ApplicationForm";
import { TextGradient } from "./TextGradient";

type ApplyModalContextValue = {
  openApplyModal: () => void;
  closeApplyModal: () => void;
};

const ApplyModalContext = createContext<ApplyModalContextValue | null>(null);

export function useApplyModal() {
  const context = useContext(ApplyModalContext);
  if (!context) {
    throw new Error("useApplyModal must be used within ApplyModalProvider");
  }
  return context;
}

type ApplyModalProviderProps = {
  apply: SiteConfig["apply"];
  applySectionId: string;
  children: ReactNode;
};

function lockBodyScroll() {
  const scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  return scrollY;
}

function unlockBodyScroll(scrollY: number) {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  window.scrollTo(0, scrollY);
}

export function ApplyModalProvider({
  apply,
  applySectionId,
  children,
}: ApplyModalProviderProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [modalHeight, setModalHeight] = useState<number | null>(null);
  const scrollYRef = useRef(0);
  const titleId = useId();
  const descId = useId();

  const openApplyModal = useCallback(() => {
    scrollYRef.current = lockBodyScroll();
    setModalHeight(Math.floor(window.innerHeight * 0.92));
    setOpen(true);
  }, []);

  const closeApplyModal = useCallback(() => {
    setOpen(false);
    setModalHeight(null);
    unlockBodyScroll(scrollYRef.current);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeApplyModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeApplyModal]);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === `#${applySectionId}`) {
        openApplyModal();
        history.replaceState(null, "", window.location.pathname);
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [applySectionId, openApplyModal]);

  useEffect(() => {
    return () => {
      if (open) unlockBodyScroll(scrollYRef.current);
    };
  }, [open]);

  const modal =
    open && mounted ? (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
        role="presentation"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          aria-label="Close application form"
          onClick={closeApplyModal}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          style={modalHeight ? { height: modalHeight } : undefined}
          className="relative flex w-full max-w-2xl min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1623] shadow-2xl shadow-black/50"
        >
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
            <div className="min-w-0 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 sm:text-xs">
                {apply.eyebrow}
              </p>
              <h2
                id={titleId}
                className="mt-1 text-xl font-extrabold tracking-tight text-white sm:text-2xl"
              >
                <TextGradient as="span" className="font-extrabold">
                  {apply.title}
                </TextGradient>
              </h2>
              <p id={descId} className="mt-2 text-sm text-zinc-400">
                {apply.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={closeApplyModal}
              className="landing-nav-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 pb-10 [-webkit-overflow-scrolling:touch] sm:px-6 sm:py-6 sm:pb-8"
            style={{ touchAction: "pan-y" }}
          >
            <ApplicationForm compact onSuccess={closeApplyModal} />
          </div>
        </div>
      </div>
    ) : null;

  return (
    <ApplyModalContext.Provider value={{ openApplyModal, closeApplyModal }}>
      {children}
      {mounted && modal ? createPortal(modal, document.body) : null}
    </ApplyModalContext.Provider>
  );
}
