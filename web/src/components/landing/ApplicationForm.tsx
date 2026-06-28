"use client";

import { useState } from "react";
import type { ApplicationPayload } from "@/lib/application-form";
import {
  COMMISSION_OPTIONS,
  FELONY_OPTIONS,
  HOURS_OPTIONS,
  INCOME_OPTIONS,
  LICENSE_OPTIONS,
  RELOCATE_OPTIONS,
  RELOCATE_TIMELINE_OPTIONS,
  validateApplicationPayload,
} from "@/lib/application-form";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0f1623] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20";
const labelClass = "mb-2 block text-sm font-medium text-zinc-200";
const fieldClass = "text-left";

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className={labelClass}>
      {children}
      {required && <span className="text-amber-400"> *</span>}
    </label>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
  required = false,
  avoidFocusScroll = false,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  avoidFocusScroll?: boolean;
}) {
  const optionClass = (selected: boolean) =>
    `rounded-xl border px-4 py-2.5 text-sm transition-colors ${
      selected
        ? "border-amber-500/50 bg-amber-500/10 text-amber-100"
        : "border-white/10 bg-[#0f1623] text-zinc-300 hover:border-white/20"
    }`;

  if (avoidFocusScroll) {
    return (
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option)}
              className={`${optionClass(selected)} cursor-pointer`}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {options.map((option) => {
        const id = `${name}-${option.replace(/\s+/g, "-").toLowerCase()}`;
        const selected = value === option;
        return (
          <label
            key={option}
            htmlFor={id}
            className={`${optionClass(selected)} cursor-pointer`}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={option}
              checked={selected}
              required={required && !value}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}

const initialForm: ApplicationPayload = {
  name: "",
  phone: "",
  email: "",
  licenseWilling: "",
  hoursPerWeek: "",
  incomeRange: "",
  whyLooking: "",
  coachability: "",
  commissionOnly: "",
  felonyConviction: "",
  relocateFortLauderdale: "",
  relocateTimeline: "",
  location: "",
  website: "",
};

export function ApplicationForm({
  compact = false,
  onSuccess,
}: {
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const [form, setForm] = useState<ApplicationPayload>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const avoidFocusScroll = compact;

  const update = <K extends keyof ApplicationPayload>(
    key: K,
    value: ApplicationPayload[K]
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const validated = validateApplicationPayload(form);
    if (!validated.ok) {
      setStatus("error");
      setErrorMessage(validated.error);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated.data),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        className={`text-center ${compact ? "py-6" : "landing-card rounded-2xl p-8 sm:p-10"}`}
      >
        <p className="text-lg font-semibold text-white">Application submitted</p>
        <p className="mt-3 text-sm text-zinc-400">
          Thanks for applying. Leadership will review your submission and follow up
          soon.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            onSuccess?.();
          }}
          className="mt-6 rounded-xl bg-gradient-gold-button px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0b111d]"
        >
          {onSuccess ? "Done" : "Submit another application"}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "text-left" : "landing-card rounded-2xl p-6 text-left sm:p-8"}
      noValidate
    >
      <div className="grid gap-6">
        <div className={fieldClass}>
          <FieldLabel required>Name</FieldLabel>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="Your full name"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className={fieldClass}>
            <FieldLabel required>Phone</FieldLabel>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
              placeholder="(555) 555-5555"
            />
          </div>

          <div className={fieldClass}>
            <FieldLabel required>Email</FieldLabel>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
              placeholder="you@email.com"
            />
          </div>
        </div>

        <div className={fieldClass}>
          <FieldLabel required>
            Are you willing to obtain a health/life insurance license if required?
          </FieldLabel>
          <RadioGroup
            name="licenseWilling"
            options={LICENSE_OPTIONS}
            value={form.licenseWilling}
            onChange={(value) => update("licenseWilling", value)}
            required
            avoidFocusScroll={avoidFocusScroll}
          />
        </div>

        <div className={fieldClass}>
          <FieldLabel required>
            How many hours per week can you realistically commit?
          </FieldLabel>
          <RadioGroup
            name="hoursPerWeek"
            options={HOURS_OPTIONS}
            value={form.hoursPerWeek}
            onChange={(value) => update("hoursPerWeek", value)}
            required
            avoidFocusScroll={avoidFocusScroll}
          />
        </div>

        <div className={fieldClass}>
          <FieldLabel required>
            What income range are you aiming for in the next 6–12 months?
          </FieldLabel>
          <RadioGroup
            name="incomeRange"
            options={INCOME_OPTIONS}
            value={form.incomeRange}
            onChange={(value) => update("incomeRange", value)}
            required
            avoidFocusScroll={avoidFocusScroll}
          />
        </div>

        <div className={fieldClass}>
          <FieldLabel required>
            Why are you looking for a new opportunity right now?
          </FieldLabel>
          <textarea
            name="whyLooking"
            required
            rows={4}
            value={form.whyLooking}
            onChange={(e) => update("whyLooking", e.target.value)}
            className={`${inputClass} resize-y min-h-28`}
            placeholder="Tell us in your own words"
          />
        </div>

        <div className={fieldClass}>
          <FieldLabel required>On a scale of 1–10, how coachable are you?</FieldLabel>
          <input
            type="number"
            name="coachability"
            min={1}
            max={10}
            required
            value={form.coachability}
            onChange={(e) => update("coachability", e.target.value)}
            className={inputClass}
            placeholder="1–10"
          />
        </div>

        <div className={fieldClass}>
          <FieldLabel required>Are you open to commission-only sales?</FieldLabel>
          <RadioGroup
            name="commissionOnly"
            options={COMMISSION_OPTIONS}
            value={form.commissionOnly}
            onChange={(value) => update("commissionOnly", value)}
            required
            avoidFocusScroll={avoidFocusScroll}
          />
        </div>

        <div className={fieldClass}>
          <FieldLabel required>Have you ever been convicted of a felony?</FieldLabel>
          <RadioGroup
            name="felonyConviction"
            options={FELONY_OPTIONS}
            value={form.felonyConviction}
            onChange={(value) => update("felonyConviction", value)}
            required
            avoidFocusScroll={avoidFocusScroll}
          />
        </div>

        <div className={fieldClass}>
          <FieldLabel required>
            Are you open to relocating to Fort Lauderdale?
          </FieldLabel>
          <RadioGroup
            name="relocateFortLauderdale"
            options={RELOCATE_OPTIONS}
            value={form.relocateFortLauderdale}
            onChange={(value) => update("relocateFortLauderdale", value)}
            required
            avoidFocusScroll={avoidFocusScroll}
          />
        </div>

        <div className={fieldClass}>
          <FieldLabel required>If so, how soon could you be here?</FieldLabel>
          <RadioGroup
            name="relocateTimeline"
            options={RELOCATE_TIMELINE_OPTIONS}
            value={form.relocateTimeline}
            onChange={(value) => update("relocateTimeline", value)}
            required
            avoidFocusScroll={avoidFocusScroll}
          />
        </div>

        <div className={fieldClass}>
          <FieldLabel>Where are you located?</FieldLabel>
          <input
            type="text"
            name="location"
            autoComplete="address-level2"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className={inputClass}
            placeholder="City, state"
          />
        </div>

        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 w-full rounded-2xl bg-gradient-gold-button px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-[#0b111d] shadow-lg shadow-amber-900/30 ring-2 ring-[#b8860b]/50 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
