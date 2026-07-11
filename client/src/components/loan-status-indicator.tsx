import { ReactNode } from "react";
import { clsx } from "clsx";

interface LoanStatusIndicatorProps {
  hasExistingLoans: boolean;
  overdueDelay: number;
  checkBounces: number;
  approvalChance: number;
}

export function LoanStatusIndicator({ 
  hasExistingLoans, 
  overdueDelay, 
  checkBounces, 
  approvalChance 
}: LoanStatusIndicatorProps) {
  const getStatusColor = (value: number, threshold: number) => {
    if (value === 0) return "bg-emerald-500";
    if (value <= threshold) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getApprovalColor = (chance: number) => {
    if (chance >= 70) return "text-emerald-600";
    if (chance >= 40) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-[hsl(var(--border))] p-6">
      <h3 className="font-black text-[hsl(var(--foreground))] text-lg mb-6">Loan Status Overview</h3>
      
      <div className="space-y-6">
        {/* Existing Loans Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={clsx(
              "w-3 h-3 rounded-full",
              hasExistingLoans ? "bg-amber-500" : "bg-emerald-500"
            )} />
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">Existing Loans</span>
          </div>
          <span className={clsx(
            "text-sm font-black px-3 py-1 rounded-full",
            hasExistingLoans ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
          )}>
            {hasExistingLoans ? "Active" : "None"}
          </span>
        </div>

        {/* Overdue Delay */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">Overdue Delay</span>
            <span className="text-sm font-black text-[hsl(var(--foreground))]">{overdueDelay} days</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={clsx(
                "h-2 rounded-full transition-all duration-300",
                getStatusColor(overdueDelay, 30)
              )}
              style={{ width: `${Math.min(overdueDelay, 100)}%` }}
            />
          </div>
        </div>

        {/* Check Bounces */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">Check Bounces</span>
            <span className="text-sm font-black text-[hsl(var(--foreground))]">{checkBounces}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={clsx(
                "h-2 rounded-full transition-all duration-300",
                getStatusColor(checkBounces, 2)
              )}
              style={{ width: `${Math.min(checkBounces * 20, 100)}%` }}
            />
          </div>
        </div>

        {/* Approval Chance */}
        <div className="pt-4 border-t border-[hsl(var(--border))]">
          <div className="text-center">
            <div className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">
              Approval Probability
            </div>
            <div className={clsx(
              "text-3xl font-black mb-2",
              getApprovalColor(approvalChance)
            )}>
              {approvalChance.toFixed(1)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={clsx(
                  "h-3 rounded-full transition-all duration-500",
                  approvalChance >= 70 ? "bg-emerald-500" :
                  approvalChance >= 40 ? "bg-amber-500" : "bg-rose-500"
                )}
                style={{ width: `${approvalChance}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
