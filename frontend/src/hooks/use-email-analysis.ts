import { useState } from "react";
import { emailService } from "@/services/api";
import type { ProcessedTextResponse, ApiError, TextInput } from "@/types/email";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface UseAnalyzeEmailOptions {
  onSuccess?: (data: ProcessedTextResponse) => void;
  onError?: (error: ApiError) => void;
}

export function useAnalyzeText(options?: UseAnalyzeEmailOptions) {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: TextInput) => {
    setIsPending(true);
    try {
      const response = await emailService.processText(data);
      options?.onSuccess?.(response);
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      const apiError = axiosError.response?.data || {
        error_code: "UNKNOWN_ERROR",
        message: "Ocorreu um erro desconhecido ao processar o email.",
      };
      
      toast.error("Erro na análise", {
        description: apiError.message,
      });

      options?.onError?.(apiError);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}

export function useAnalyzeFile(options?: UseAnalyzeEmailOptions) {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (file: File) => {
    setIsPending(true);
    try {
      const response = await emailService.processFile(file);
      options?.onSuccess?.(response);
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      const apiError = axiosError.response?.data || {
        error_code: "UNKNOWN_ERROR",
        message: "Ocorreu um erro desconhecido ao processar o arquivo.",
      };

      toast.error("Erro no processamento", {
        description: apiError.message,
      });

      options?.onError?.(apiError);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}
