"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  buildStepOneWhatsAppMessage,
  buildStepTwoWhatsAppMessage,
  buildWhatsAppUrl,
  CONTACT_METHODS,
  CONSULTATION_GOALS,
  isEndpointConfigured,
  PLAN_DURATIONS,
  submitToFormspree,
  type PlanDuration,
  type StepOneData,
  type StepTwoData,
} from "@/lib/consultation";
import { SectionHeading } from "./section-heading";

interface ConsultationFormProps {
  selectedDuration?: PlanDuration | null;
  whatsappNumber: string;
}

type Step = 1 | 2;

const stepOneDefaults: StepOneData = {
  name: "",
  whatsappNumber: "",
  email: "",
  age: "",
  primaryGoal: "",
  planDuration: "1 Month",
  preferredContactMethod: "WhatsApp",
  shortMessage: "",
};

const stepTwoDefaults: StepTwoData = {
  email: "",
  name: "",
  age: "",
  currentWeight: "",
  currentHeight: "",
  reasonsForDiet: "",
  nutritionGoals: "",
  dietPlanDuration: "1 Month",
  eatingDisorder: "No",
  eatingDisorderDetails: "",
  medicalCondition: "",
  allergies: "",
  medicines: "",
  foodPreferences: "",
  dietTrend: "",
  dietTrendEffectiveness: "",
  caffeinatedBeverages: "",
  vegetarianPreference: "Yes",
  smokeHabit: "No",
  drinkAlcohol: "No",
  drinkAlcoholOther: "",
  sportsAndFrequency: "",
  gymAndExercise: "",
  declaration: false,
};

function fieldError(message: string | undefined) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-700">{message}</p>;
}

export function ConsultationForm({ selectedDuration, whatsappNumber }: ConsultationFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
  const [stepOneSuccess, setStepOneSuccess] = useState("");
  const [stepTwoSuccess, setStepTwoSuccess] = useState("");
  const [stepOneError, setStepOneError] = useState("");
  const [stepTwoError, setStepTwoError] = useState("");
  const [stepOneSubmitting, setStepOneSubmitting] = useState(false);
  const [stepTwoSubmitting, setStepTwoSubmitting] = useState(false);

  const stepOneEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_STEP1_ENDPOINT;
  const stepTwoEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_STEP2_ENDPOINT;
  const stepOneConfigured = isEndpointConfigured(stepOneEndpoint);
  const stepTwoConfigured = isEndpointConfigured(stepTwoEndpoint);

  const stepOneForm = useForm<StepOneData>({
    defaultValues: stepOneDefaults,
    mode: "onTouched",
  });

  const stepTwoForm = useForm<StepTwoData>({
    defaultValues: stepTwoDefaults,
    mode: "onTouched",
  });

  const stepOnePlan = stepOneForm.watch("planDuration");
  const stepTwoDietPlan = stepTwoForm.watch("dietPlanDuration");
  const alcoholChoice = stepTwoForm.watch("drinkAlcohol");
  const eatingDisorderChoice = stepTwoForm.watch("eatingDisorder");

  useEffect(() => {
    if (selectedDuration) {
      stepOneForm.setValue("planDuration", selectedDuration, {
        shouldValidate: true,
        shouldDirty: true,
      });
      stepTwoForm.setValue("dietPlanDuration", selectedDuration, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedDuration, stepOneForm, stepTwoForm]);

  useEffect(() => {
    if (stepOneData) {
      stepTwoForm.reset({
        ...stepTwoDefaults,
        email: stepOneData.email,
        name: stepOneData.name,
        age: stepOneData.age,
        dietPlanDuration: stepOneData.planDuration,
      });
    }
  }, [stepOneData, stepTwoForm]);

  const stepOneDraft = stepOneForm.watch();
  const stepOneWhatsAppUrl = buildWhatsAppUrl(
    whatsappNumber,
    buildStepOneWhatsAppMessage(stepOneData ?? stepOneDraft),
  );

  async function onSubmitStepOne(values: StepOneData) {
    setStepOneSubmitting(true);
    setStepOneError("");
    setStepOneSuccess("");

    try {
      const payload = {
        ...values,
        submissionType: "basic_details" as const,
      };

      await submitToFormspree(stepOneEndpoint, payload);
      setStepOneData(values);
      setStepOneSuccess(
        "Your basic details have been saved. Please complete the detailed assessment so Akanksha can prepare a better plan.",
      );
      setStep(2);
    } catch (error) {
      setStepOneError(error instanceof Error ? error.message : "Failed to submit basic details.");
    } finally {
      setStepOneSubmitting(false);
    }
  }

  async function onSubmitStepTwo(values: StepTwoData) {
    setStepTwoSubmitting(true);
    setStepTwoError("");
    setStepTwoSuccess("");

    try {
      const mergedStepOne = stepOneData
        ? stepOneData
        : {
            name: values.name,
            whatsappNumber: stepOneForm.getValues("whatsappNumber"),
            email: values.email,
            age: values.age,
            primaryGoal: stepOneForm.getValues("primaryGoal"),
            planDuration: values.dietPlanDuration,
            preferredContactMethod: stepOneForm.getValues("preferredContactMethod"),
            shortMessage: stepOneForm.getValues("shortMessage"),
          };

      const payload = {
        ...values,
        submissionType: "detailed_assessment" as const,
        stepOne: mergedStepOne,
      };

      await submitToFormspree(stepTwoEndpoint, {
        ...payload,
        stepOne: JSON.stringify(payload.stepOne),
      });
      setStepTwoSuccess(
        "Thank you! Your detailed assessment has been submitted. Akanksha will review your details and contact you soon.",
      );
    } catch (error) {
      setStepTwoError(error instanceof Error ? error.message : "Failed to submit detailed assessment.");
    } finally {
      setStepTwoSubmitting(false);
    }
  }

  return (
    <section id="consultation" className="section-shell section-pad">
      <SectionHeading
        eyebrow="Consultation Form"
        title="Start Your Consultation"
        description="A two-step intake flow keeps the process simple. Share the basic details first, then complete the detailed assessment for a better personalized plan."
      />

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <div className="glass-card rounded-[1.8rem] p-5 shadow-soft sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className={`rounded-full px-4 py-2 text-sm font-semibold ${step === 1 ? "bg-forest-900 text-white" : "bg-white text-forest-700"}`}>
                Step 1: Basic Details
              </div>
              <div className={`rounded-full px-4 py-2 text-sm font-semibold ${step === 2 ? "bg-forest-900 text-white" : "bg-white text-forest-700"}`}>
                Step 2: Detailed Assessment
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-sage-100">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgba(95,139,103,1),rgba(155,183,121,1))] transition-all"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
          </div>

          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-[1.8rem] p-5 shadow-soft sm:p-6"
            >
              <p className="text-sm leading-6 text-forest-700/90">
                First, share your basic details so Akanksha can understand your requirement and
                contact you.
              </p>

              <form
                className="mt-6 space-y-5"
                onSubmit={stepOneForm.handleSubmit(onSubmitStepOne)}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" error={stepOneForm.formState.errors.name?.message}>
                    <input
                      type="text"
                      {...stepOneForm.register("name", { required: "Name is required." })}
                      className="input-field"
                    />
                  </Field>

                  <Field
                    label="WhatsApp number"
                    error={stepOneForm.formState.errors.whatsappNumber?.message}
                  >
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="+91..."
                      {...stepOneForm.register("whatsappNumber", {
                        required: "WhatsApp number is required.",
                        minLength: {
                          value: 8,
                          message: "Please enter a valid phone number.",
                        },
                      })}
                      className="input-field"
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email" error={stepOneForm.formState.errors.email?.message}>
                    <input
                      type="email"
                      {...stepOneForm.register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address.",
                        },
                      })}
                      className="input-field"
                    />
                  </Field>

                  <Field label="Age" error={stepOneForm.formState.errors.age?.message}>
                    <input
                      type="number"
                      min="1"
                      {...stepOneForm.register("age", {
                        required: "Age is required.",
                        min: { value: 1, message: "Age must be greater than 0." },
                      })}
                      className="input-field"
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Primary goal"
                    error={stepOneForm.formState.errors.primaryGoal?.message}
                  >
                    <select
                      {...stepOneForm.register("primaryGoal", {
                        required: "Primary goal is required.",
                      })}
                      className="input-field"
                    >
                      <option value="">Select a goal</option>
                      {CONSULTATION_GOALS.map((goal) => (
                        <option key={goal} value={goal}>
                          {goal}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="Diet plan duration"
                    error={stepOneForm.formState.errors.planDuration?.message}
                  >
                    <select
                      {...stepOneForm.register("planDuration", {
                        required: "Plan duration is required.",
                      })}
                      className="input-field"
                    >
                      {PLAN_DURATIONS.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Preferred contact method"
                    error={stepOneForm.formState.errors.preferredContactMethod?.message}
                  >
                    <select
                      {...stepOneForm.register("preferredContactMethod", {
                        required: "Preferred contact method is required.",
                      })}
                      className="input-field"
                    >
                      {CONTACT_METHODS.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Short message / notes">
                    <textarea
                      rows={4}
                      placeholder="Anything Akanksha should know before the detailed assessment?"
                      {...stepOneForm.register("shortMessage")}
                      className="input-field resize-none"
                    />
                  </Field>
                </div>

                {stepOneError ? (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {stepOneError}
                  </p>
                ) : null}
                {stepOneSuccess ? (
                  <p
                    className="rounded-2xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-forest-800"
                    aria-live="polite"
                  >
                    {stepOneSuccess}
                  </p>
                ) : null}
                {!stepOneConfigured ? (
                  <p className="text-sm text-forest-700/70">
                    Formspree step 1 is not configured yet. The form still works visually and the
                    next step remains available.
                  </p>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={stepOneSubmitting}
                    className="rounded-full bg-forest-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-60 focus-ring"
                  >
                    {stepOneSubmitting ? "Saving details..." : "Save basic details"}
                  </button>
                  <a
                    href={stepOneWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-sage-200 bg-white px-5 py-3 text-center text-sm font-semibold text-forest-800 focus-ring"
                  >
                    Send basic details on WhatsApp
                  </a>
                </div>

                <p className="text-xs leading-5 text-forest-700/70">
                  If Formspree is not configured yet, the form still works visually and the next
                  step remains available.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-[1.8rem] p-5 shadow-soft sm:p-6"
            >
              {stepOneSuccess ? (
                <div className="rounded-2xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-forest-800">
                  {stepOneSuccess}
                </div>
              ) : null}
              <p className="mt-4 text-sm leading-6 text-forest-700/90">
                Please fill out this form to provide the necessary information for your
                personalized diet plan. Your responses will help Akanksha understand your current
                health, dietary habits, lifestyle, and fitness goals.
              </p>

              <div className="mt-5 rounded-2xl border border-sage-100 bg-white/80 px-4 py-4 text-sm leading-6 text-forest-700/85">
                <p className="font-semibold text-forest-900">Privacy note</p>
                <p className="mt-2">
                  Your information will only be used to understand your diet consultation
                  requirement and prepare guidance. Please share accurate health details. This
                  consultation is for wellness guidance and does not replace medical diagnosis or
                  treatment.
                </p>
              </div>

              <form
                className="mt-6 space-y-6"
                onSubmit={stepTwoForm.handleSubmit(onSubmitStepTwo)}
              >
                <Fieldset title="Personal details">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Email ID" error={stepTwoForm.formState.errors.email?.message}>
                      <input
                        type="email"
                        {...stepTwoForm.register("email", {
                          required: "Email is required.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address.",
                          },
                        })}
                        className="input-field"
                      />
                    </Field>
                    <Field label="Name" error={stepTwoForm.formState.errors.name?.message}>
                      <input
                        type="text"
                        {...stepTwoForm.register("name", { required: "Name is required." })}
                        className="input-field"
                      />
                    </Field>
                    <Field label="Age" error={stepTwoForm.formState.errors.age?.message}>
                      <input
                        type="number"
                        min="1"
                        {...stepTwoForm.register("age", {
                          required: "Age is required.",
                          min: { value: 1, message: "Age must be greater than 0." },
                        })}
                        className="input-field"
                      />
                    </Field>
                    <Field
                      label="Current weight"
                      error={stepTwoForm.formState.errors.currentWeight?.message}
                    >
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        {...stepTwoForm.register("currentWeight", {
                          required: "Current weight is required.",
                        })}
                        className="input-field"
                      />
                    </Field>
                    <Field
                      label="Current height"
                      error={stepTwoForm.formState.errors.currentHeight?.message}
                    >
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        {...stepTwoForm.register("currentHeight", {
                          required: "Current height is required.",
                        })}
                        className="input-field"
                      />
                    </Field>
                  </div>
                </Fieldset>

                <Fieldset title="Goals">
                  <div className="grid gap-4">
                    <Field
                      label="Reasons why you want to go on diet"
                      error={stepTwoForm.formState.errors.reasonsForDiet?.message}
                    >
                      <textarea
                        rows={4}
                        {...stepTwoForm.register("reasonsForDiet", {
                          required: "Please share the reasons for your diet.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>
                    <Field
                      label="What are your nutrition goals?"
                      error={stepTwoForm.formState.errors.nutritionGoals?.message}
                    >
                      <textarea
                        rows={4}
                        {...stepTwoForm.register("nutritionGoals", {
                          required: "Nutrition goals are required.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>
                    <Field
                      label="Please select for how many months you want the diet plan"
                      error={stepTwoForm.formState.errors.dietPlanDuration?.message}
                    >
                      <select
                        {...stepTwoForm.register("dietPlanDuration", {
                          required: "Diet plan duration is required.",
                        })}
                        className="input-field"
                      >
                        {PLAN_DURATIONS.map((duration) => (
                          <option key={duration} value={duration}>
                            {duration}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </Fieldset>

                <Fieldset title="Health background">
                  <div className="grid gap-4">
                    <Field
                      label="Do you have any eating disorder?"
                      error={stepTwoForm.formState.errors.eatingDisorder?.message}
                    >
                      <select
                        {...stepTwoForm.register("eatingDisorder", {
                          required: "Please select an option.",
                        })}
                        className="input-field"
                      >
                        {["Yes", "No", "Prefer not to say"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    {eatingDisorderChoice === "Yes" ? (
                      <Field label="If yes, please share details">
                        <textarea
                          rows={4}
                          {...stepTwoForm.register("eatingDisorderDetails")}
                          className="input-field resize-none"
                        />
                      </Field>
                    ) : null}

                    <Field
                      label="Do you have any medical condition? If yes, please share"
                      error={stepTwoForm.formState.errors.medicalCondition?.message}
                    >
                      <textarea
                        rows={4}
                        {...stepTwoForm.register("medicalCondition", {
                          required: "Please share any medical condition or mention none.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>

                    <Field
                      label="Do you have any allergies? If yes, list them below"
                      error={stepTwoForm.formState.errors.allergies?.message}
                    >
                      <textarea
                        rows={4}
                        {...stepTwoForm.register("allergies", {
                          required: "Please share allergies or mention none.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>

                    <Field
                      label="Are you currently taking any medicine? If yes, list them below"
                      error={stepTwoForm.formState.errors.medicines?.message}
                    >
                      <textarea
                        rows={4}
                        {...stepTwoForm.register("medicines", {
                          required: "Please share medicines or mention none.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>
                  </div>
                </Fieldset>

                <Fieldset title="Food habits">
                  <div className="grid gap-4">
                    <Field
                      label="Do you have any preference in food diet? List them below"
                      error={stepTwoForm.formState.errors.foodPreferences?.message}
                    >
                      <textarea
                        rows={4}
                        {...stepTwoForm.register("foodPreferences", {
                          required: "Please share your food preferences.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>

                    <Field
                      label="Have you followed any diet trend?"
                      error={stepTwoForm.formState.errors.dietTrend?.message}
                    >
                      <textarea
                        rows={4}
                        {...stepTwoForm.register("dietTrend", {
                          required: "Please share any diet trend you have followed.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>

                    <Field
                      label="Was the diet trend effective? Please share the diet trend and effectiveness"
                      error={stepTwoForm.formState.errors.dietTrendEffectiveness?.message}
                    >
                      <textarea
                        rows={4}
                        {...stepTwoForm.register("dietTrendEffectiveness", {
                          required: "Please share whether the diet trend was effective.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>

                    <Field
                      label="What caffeinated beverages are you drinking?"
                      error={stepTwoForm.formState.errors.caffeinatedBeverages?.message}
                    >
                      <textarea
                        rows={3}
                        {...stepTwoForm.register("caffeinatedBeverages", {
                          required: "Please share caffeinated beverages.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>

                    <Field
                      label="Are you vegetarian?"
                      error={stepTwoForm.formState.errors.vegetarianPreference?.message}
                    >
                      <select
                        {...stepTwoForm.register("vegetarianPreference", {
                          required: "Please select a vegetarian preference.",
                        })}
                        className="input-field"
                      >
                        {["Yes", "No", "Eggs only"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </Fieldset>

                <Fieldset title="Lifestyle">
                  <div className="grid gap-4">
                    <Field label="Do you smoke?" error={stepTwoForm.formState.errors.smokeHabit?.message}>
                      <select
                        {...stepTwoForm.register("smokeHabit", {
                          required: "Please select a smoking habit.",
                        })}
                        className="input-field"
                      >
                        {["Yes", "No", "Weekends only", "Rarely"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      label="Do you drink alcohol?"
                      error={stepTwoForm.formState.errors.drinkAlcohol?.message}
                    >
                      <select
                        {...stepTwoForm.register("drinkAlcohol", {
                          required: "Please select an alcohol preference.",
                        })}
                        className="input-field"
                      >
                        {["Yes", "No", "Rarely", "Other"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    {alcoholChoice === "Other" ? (
                      <Field label="If other for alcohol, allow text input">
                        <textarea
                          rows={3}
                          {...stepTwoForm.register("drinkAlcoholOther")}
                          className="input-field resize-none"
                        />
                      </Field>
                    ) : null}

                    <Field
                      label="If you play sport, list them and indicate how often"
                      error={stepTwoForm.formState.errors.sportsAndFrequency?.message}
                    >
                      <textarea
                        rows={4}
                        {...stepTwoForm.register("sportsAndFrequency", {
                          required: "Please share your sports activity.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>

                    <Field
                      label="Do you go to gym? How often do you exercise?"
                      error={stepTwoForm.formState.errors.gymAndExercise?.message}
                    >
                      <textarea
                        rows={4}
                        {...stepTwoForm.register("gymAndExercise", {
                          required: "Please share your exercise routine.",
                        })}
                        className="input-field resize-none"
                      />
                    </Field>
                  </div>
                </Fieldset>

                <label className="flex items-start gap-3 rounded-2xl border border-sage-100 bg-white/70 p-4 text-sm leading-6 text-forest-700 shadow-sm">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-sage-300 text-sage-600 focus-ring"
                    {...stepTwoForm.register("declaration", {
                      required:
                        "You must certify that the information is accurate to submit the form.",
                    })}
                  />
                  <span>
                    I hereby certify that all information about my health condition and nutrition is
                    accurate and true to the best of my knowledge.
                  </span>
                </label>
                {fieldError(stepTwoForm.formState.errors.declaration?.message)}

                {stepTwoError ? (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {stepTwoError}
                  </p>
                ) : null}
                {stepTwoSuccess ? (
                  <p className="rounded-2xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-forest-800">
                    {stepTwoSuccess}
                  </p>
                ) : null}
                {!stepTwoConfigured ? (
                  <p className="text-sm text-forest-700/70">
                    Formspree step 2 is not configured yet. The form still works visually and the
                    WhatsApp fallback remains available.
                  </p>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={stepTwoSubmitting}
                    className="rounded-full bg-forest-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-60 focus-ring"
                  >
                    {stepTwoSubmitting ? "Submitting assessment..." : "Submit detailed assessment"}
                  </button>
                  <a
                    href={buildWhatsAppUrl(
                      whatsappNumber,
                      buildStepTwoWhatsAppMessage(stepOneData ?? stepOneDraft),
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-sage-200 bg-white px-5 py-3 text-center text-sm font-semibold text-forest-800 focus-ring"
                  >
                    Message Akanksha on WhatsApp
                  </a>
                </div>
              </form>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-[1.8rem] p-5 shadow-soft sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage-700">
              Consultation summary
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {[
                ["Current step", step === 1 ? "Basic details" : "Detailed assessment"],
                ["Selected plan", stepOnePlan || stepTwoDietPlan || "1 Month"],
                [
                  "WhatsApp fallback",
                  isEndpointConfigured(stepOneEndpoint) || isEndpointConfigured(stepTwoEndpoint)
                    ? "Formspree enabled"
                    : "Available if needed",
                ],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/75 px-4 py-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage-700">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-forest-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-forest-800">{label}</span>
      {children}
      {error ? <p className="mt-1.5 text-sm text-red-700">{error}</p> : null}
    </label>
  );
}

function Fieldset({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-[1.6rem] border border-sage-100 bg-white/65 p-4 shadow-sm sm:p-5">
      <legend className="px-2 text-sm font-semibold text-forest-900">{title}</legend>
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}
