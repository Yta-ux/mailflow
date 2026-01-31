import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const PLACEHOLDER = `Exemplo de email:

Olá equipe,

Gostaria de agendar uma reunião para discutir os próximos passos do projeto. 
Podemos nos encontrar na quinta-feira às 14h?

Atenciosamente,
Maria`;

export function TextInput({ value, onChange, maxLength = 1500 }: TextInputProps) {
  const handleChange = (newValue: string) => {
    if (newValue.length > maxLength) {
      toast.warning(`Limite de ${maxLength.toLocaleString()} caracteres atingido.`);
      return;
    }
    onChange(newValue);
  };

  return (
    <div className="flex flex-col h-full">
      <Textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={PLACEHOLDER}
        className="flex-1 min-h-0 resize-none border-2 border-muted focus:border-primary transition-colors duration-200"
      />
      <div className="flex justify-end mt-1 shrink-0">
        <span className="text-xs text-muted-foreground">
          {value.length.toLocaleString()} / {maxLength.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
