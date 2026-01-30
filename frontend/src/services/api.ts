import { api } from "@/lib/api";
import type { ProcessedTextResponse, TextInput } from "@/types/email";

export const emailService = {
  processText: async (data: TextInput): Promise<ProcessedTextResponse> => {
    const response = await api.post<ProcessedTextResponse>("/process/text", data);
    return response.data;
  },

  processFile: async (file: File): Promise<ProcessedTextResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<ProcessedTextResponse>("/process/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
