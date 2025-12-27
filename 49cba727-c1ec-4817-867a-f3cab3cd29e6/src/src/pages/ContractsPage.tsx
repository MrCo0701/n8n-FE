import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { ContractTable } from '../components/ContractTable';
import { ContractForm } from '../components/ContractForm';
import { contractApi } from '../services/api';
import { Contract } from '../types';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
export function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const fetchContracts = async () => {
    try {
      setIsLoading(true);
      const data = await contractApi.getAll();
      setContracts(data);
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
      // Fallback for demo purposes if API fails
      toast.error('Could not load contracts (API might be offline)');
      setContracts([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchContracts();
  }, []);
  return <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Contract Management
          </h1>
          <p className="text-slate-500">
            Manage, sign, and analyze your legal documents.
          </p>
        </div>
        {!isCreating && <button onClick={() => setIsCreating(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Contract
          </button>}
      </div>

      {isCreating ? <div className="mb-8">
          <ContractForm onSuccess={() => {
        setIsCreating(false);
        fetchContracts();
      }} onCancel={() => setIsCreating(false)} />
        </div> : <>
          {isLoading ? <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse"></div>)}
            </div> : <ContractTable contracts={contracts} onUpdate={fetchContracts} />}
        </>}
    </Layout>;
}