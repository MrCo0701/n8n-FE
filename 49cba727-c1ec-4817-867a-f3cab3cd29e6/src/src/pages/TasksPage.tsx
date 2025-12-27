import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { TaskTable } from '../components/TaskTable';
import { taskApi } from '../services/api';
import { ComplianceTask } from '../types';
import toast from 'react-hot-toast';
export function TasksPage() {
  const [tasks, setTasks] = useState<ComplianceTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Could not load compliance tasks');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Compliance Monitor
        </h1>
        <p className="text-slate-500">
          Track and manage obligations extracted from your contracts.
        </p>
      </div>

      {isLoading ? <div className="space-y-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse"></div>)}
        </div> : <TaskTable tasks={tasks} onUpdate={fetchTasks} />}
    </Layout>;
}