import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FloatingHeader } from "./FloatingHeader";
import { HeroSection } from "./HeroSection";
import { Stepper } from "./Stepper";
import { InputModeToggle } from "./InputModeToggle";
import { TextInput } from "./TextInput";
import { FileDropzone } from "./FileDropzone";
import { AnalyzingState } from "./AnalyzingState";
import { ResultCard } from "./ResultCard";
import { AnimatedBackground } from "./AnimatedBackground";
import { useAnalyzeText, useAnalyzeFile } from "@/hooks/use-email-analysis";
import type { AnalysisStep, InputMode, EmailAnalysis } from "@/types/email";

export function EmailAnalyzer() {
  const [step, setStep] = useState<AnalysisStep>("upload");
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<EmailAnalysis | null>(null);

  const { mutate: analyzeText, isPending: isAnalyzingText } = useAnalyzeText({
    onSuccess: (data) => {
      setResult(data.analysis);
      setStep("result");
      toast.success("Análise concluída com sucesso!");
    },
    onError: () => {
      setStep("upload");
    },
  });

  const { mutate: analyzeFile, isPending: isAnalyzingFile } = useAnalyzeFile({
    onSuccess: (data) => {
      setResult(data.analysis);
      setStep("result");
      toast.success("Arquivo analisado com sucesso!");
    },
    onError: () => {
      setStep("upload");
    },
  });

  const isAnalyzing = isAnalyzingText || isAnalyzingFile;
  const canSubmit = inputMode === "text" ? textContent.trim().length > 0 : file !== null;

  const handleAnalyze = () => {
    setStep("analyzing");

    if (inputMode === "text") {
      analyzeText({ text: textContent });
    } else if (file) {
      analyzeFile(file);
    }
  };

  const handleReset = () => {
    setStep("upload");
    setTextContent("");
    setFile(null);
    setResult(null);
  };

  return (
    <div className="relative h-screen overflow-hidden flex flex-col">
      <AnimatedBackground />
      
      <div className="relative z-10 flex flex-col h-full">
        <FloatingHeader />
        
        <HeroSection />

        <div className="flex-1 flex flex-col min-h-0 px-4 pb-4">
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col min-h-0">
            
            <div className="flex justify-center mb-4 flex-shrink-0">
              <Stepper currentStep={step} />
            </div>

            <div className="grid lg:grid-cols-2 gap-4 flex-1 min-h-0">
              
              <div className="animate-slide-in-left min-h-0 flex">
                <Card className="glass-card border-0 shadow-2xl overflow-hidden flex-1 flex flex-col">
                  <CardContent className="p-4 md:p-6 flex-1 flex flex-col min-h-0">
                    {step === "upload" && (
                      <div className="flex-1 flex flex-col space-y-4 animate-fade-in min-h-0">
                        <div className="text-center flex-shrink-0">
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            Insira seu email
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Cole o texto ou faça upload de um arquivo
                          </p>
                        </div>

                        <div className="flex justify-center flex-shrink-0">
                          <InputModeToggle mode={inputMode} onModeChange={setInputMode} />
                        </div>

                        <div className="flex-1 min-h-0">
                          {inputMode === "text" ? (
                            <TextInput value={textContent} onChange={setTextContent} />
                          ) : (
                            <FileDropzone file={file} onFileChange={setFile} />
                          )}
                        </div>

                        <Button
                          onClick={handleAnalyze}
                          disabled={!canSubmit || isAnalyzing}
                          size="lg"
                          className="w-full gradient-fluid hover-glow transition-all duration-300 disabled:opacity-50 text-white font-semibold py-4 flex-shrink-0"
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          {isAnalyzing ? "Analisando..." : "Analisar Email"}
                        </Button>
                      </div>
                    )}

                    {step === "analyzing" && <AnalyzingState />}

                    {step === "result" && result && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="h-14 w-14 mb-4 rounded-full gradient-fluid flex items-center justify-center animate-pulse-glow">
                          <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          Análise Concluída!
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Veja os resultados ao lado
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="animate-slide-in-right min-h-0 flex">
                <Card className="glass-card border-0 shadow-2xl overflow-hidden flex-1 flex flex-col">
                  <CardContent className="p-4 md:p-6 flex-1 flex flex-col min-h-0 overflow-auto">
                    {step === "upload" && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Sparkles className="h-8 w-8 text-primary/50" />
                        </div>
                        <h3 className="text-lg font-semibold text-muted-foreground mb-1">
                          Prévia do Resultado
                        </h3>
                        <p className="text-xs text-muted-foreground/70 max-w-xs">
                          Os resultados da análise aparecerão aqui após você enviar um email
                        </p>
                      </div>
                    )}

                    {step === "analyzing" && (
                      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
                        <div className="relative mb-4">
                          <div className="h-16 w-16 rounded-full gradient-fluid animate-spin-slow" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          Processando...
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Nossa IA está analisando seu email
                        </p>
                      </div>
                    )}

                    {step === "result" && result && (
                      <ResultCard result={result} onReset={handleReset} />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
