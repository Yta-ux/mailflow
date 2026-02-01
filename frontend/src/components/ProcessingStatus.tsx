import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const MESSAGES = [
  "Lendo conteúdo do email...",
  "Classificando email...",
  "Identificando prioridade...",
  "Gerando resposta inteligente...",
];

export function ProcessingStatus() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
        </div>
        <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 animate-fade-in" key={messageIndex}>
        {MESSAGES[messageIndex]}
      </h3>
      
      <p className="text-xs text-muted-foreground">
        Nossa IA está analisando seu email
      </p>
    </div>
  );
}
