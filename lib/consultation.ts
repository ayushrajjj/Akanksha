export type PlanDuration = "1 Month" | "3 Months" | "6 Months";

export interface StepOneData {
  name: string;
  whatsappNumber: string;
  email: string;
  age: string;
  primaryGoal: string;
  planDuration: PlanDuration;
  preferredContactMethod: string;
  shortMessage?: string;
}

export interface StepTwoData {
  email: string;
  name: string;
  age: string;
  currentWeight: string;
  currentHeight: string;
  reasonsForDiet: string;
  nutritionGoals: string;
  dietPlanDuration: PlanDuration;
  eatingDisorder: "Yes" | "No" | "Prefer not to say";
  eatingDisorderDetails?: string;
  medicalCondition: string;
  allergies: string;
  medicines: string;
  foodPreferences: string;
  dietTrend: string;
  dietTrendEffectiveness: string;
  caffeinatedBeverages: string;
  vegetarianPreference: "Yes" | "No" | "Eggs only";
  smokeHabit: "Yes" | "No" | "Weekends only" | "Rarely";
  drinkAlcohol: "Yes" | "No" | "Rarely" | "Other";
  drinkAlcoholOther?: string;
  sportsAndFrequency: string;
  gymAndExercise: string;
  declaration: boolean;
}

export interface StepOneSubmissionPayload extends StepOneData {
  submissionType: "basic_details";
}

export interface StepTwoSubmissionPayload extends StepTwoData {
  submissionType: "detailed_assessment";
  stepOne: StepOneData | null;
}

export const CONSULTATION_GOALS = [
  "Weight loss",
  "Weight gain",
  "Muscle gain",
  "PCOS / hormonal health support",
  "Diabetes-friendly diet support",
  "General fitness",
  "Lifestyle improvement",
  "Other",
] as const;

export const PLAN_DURATIONS: PlanDuration[] = ["1 Month", "3 Months", "6 Months"];

export const CONTACT_METHODS = ["WhatsApp", "Email", "Call"] as const;

export const FOOD_DIET_OPTIONS = ["Vegetarian", "Non-vegetarian", "Mixed", "Other"] as const;

export function buildWhatsAppUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildStepOneWhatsAppMessage(data: StepOneData) {
  return [
    "Hi Akanksha, I am interested in a diet consultation.",
    `Name: ${data.name}`,
    `WhatsApp: ${data.whatsappNumber}`,
    `Email: ${data.email}`,
    `Age: ${data.age}`,
    `Goal: ${data.primaryGoal}`,
    `Plan Duration: ${data.planDuration}`,
    `Preferred Contact Method: ${data.preferredContactMethod}`,
    data.shortMessage ? `Notes: ${data.shortMessage}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildGeneralWhatsAppMessage() {
  return "Hi Akanksha, I would like to start my diet consultation.";
}

export function buildStepTwoWhatsAppMessage(stepOne: StepOneData | null) {
  const lead = stepOne
    ? [
        "Hi Akanksha, I have completed the consultation form.",
        `Name: ${stepOne.name}`,
        `WhatsApp: ${stepOne.whatsappNumber}`,
        `Email: ${stepOne.email}`,
        `Age: ${stepOne.age}`,
        `Plan Duration: ${stepOne.planDuration}`,
      ].join("\n")
    : "Hi Akanksha, I have completed the consultation form.";

  return lead;
}

export function isEndpointConfigured(endpoint: string | undefined | null) {
  return Boolean(endpoint && endpoint.trim().length > 0);
}

export async function submitToFormspree(
  endpoint: string | undefined | null,
  fields: Record<string, string | number | boolean | null | undefined>,
) {
  if (!isEndpointConfigured(endpoint)) {
    return { skipped: true as const };
  }

  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    formData.append(key, typeof value === "boolean" ? String(value) : String(value));
  });

  const response = await fetch(endpoint as string, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    let message = "Form submission failed.";
    try {
      const body = await response.json();
      if (body?.errors?.[0]?.message) {
        message = body.errors[0].message;
      }
    } catch {
      // Keep the generic error message when the response is not JSON.
    }
    throw new Error(message);
  }

  return { skipped: false as const };
}
