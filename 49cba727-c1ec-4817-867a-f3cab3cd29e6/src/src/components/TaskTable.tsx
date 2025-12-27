import React from 'react';
import { ComplianceTask } from '../types';
import { getDaysRemaining } from '../utils/formatters';
import { taskApi } from '../services/api';
import toast from 'react-hot-toast';
import { ExternalLink, CheckCircle2, Circle, AlertTriangle, Clock } from 'lucide-react';
interface TaskTableProps {
  tasks: ComplianceTask[];
  onUpdate: () => void;
}
export function TaskTable({
  tasks,
  onUpdate
}: TaskTableProps) {
  const handleToggleStatus = async (task: ComplianceTask) => {
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    try {
      await taskApi.updateStatus(task.id, newStatus);
      toast.success(`Task marked as ${newStatus.toLowerCase()}`);
      onUpdate();
    } catch (error) {
      toast.error('Failed to update task status');
      console.error(error);
    }
  };
  const getDeadlineDisplay = (deadline: string) => {
    const days = getDaysRemaining(deadline);
    const isOverdue = days < 0;
    return <div className={`flex items-center gap-1.5 ${isOverdue ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
        <Clock className="h-3.5 w-3.5" />
        {isOverdue ? <span>Overdue by {Math.abs(days)} days</span> : <span>Due in {days} days</span>}
      </div>;
  };
  return <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-12">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Task & Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Related Contract
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Deadline
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Evidence
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {tasks.map(task => <tr key={task.id} className={`hover:bg-slate-50 transition-colors ${task.status === 'COMPLETED' ? 'bg-slate-50/50' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleToggleStatus(task)} className={`focus:outline-none transition-colors ${task.status === 'COMPLETED' ? 'text-green-500 hover:text-green-600' : 'text-slate-300 hover:text-slate-400'}`}>
                    {task.status === 'COMPLETED' ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${task.status === 'COMPLETED' ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                      {task.title}
                    </span>
                    <span className="text-sm text-slate-500 mt-1 line-clamp-2">
                      {task.description}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {task.contract?.title || 'Unknown Contract'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getDeadlineDisplay(task.deadline)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {task.evidenceUrl ? <a href={task.evidenceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 border border-slate-300 shadow-sm text-xs font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      View Evidence <ExternalLink className="ml-1.5 h-3 w-3" />
                    </a> : <span className="text-xs text-slate-400 italic">
                      No evidence
                    </span>}
                </td>
              </tr>)}

            {tasks.length === 0 && <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No compliance tasks found. All clear!
                </td>
              </tr>}
          </tbody>
        </table>
      </div>
    </div>;
}