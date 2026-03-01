"use client";

import { useEffect } from "react";
import { StepWizard } from "@/components/StepWizard";
import { useFireStore } from "@/store/useFireStore";

export default function OnboardingPage() {
  const setOnboardingStep = useFireStore((s) => s.setOnboardingStep);

  useEffect(() => {
    setOnboardingStep(0);
  }, [setOnboardingStep]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-start justify-center pt-8 sm:pt-12">
      <StepWizard />
    </div>
  );
}
