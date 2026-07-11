// client/src/lib/api.ts
import { 
  LoanApplication, 
  Prediction, 
  InsertLoanApplication, 
  LoanWithPrediction, 
  AnalyzeResponse, 
  MonitoringStats 
} from "../../../shared/schema";

const API_BASE_URL = (import.meta as any).env.VITE_API_URL ?? "";

export const apiClient = {
  async request<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  },
};

// Re-export types from shared schema
export type { 
  LoanApplication, 
  Prediction, 
  InsertLoanApplication as InsertLoanInput, 
  LoanWithPrediction, 
  AnalyzeResponse, 
  MonitoringStats 
};

