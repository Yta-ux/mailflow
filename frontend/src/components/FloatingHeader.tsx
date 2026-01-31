import { Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function FloatingHeader() {
  return (
    <header className="shrink-0 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          <span className="text-lg font-semibold text-foreground">MailFlow</span>
        </div>
        
        <ThemeToggle />
      </div>
    </header>
  );
}
