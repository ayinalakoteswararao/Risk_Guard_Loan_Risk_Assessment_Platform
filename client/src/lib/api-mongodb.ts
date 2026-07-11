// client/src/lib/api-mongodb.ts
import { LoanWithPrediction, InsertLoanInput, AnalyzeResponse, MonitoringStats, UserProfileWithLoans } from "../../../shared/schema";

const API_BASE_URL = "http://localhost:3000";

class ApiClientMongo {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}

export const apiClientMongo = new ApiClientMongo();

// Re-export types
export type { LoanWithPrediction, InsertLoanInput, AnalyzeResponse, MonitoringStats, UserProfileWithLoans };

// MongoDB-specific API functions
export async function getLoanApplicationsMongo(): Promise<LoanWithPrediction[]> {
  return apiClientMongo.request<LoanWithPrediction[]>("/api/loans");
}

export async function getLoanByIdMongo(id: number): Promise<LoanWithPrediction> {
  return apiClientMongo.request<LoanWithPrediction>(`/api/loans/${id}`);
}

export async function createLoanMongo(data: InsertLoanInput): Promise<AnalyzeResponse> {
  return apiClientMongo.request<AnalyzeResponse>("/api/loans/analyze", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMonitoringStatsMongo(): Promise<MonitoringStats> {
  return apiClientMongo.request<MonitoringStats>("/api/monitoring/stats");
}
