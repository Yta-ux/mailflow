export type EmailCategory = "Productive" | "Unproductive";
export type EmailPriority = "High" | "Medium" | "Low";

export interface EmailAnalysis {
  category: EmailCategory;
  priority: EmailPriority;
  summary: string;
  justification: string;
  suggested_reply: string;
}

export interface ProcessedTextResponse {
  original_text: string;
  analysis: EmailAnalysis;
}

export interface ApiError {
  error_code: string;
  message: string;
  retry_after?: number;
}

export interface TextInput {
  text: string;
}

export type AnalysisStep = "upload" | "analyzing" | "result";

export type InputMode = "text" | "file";
