import { useMutation } from "@tanstack/react-query";
import { emailService } from "@/services/api";
import type { ProcessedTextResponse, ApiError, TextInput } from "@/types/email";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface UseAnalyzeEmailOptions {
  onSuccess?: (data: ProcessedTextResponse) => void;
  onError?: (error: ApiError) => void;
}

export function useAnalyzeText(options?: UseAnalyzeEmailOptions) {
  return useMutation<ProcessedTextResponse, AxiosError<ApiError>, TextInput>({
    mutationFn: (data) => emailService.processText(data),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      const apiError = error.response?.data || {
        error_code: "UNKNOWN_ERROR",
        message: "Ocorreu um erro desconhecido ao processar o email.",
      };
      
      toast.error("Erro na análise", {
        description: apiError.message,
      });

      options?.onError?.(apiError);
    },
  });
}

export function useAnalyzeFile(options?: UseAnalyzeEmailOptions) {
  return useMutation<ProcessedTextResponse, AxiosError<ApiError>, File>({
    mutationFn: (file) => emailService.processFile(file),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      const apiError = error.response?.data || {
        error_code: "UNKNOWN_ERROR",
        message: "Ocorreu um erro desconhecido ao processar o arquivo.",
      };

      toast.error("Erro no processamento", {
        description: apiError.message,
      });

      options?.onError?.(apiError);
    },
  });
}
