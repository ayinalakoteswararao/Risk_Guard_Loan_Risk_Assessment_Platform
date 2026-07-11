// client/src/hooks/use-loans.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, type InsertLoanInput, type LoanWithPrediction, type AnalyzeResponse, type MonitoringStats } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// GET /api/loans - List all loans
export function useLoans() {
  return useQuery({
    queryKey: ["/api/loans"],
    queryFn: async () => {
      return apiClient.request<LoanWithPrediction[]>("/api/loans");
    },
  });
}

// GET /api/loans/:id - Get single loan detail
export function useLoan(id: number) {
  return useQuery({
    queryKey: ["/api/loans", id],
    queryFn: async () => {
      const data = await apiClient.request<LoanWithPrediction>(`/api/loans/${id}`);
      return data;
    },
    enabled: !!id && !isNaN(id),
  });
}

// POST /api/loans/analyze - Create loan & analyze
export function useCreateLoan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertLoanInput) => {
      return apiClient.request<AnalyzeResponse>("/api/loans/analyze", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/loans"] });
      queryClient.invalidateQueries({ queryKey: ["/api/monitoring/stats"] });
      toast({
        title: "Analysis Complete",
        description: `Risk score calculated for ${data.application.applicantName}`,
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// GET /api/monitoring/stats - Dashboard stats
export function useMonitoringStats() {
  return useQuery({
    queryKey: ["/api/monitoring/stats"],
    queryFn: async () => {
      return apiClient.request<MonitoringStats>("/api/monitoring/stats");
    },
  });
}
