import React from 'react';
import { Law } from '../types';
import { formatDate } from '../utils/formatters';
import { ExternalLink, Calendar, AlertCircle } from 'lucide-react';
interface LawCardProps {
  law: Law;
}
export function LawCard({
  law
}: LawCardProps) {
  const riskColor = {
    LOW: 'bg-green-100 text-green-700 border-green-200',
    MEDIUM: 'bg-orange-100 text-orange-700 border-orange-200',
    HIGH: 'bg-red-100 text-red-700 border-red-200'
  };
  return <article className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            {law.lawType}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${riskColor[law.riskLevel]}`}>
            {law.riskLevel} Risk
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-1 line-clamp-2" title={law.title}>
          {law.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4">{law.issuingBody}</p>

        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {law.summary}
        </p>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Affected Entities
            </p>
            <div className="flex flex-wrap gap-1.5">
              {law.affectedEntities.map((entity, idx) => <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-50 text-slate-600 border border-slate-200">
                  {entity}
                </span>)}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Key Changes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {law.keyChanges.map((change, idx) => <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-100">
                  {change}
                </span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex justify-between items-center">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          Effective: {formatDate(law.effectiveDate)}
        </div>
        <a href={law.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center transition-colors">
          View Source <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
        </a>
      </div>
    </article>;
}