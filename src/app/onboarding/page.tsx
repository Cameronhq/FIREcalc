"use client";

import { StepWizard } from "@/components/StepWizard";

export default function OnboardingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-start justify-center pt-12">
      <StepWizard />
    </div>
  );
}
