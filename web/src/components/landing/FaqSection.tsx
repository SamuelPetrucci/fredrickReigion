"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SiteConfig } from "@/config/site-config-schema";
import { TextGradient } from "./TextGradient";

export function FaqSection({ config }: { config: SiteConfig }) {
  const { faq } = config;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-zinc-100 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#0b111d] sm:text-4xl">
          {faq.titleBefore}
          <TextGradient as="span" className="font-extrabold">
            {faq.titleGradient}
          </TextGradient>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-600">
          {faq.subtitle}
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
          {faq.items.map((item, index) => {
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-trigger-${index}`;
            const isOpen = openIndex === index;

            return (
              <div
                key={`${item.question}-${index}`}
                className="border-b border-zinc-100 transition-colors duration-200 last:border-b-0"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-zinc-800 transition-colors duration-200 hover:bg-zinc-50"
                    onClick={() =>
                      setOpenIndex((i) => (i === index ? null : index))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenIndex((i) => (i === index ? null : index));
                      }
                    }}
                  >
                    {item.question}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <div
                      className={`px-5 pb-4 text-sm leading-relaxed text-zinc-600 transition-opacity duration-200 ${
                        isOpen
                          ? "opacity-100"
                          : "opacity-0 motion-reduce:opacity-100"
                      }`}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
