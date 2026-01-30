import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full text-center py-4 px-4 animate-fade-in-up flex-shrink-0">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-3">
        <Sparkles className="h-3 w-3 text-primary" />
        <span className="text-xs font-medium text-muted-foreground">
          Inteligência Artificial Avançada
        </span>
      </div>
      
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
        <span className="text-foreground">Transforme emails em </span>
        <span className="shimmer-text">insights</span>
      </h1>
      
      <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
        Classifique, analise e receba sugestões de resposta em segundos.
      </p>
    </section>
  );
}
