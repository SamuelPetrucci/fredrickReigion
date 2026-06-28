export type ApplicationPayload = {
  name: string;
  phone: string;
  email: string;
  licenseWilling: string;
  hoursPerWeek: string;
  incomeRange: string;
  whyLooking: string;
  coachability: string;
  commissionOnly: string;
  felonyConviction: string;
  relocateFortLauderdale: string;
  relocateTimeline: string;
  location: string;
  website?: string;
};

export const LICENSE_OPTIONS = ["Yes", "No"] as const;
export const HOURS_OPTIONS = ["Under 10", "15–20", "25–30", "40+"] as const;
export const INCOME_OPTIONS = [
  "$2k–$4k/month",
  "$4k–$7k/month",
  "$7k–$10k/month",
  "$10k+/month",
] as const;
export const COMMISSION_OPTIONS = ["Yes", "No", "Maybe"] as const;
export const FELONY_OPTIONS = ["Yes", "No"] as const;
export const RELOCATE_OPTIONS = ["Yes", "No", "I live here"] as const;
export const RELOCATE_TIMELINE_OPTIONS = [
  "1-3 Months",
  "4-6 Months",
  "6 Months+",
  "N/A",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplicationPayload(
  data: Partial<ApplicationPayload>
): { ok: true; data: ApplicationPayload } | { ok: false; error: string } {
  if (data.website?.trim()) {
    return { ok: false, error: "Invalid submission." };
  }

  const name = data.name?.trim() ?? "";
  const phone = data.phone?.trim() ?? "";
  const email = data.email?.trim() ?? "";

  if (!name) return { ok: false, error: "Name is required." };
  if (!phone) return { ok: false, error: "Phone number is required." };
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }

  if (!LICENSE_OPTIONS.includes(data.licenseWilling as (typeof LICENSE_OPTIONS)[number])) {
    return { ok: false, error: "Please select a licensing option." };
  }
  if (!HOURS_OPTIONS.includes(data.hoursPerWeek as (typeof HOURS_OPTIONS)[number])) {
    return { ok: false, error: "Please select your weekly availability." };
  }
  if (!INCOME_OPTIONS.includes(data.incomeRange as (typeof INCOME_OPTIONS)[number])) {
    return { ok: false, error: "Please select an income range." };
  }
  if (!data.whyLooking?.trim()) {
    return { ok: false, error: "Please tell us why you are looking for a new opportunity." };
  }

  const coachability = data.coachability?.trim() ?? "";
  const coachabilityNum = Number(coachability);
  if (!coachability || Number.isNaN(coachabilityNum) || coachabilityNum < 1 || coachabilityNum > 10) {
    return { ok: false, error: "Coachability must be a number from 1 to 10." };
  }

  if (!COMMISSION_OPTIONS.includes(data.commissionOnly as (typeof COMMISSION_OPTIONS)[number])) {
    return { ok: false, error: "Please select a commission-only option." };
  }
  if (!FELONY_OPTIONS.includes(data.felonyConviction as (typeof FELONY_OPTIONS)[number])) {
    return { ok: false, error: "Please answer the felony conviction question." };
  }
  if (!RELOCATE_OPTIONS.includes(data.relocateFortLauderdale as (typeof RELOCATE_OPTIONS)[number])) {
    return { ok: false, error: "Please select a relocation option." };
  }
  if (
    !RELOCATE_TIMELINE_OPTIONS.includes(
      data.relocateTimeline as (typeof RELOCATE_TIMELINE_OPTIONS)[number]
    )
  ) {
    return { ok: false, error: "Please select when you could be in Fort Lauderdale." };
  }

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      licenseWilling: data.licenseWilling!,
      hoursPerWeek: data.hoursPerWeek!,
      incomeRange: data.incomeRange!,
      whyLooking: data.whyLooking.trim(),
      coachability,
      commissionOnly: data.commissionOnly!,
      felonyConviction: data.felonyConviction!,
      relocateFortLauderdale: data.relocateFortLauderdale!,
      relocateTimeline: data.relocateTimeline!,
      location: data.location?.trim() ?? "",
    },
  };
}

export function formatApplicationEmail(data: ApplicationPayload): string {
  return [
    "New Fedrick Region application",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    "",
    `Willing to obtain license: ${data.licenseWilling}`,
    `Hours per week: ${data.hoursPerWeek}`,
    `Income goal (6–12 mo): ${data.incomeRange}`,
    `Why new opportunity: ${data.whyLooking}`,
    `Coachability (1–10): ${data.coachability}`,
    `Open to commission-only: ${data.commissionOnly}`,
    `Felony conviction: ${data.felonyConviction}`,
    `Open to relocating to Fort Lauderdale: ${data.relocateFortLauderdale}`,
    `How soon could you be here: ${data.relocateTimeline}`,
    `Current location: ${data.location || "Not provided"}`,
  ].join("\n");
}
