import { Check, Upload, Search, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnalysisStep } from "@/types/email";

interface StepperProps {
  currentStep: AnalysisStep;
}

const steps = [
  { id: "upload" as const, label: "Upload", icon: Upload },
  { id: "analyzing" as const, label: "Análise", icon: Search },
  { id: "result" as const, label: "Resultado", icon: CheckCircle },
];

const stepOrder: Record<AnalysisStep, number> = {
  upload: 0,
  analyzing: 1,
  result: 2,
};

export function Stepper({ currentStep }: StepperProps) {
  const currentIndex = stepOrder[currentStep];

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-500",
                  isCompleted && "border-primary bg-primary",
                  isCurrent && "border-primary bg-primary/20",
                  !isCompleted && !isCurrent && "border-muted bg-muted/30"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 text-primary-foreground animate-scale-in" />
                ) : (
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors duration-300",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                )}

                {/* Pulse ring for current step */}
                {isCurrent && (
                  <span className="absolute inset-0 rounded-lg border border-primary animate-ping opacity-30" />
                )}
              </div>

              {/* Label - hidden on mobile */}
              <span
                className={cn(
                  "hidden lg:block text-sm font-medium transition-colors duration-300",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="relative mx-2 h-0.5 w-8 bg-muted/50 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out rounded-full",
                    index < currentIndex ? "w-full" : "w-0"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
