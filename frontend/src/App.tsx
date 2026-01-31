import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EmailAnalyzer } from "@/components/EmailAnalyzer";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <EmailAnalyzer />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
