import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const MESSAGES = [
  "Lendo conteúdo do email...",
  "Classificando email...",
  "Identificando prioridade...",
  "Gerando resposta inteligente...",
];

export function AnalyzingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
        </div>

        <p className="text-lg font-medium text-foreground animate-fade-in" key={messageIndex}>
          {MESSAGES[messageIndex]}
        </p>
      </div>

      <div className="space-y-4 rounded-lg border bg-card p-6">
        <div className="flex gap-3">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
