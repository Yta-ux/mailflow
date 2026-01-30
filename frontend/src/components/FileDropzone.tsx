import { useCallback, useState } from "react";
import { Upload, FileText, File as FileIconLucide, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileDropzoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ACCEPTED_TYPES = [".txt", ".pdf"];

export function FileDropzone({ file, onFileChange }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && isValidFile(droppedFile)) {
        onFileChange(droppedFile);
      }
    },
    [onFileChange]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile && isValidFile(selectedFile)) {
        onFileChange(selectedFile);
      }
    },
    [onFileChange]
  );

  const isValidFile = (file: File) => {
    const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    return ACCEPTED_TYPES.includes(extension);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".pdf")) return FileIconLucide;
    return FileText;
  };

  if (file) {
    const FileIcon = getFileIcon(file.name);
    return (
      <div className="flex items-center justify-between rounded-lg border-2 border-primary/30 bg-primary/5 p-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onFileChange(null)}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        "relative flex h-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-muted hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <input
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleFileInput}
        className="absolute inset-0 cursor-pointer opacity-0"
      />

      <Upload
        className={cn(
          "h-10 w-10 mb-4 transition-all duration-300",
          isDragging ? "text-primary animate-float" : "text-muted-foreground"
        )}
      />

      <p className="text-center">
        <span className="font-medium text-foreground">
          Arraste e solte seu arquivo aqui
        </span>
        <br />
        <span className="text-sm text-muted-foreground">
          ou clique para selecionar
        </span>
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Formatos aceitos: .txt, .pdf
      </p>
    </div>
  );
}
