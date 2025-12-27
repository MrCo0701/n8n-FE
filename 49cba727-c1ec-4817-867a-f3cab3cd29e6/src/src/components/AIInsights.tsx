import React from 'react';
import { AlertTriangle, BookOpen, CheckCircle2 } from 'lucide-react';
import { RiskAssessment } from '../types';
interface AIInsightsProps {
  assessment: RiskAssessment | null;
}
export function AIInsights({
  assessment
}: AIInsightsProps) {
  if (!assessment) return null;
  return <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <span className="text-blue-600">✨</span> AI Risk Assessment
        </h3>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Factors */}
        <div>
          <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Key Risk Factors
          </h4>
          <ul className="space-y-2">
            {assessment.riskFactors.map((factor, idx) => <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {factor}
              </li>)}
          </ul>
        </div>

        {/* Legal References */}
        <div>
          <h4 className="text-sm font-semibold text-blue-600 mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Legal References
          </h4>
          <ul className="space-y-2">
            {assessment.legalRefs.map((ref, idx) => <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {ref}
              </li>)}
          </ul>
        </div>

        {/* Mitigations */}
        <div>
          <h4 className="text-sm font-semibold text-green-600 mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Suggested Mitigations
          </h4>
          <ul className="space-y-2">
            {assessment.mitigations.map((mitigation, idx) => <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0" />
                {mitigation}
              </li>)}
          </ul>
        </div>
      </div>
    </div>;
}