import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? "default" : "outline"}
      className={cn(
        "transition-all duration-200",
        copied && "bg-success hover:bg-success",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4 animate-scale-in" />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          Copiar Resposta
        </>
      )}
    </Button>
  );
}
