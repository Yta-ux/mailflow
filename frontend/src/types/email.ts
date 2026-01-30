export interface EmailAnalysis {
  category: "Productive" | "Unproductive";
  priority: "High" | "Medium" | "Low";
  summary: string;
  justification: string;
  suggested_reply: string;
}

export type AnalysisStep = "upload" | "analyzing" | "result";

export type InputMode = "text" | "file";
