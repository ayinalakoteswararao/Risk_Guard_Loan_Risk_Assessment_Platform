import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ShapChartProps {
  shapValues: Record<string, number>;
}

export function ShapChart({ shapValues }: ShapChartProps) {
  // Transform object to array and sort by absolute impact
  const data = Object.entries(shapValues)
    .map(([feature, impact]) => ({
      feature: feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // snake_case to Title Case
      impact,
      // Helper for coloring
      isPositive: impact > 0
    }))
    .filter(entry => {
      // Filter out features with zero or negligible impact
      const absImpact = Math.abs(entry.impact);
      return absImpact > 0.001; // Only show features with meaningful impact
    })
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 5); // Top 5 features

  return (
    <div className="h-[300px] w-full">
      {/* Color Legend */}
      <div className="flex items-center justify-center gap-6 mb-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#ef4444] rounded"></div>
          <span className="text-xs font-medium text-gray-600">Increases Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#10b981] rounded"></div>
          <span className="text-xs font-medium text-gray-600">Decreases Risk</span>
        </div>
      </div>
      
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="feature" 
              width={100}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                backgroundColor: '#fff', 
                borderRadius: '8px', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                border: '1px solid #e2e8f0',
                padding: '12px'
              }}
              labelFormatter={(label) => {
                const feature = label as string;
                return <strong style={{ color: '#1f2937' }}>{feature}</strong>;
              }}
              formatter={(value: number, name: any) => {
                const feature = name as string;
                const impactPercent = (value * 100).toFixed(2);
                const impactType = value > 0 ? 'Increases Risk' : 'Decreases Risk';
                const impactColor = value > 0 ? '#ef4444' : '#10b981';
                
                // Get detailed explanation for each feature
                const getExplanation = (featureName: string, val: number) => {
                  const absVal = Math.abs(val);
                  const isRisk = val > 0;
                  
                  switch(featureName.toLowerCase()) {
                    case 'credit_score':
                      return isRisk 
                        ? `Lower credit score indicates higher default probability (${absVal}% increased risk)`
                        : `High credit score shows reliable payment history (${absVal}% reduced risk)`;
                    case 'loan_amount':
                      return isRisk 
                        ? `Large loan amount increases financial burden (${absVal}% increased risk)`
                        : `Moderate loan amount is manageable (${absVal}% reduced risk)`;
                    case 'income':
                      return isRisk 
                        ? `Lower income suggests payment difficulty (${absVal}% increased risk)`
                        : `High income demonstrates repayment capacity (${absVal}% reduced risk)`;
                    case 'employment_length':
                      return isRisk 
                        ? `Short employment history indicates instability (${absVal}% increased risk)`
                        : `Long employment shows job stability (${absVal}% reduced risk)`;
                    case 'home_ownership':
                      return isRisk 
                        ? `Renting suggests less financial stability (${absVal}% increased risk)`
                        : `Home ownership shows financial commitment (${absVal}% reduced risk)`;
                    case 'loan_term':
                      return isRisk 
                        ? `Longer term increases default probability (${absVal}% increased risk)`
                        : `Shorter term reduces exposure time (${absVal}% reduced risk)`;
                    case 'loan_purpose':
                      return isRisk 
                        ? `High-risk loan purpose detected (${absVal}% increased risk)`
                        : `Stable loan purpose indicates lower risk (${absVal}% reduced risk)`;
                    case 'overdue_delays':
                      return isRisk 
                        ? `Previous overdue payments indicate risk pattern (${absVal}% increased risk)`
                        : `Clean payment history shows reliability (${absVal}% reduced risk)`;
                    case 'check_bounces':
                      return isRisk 
                        ? `Previous check bounces suggest cash flow issues (${absVal}% increased risk)`
                        : `No check bounces shows good financial management (${absVal}% reduced risk)`;
                    default:
                      return isRisk 
                        ? `This factor increases overall risk assessment by ${absVal}%`
                        : `This factor helps reduce overall risk assessment by ${absVal}%`;
                  }
                };
                
                return [
                  <div style={{ color: impactColor, fontWeight: 'bold', fontSize: '14px' }}>
                    {impactType} ({parseFloat(impactPercent) > 0 ? '+' : ''}{impactPercent}%)
                  </div>,
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
                    {getExplanation(feature, value)}
                  </div>
                ];
              }}
            />
            <Bar dataKey="impact" radius={[0, 4, 4, 0]} barSize={25}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isPositive ? '#ef4444' : '#10b981'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">No significant factors detected</p>
            <p className="text-xs text-gray-500 mt-1">All features show minimal impact on risk score</p>
          </div>
        </div>
      )}
    </div>
  );
}
