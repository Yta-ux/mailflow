import { FileText, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InputMode } from "@/types/email";

interface InputModeToggleProps {
  mode: InputMode;
  onModeChange: (mode: InputMode) => void;
}

export function InputModeToggle({ mode, onModeChange }: InputModeToggleProps) {
  return (
    <div className="inline-flex rounded-lg bg-muted p-1">
      <button
        onClick={() => onModeChange("text")}
        className={cn(
          "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
          mode === "text"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <FileText className="h-4 w-4" />
        Texto
      </button>
      <button
        onClick={() => onModeChange("file")}
        className={cn(
          "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
          mode === "file"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Upload className="h-4 w-4" />
        Arquivo
      </button>
    </div>
  );
}
