"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, LoaderCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";
type FormValues = { name: string; projectType: string; email: string; message: string };
const projectTypes = ["A Website", "A Web Application", "A CRM / ERP System", "AI / Automation", "Other System"];

export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState<FormValues>({
    name: "",
    projectType: "",
    email: "",
    message: "",
  });

  const update = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const canContinue =
    step === 0
      ? Boolean(values.name.trim())
      : step === 1
      ? Boolean(values.projectType)
      : step === 2
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
      : Boolean(values.message.trim());

  const next = () => {
    if (canContinue) {
      setErrorMessage("");
      setStep((current) => Math.min(current + 1, 3));
    }
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue) return;
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          projectType: values.projectType,
          email: values.email,
          message: values.message,
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Message delivery is unavailable right now. Please use email or WhatsApp directly."
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#0b0c0e] rounded-xl p-8 space-y-4 shadow-md"
      >
        <div className="w-10 h-10 rounded-full bg-[#0b0c0e] text-[#c8ff3d] flex items-center justify-center">
          <Check size={20} className="stroke-[3]" />
        </div>
        <span className="text-xs font-mono text-[#0b0c0e] uppercase tracking-widest block font-bold">
          PROJECT BRIEF RECEIVED
        </span>
        <h3 className="text-2xl font-bold text-[#0b0c0e] uppercase tracking-tight">
          Brief Submitted Successfully.
        </h3>
        <p className="text-[#2c2f29] text-xs sm:text-sm font-mono leading-relaxed font-semibold">
          Thank you, {values.name}. I have logged your project inquiry and will reply shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setStep(0);
            setErrorMessage("");
            setValues({ name: "", projectType: "", email: "", message: "" });
          }}
          className="px-4 py-2 bg-[#0b0c0e] text-white hover:bg-[#657d13] text-xs font-mono font-bold transition-colors uppercase tracking-wider rounded"
        >
          Submit Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      id="project-brief-form"
      onSubmit={submit}
      className="bg-white border-2 border-[#111315] rounded-xl p-6 sm:p-8 space-y-6 relative shadow-lg"
    >
      {/* Form Step Header Indicator */}
      <div className="flex items-center justify-between text-xs font-mono border-b-2 border-[#111315] pb-4">
        <span className="text-[#111315] uppercase tracking-widest font-bold text-sm">
          PROJECT BRIEF
        </span>
        <span className="text-[#111315] font-bold text-sm bg-[#e6e6df] px-3 py-1 rounded">
          0{step + 1} / 04
        </span>
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {step === 0 && (
            <div className="space-y-3">
              <label htmlFor="brief-name" className="text-xs font-mono text-[#0b0c0e] uppercase tracking-wider block font-bold">
                01 / YOUR NAME
              </label>
              <input
                id="brief-name"
                type="text"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Enter your name..."
                autoFocus
                className="w-full bg-[#f9f9f7] border-2 border-[#333630] rounded p-4 text-[#0b0c0e] text-sm font-mono font-bold placeholder:text-[#666a63] focus:outline-none focus:border-[#657d13] focus:bg-white transition-colors"
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <label className="text-xs font-mono text-[#0b0c0e] uppercase tracking-wider block font-bold">
                02 / WHAT ARE YOU BUILDING?
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => update("projectType", type)}
                    className={`p-3.5 text-left text-xs font-mono font-bold rounded border-2 transition-all flex items-center justify-between ${
                      values.projectType === type
                        ? "bg-[#0b0c0e] text-white border-[#0b0c0e] shadow"
                        : "bg-[#f9f9f7] text-[#0b0c0e] border-[#333630] hover:border-[#0b0c0e] hover:bg-white"
                    }`}
                  >
                    <span>{type}</span>
                    {values.projectType === type && <Check size={16} className="stroke-[3] text-[#c8ff3d]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <label htmlFor="brief-email" className="text-xs font-mono text-[#0b0c0e] uppercase tracking-wider block font-bold">
                03 / HOW CAN I REACH YOU?
              </label>
              <input
                id="brief-email"
                type="email"
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="your.email@company.com"
                autoFocus
                className="w-full bg-[#f9f9f7] border-2 border-[#333630] rounded p-4 text-[#0b0c0e] text-sm font-mono font-bold placeholder:text-[#666a63] focus:outline-none focus:border-[#657d13] focus:bg-white transition-colors"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <label htmlFor="brief-message" className="text-xs font-mono text-[#0b0c0e] uppercase tracking-wider block font-bold">
                04 / TELL ME ABOUT THE PROJECT
              </label>
              <textarea
                id="brief-message"
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                rows={4}
                placeholder="Share scope, goals, or timeline..."
                autoFocus
                className="w-full bg-[#f9f9f7] border-2 border-[#333630] rounded p-4 text-[#0b0c0e] text-sm font-mono font-bold placeholder:text-[#666a63] focus:outline-none focus:border-[#657d13] focus:bg-white transition-colors resize-none"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {errorMessage && (
        <p className="text-xs font-mono text-red-700 bg-red-100 p-3 rounded border border-red-400 font-bold">
          {errorMessage}
        </p>
      )}

      {/* Form Navigation */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-[#111315]">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="text-xs font-mono text-[#0b0c0e] font-bold hover:underline uppercase tracking-wider transition-colors"
          >
            &larr; Back
          </button>
        ) : (
          <span />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canContinue}
            className="px-6 py-3 bg-[#0b0c0e] text-white hover:bg-[#657d13] font-mono text-xs font-bold rounded disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 uppercase tracking-wider shadow"
          >
            <span>Next</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canContinue || status === "sending"}
            className="px-6 py-3 bg-[#0b0c0e] text-white hover:bg-[#657d13] font-mono text-xs font-bold rounded disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 uppercase tracking-wider shadow"
          >
            {status === "sending" ? (
              <>
                <LoaderCircle size={14} className="animate-spin" />
                <span>Sending Brief...</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Send Project Brief &rarr;</span>
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
