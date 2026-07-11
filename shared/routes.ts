import { z } from 'zod';
import { insertLoanSchema, loanApplicationSchema, predictionSchema, LoanApplication, Prediction } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  loans: {
    create: {
      method: 'POST' as const,
      path: '/api/loans/analyze' as const, // Analyzes and saves in one go
      input: insertLoanSchema,
      responses: {
        201: z.object({
          application: loanApplicationSchema,
          prediction: predictionSchema,
        }),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/loans' as const,
      responses: {
        200: z.array(z.object({
          application: loanApplicationSchema,
          prediction: predictionSchema.optional(),
        })),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/loans/:id' as const,
      responses: {
        200: z.object({
          application: loanApplicationSchema,
          prediction: predictionSchema.optional(),
        }),
        404: errorSchemas.notFound,
      },
    },
  },
  monitoring: {
    stats: {
      method: 'GET' as const,
      path: '/api/monitoring/stats' as const,
      responses: {
        200: z.object({
          totalApplications: z.number(),
          avgDefaultRisk: z.number(),
          avgFraudRisk: z.number(),
          highRiskCount: z.number(),
        }),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type InsertLoanInput = z.infer<typeof api.loans.create.input>;
export type AnalyzeResponse = z.infer<typeof api.loans.create.responses[201]>;
