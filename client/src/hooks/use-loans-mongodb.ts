// client/src/hooks/use-loans-mongodb.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClientMongo, type InsertLoanInput, type LoanWithPrediction, type AnalyzeResponse, type MonitoringStats, type UserProfileWithLoans } from "@/lib/api-mongodb";
import { useToast } from "@/hooks/use-toast";

// GET /api/loans - List all loans (MongoDB)
export function useLoans() {
  return useQuery({
    queryKey: ["/api/loans"],
    queryFn: async () => {
      return apiClientMongo.request<LoanWithPrediction[]>("/api/loans");
    },
  });
}

// GET /api/loans/:id - Get single loan detail (MongoDB)
export function useLoan(id: string) {
  return useQuery({
    queryKey: ["/api/loans", id],
    queryFn: async () => {
      const data = await apiClientMongo.request<LoanWithPrediction>(`/api/loans/${id}`);
      return data;
    },
    enabled: !!id && id.length > 0,
  });
}

// POST /api/loans/analyze - Create loan & analyze (MongoDB)
export function useCreateLoan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertLoanInput) => {
      return apiClientMongo.request<AnalyzeResponse>("/api/loans/analyze", {
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

// GET /api/monitoring/stats - Dashboard stats (MongoDB)
export function useMonitoringStats() {
  return useQuery({
    queryKey: ["/api/monitoring/stats"],
    queryFn: async () => {
      return apiClientMongo.request<MonitoringStats>("/api/monitoring/stats");
    },
  });
}

// GET /api/profile/:name - Get user profile with loan history (MongoDB)
export function useUserProfile(name: string) {
  return useQuery({
    queryKey: ["/api/profile", name],
    queryFn: async () => {
      return apiClientMongo.request<UserProfileWithLoans>(`/api/profile/${encodeURIComponent(name)}`);
    },
    enabled: !!name && name.length > 0,
  });
}

// POST /api/profile - Create or update user profile (MongoDB)
export function useCreateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      return apiClientMongo.request<any>("/api/profile", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Profile Created",
        description: "User profile has been created successfully",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Profile Creation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
