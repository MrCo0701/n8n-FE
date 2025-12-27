import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { LawCard } from '../components/LawCard';
import { lawApi } from '../services/api';
import { Law } from '../types';
import toast from 'react-hot-toast';
export function LawsPage() {
  const [laws, setLaws] = useState<Law[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const data = await lawApi.getAll();
        console.log(data);
        //@ts-ignore
        setLaws(data);
      } catch (error) {
        console.error('Failed to fetch laws:', error);
        toast.error('Could not load regulations');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLaws();
  }, []);
  return <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Regulatory Scout</h1>
        <p className="text-slate-500">
          Stay updated with the latest legal regulations and changes.
        </p>
      </div>

      {isLoading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-slate-100 rounded-xl animate-pulse"></div>)}
        </div> : laws.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laws.map(law => <LawCard key={law.id} law={law} />)}
        </div> : <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <p className="text-slate-500">No regulations tracked yet.</p>
        </div>}
    </Layout>;
}