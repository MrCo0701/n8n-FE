import React, { useState } from 'react';
import { Contract } from '../types';
import { formatCurrency, getRiskColor, getRiskTextColor } from '../utils/formatters';
import { contractApi } from '../services/api';
import toast from 'react-hot-toast';
import { FileSignature, Loader2, AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react';
interface ContractTableProps {
  contracts: Contract[];
  onUpdate: () => void;
}
export function ContractTable({
  contracts,
  onUpdate
}: ContractTableProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const handleSignAndScan = async (id: string) => {
    try {
      setProcessingId(id);
      // Simulate network delay for "Scanning with AI..." effect
      await new Promise(resolve => setTimeout(resolve, 2000));
      await contractApi.updateStatus(id, 'SIGNED');
      toast.success('Contract signed and sent for AI analysis');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update contract status');
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };
  const getStatusBadge = (status: Contract['status']) => {
    const styles = {
      DRAFT: 'bg-slate-100 text-slate-700',
      SIGNED: 'bg-blue-100 text-blue-700',
      CANCELLED: 'bg-red-100 text-red-700',
      COMPLETED: 'bg-green-100 text-green-700'
    };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
      </span>;
  };
  return <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Title & Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Partner Info
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Financials
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                AI Analytics
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {contracts.map(contract => <tr key={contract.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">
                      {contract.title}
                    </span>
                    <span className="inline-flex mt-1">
                      <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600 border border-slate-200">
                        {contract.contractType}
                      </span>
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">
                      {contract.partnerName}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Tax: {contract.partnerTaxCode}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-slate-900">
                    {formatCurrency(contract.contractValue, contract.currency)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full max-w-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-slate-500">
                        Risk Score
                      </span>
                      <span className={`text-xs font-bold ${getRiskTextColor(contract.riskScore)}`}>
                        {contract.riskScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div className={`h-2 rounded-full ${getRiskColor(contract.riskScore)}`} style={{
                    width: `${contract.riskScore}%`
                  }}></div>
                    </div>
                    {contract.riskNote && <div className="flex items-center text-xs text-slate-500 group relative cursor-help">
                        <Info className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-[150px]">
                          {contract.riskNote}
                        </span>
                        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-10">
                          {contract.riskNote}
                        </div>
                      </div>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(contract.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {contract.status === 'DRAFT' && <button onClick={() => handleSignAndScan(contract.id)} disabled={processingId === contract.id} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                      {processingId === contract.id ? <>
                          <Loader2 className="animate-spin -ml-0.5 mr-2 h-3 w-3" />
                          Scanning...
                        </> : <>
                          <FileSignature className="-ml-0.5 mr-2 h-3 w-3" />
                          Sign & Scan
                        </>}
                    </button>}
                </td>
              </tr>)}

            {contracts.length === 0 && <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  No contracts found. Create your first contract to get started.
                </td>
              </tr>}
          </tbody>
        </table>
      </div>
    </div>;
}