import { CheckCircle, XCircle, FileText, Lightbulb, MessageSquare, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";
import type { EmailAnalysis } from "@/types/email";

interface ResultCardProps {
  result: EmailAnalysis;
  onReset: () => void;
}

const priorityConfig = {
  High: { color: "bg-destructive text-destructive-foreground", label: "Alta Prioridade", dot: "🔴" },
  Medium: { color: "bg-warning text-warning-foreground", label: "Média Prioridade", dot: "🟡" },
  Low: { color: "bg-success text-success-foreground", label: "Baixa Prioridade", dot: "🟢" },
};

const categoryConfig = {
  Productive: { color: "bg-success text-success-foreground", icon: CheckCircle, label: "Produtivo" },
  Unproductive: { color: "bg-muted text-muted-foreground", icon: XCircle, label: "Improdutivo" },
};

export function ResultCard({ result, onReset }: ResultCardProps) {
  const priority = priorityConfig[result.priority];
  const category = categoryConfig[result.category];
  const CategoryIcon = category.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap gap-3">
        <Badge className={cn("flex items-center gap-2 px-4 py-2 text-sm", category.color)}>
          <CategoryIcon className="h-4 w-4" />
          {category.label}
        </Badge>
        <Badge className={cn("px-4 py-2 text-sm", priority.color)}>
          {priority.dot} {priority.label}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileText className="h-4 w-4" />
          RESUMO
        </div>
        <p className="text-foreground leading-relaxed">{result.summary}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Lightbulb className="h-4 w-4" />
          JUSTIFICATIVA
        </div>
        <p className="text-foreground leading-relaxed">{result.justification}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          RESPOSTA SUGERIDA
        </div>
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {result.suggested_reply}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <CopyButton text={result.suggested_reply} />
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Nova Análise
        </Button>
      </div>
    </div>
  );
}
