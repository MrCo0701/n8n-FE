import React from 'react';
import { Layout } from '../components/Layout';
import { FileText, CheckSquare, Scale, TrendingUp, AlertTriangle } from 'lucide-react';
export function Dashboard() {
  // Mock stats for dashboard
  const stats = [{
    label: 'Total Contracts',
    value: '124',
    icon: FileText,
    color: 'bg-blue-500'
  }, {
    label: 'Active Tasks',
    value: '18',
    icon: CheckSquare,
    color: 'bg-orange-500'
  }, {
    label: 'High Risk Laws',
    value: '3',
    icon: AlertTriangle,
    color: 'bg-red-500'
  }, {
    label: 'Compliance Rate',
    value: '94%',
    icon: TrendingUp,
    color: 'bg-green-500'
  }];
  return <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-500">
          Welcome back to AI Compliance Guardian.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center">
            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="flex items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    Contract "Service Agreement #202{i}" signed
                  </p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Upcoming Deadlines
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <div>
                  <p className="text-sm font-medium text-red-900">
                    Safety Compliance Report
                  </p>
                  <p className="text-xs text-red-700">Due in {i} days</p>
                </div>
                <span className="px-2 py-1 bg-white text-red-600 text-xs font-bold rounded">
                  Urgent
                </span>
              </div>)}
          </div>
        </div>
      </div>
    </Layout>;
}