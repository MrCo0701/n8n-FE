import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Scale, FileText, CheckSquare, Shield } from 'lucide-react';
export function Sidebar() {
  const navItems = [{
    to: '/',
    icon: LayoutDashboard,
    label: 'Dashboard'
  }, {
    to: '/laws',
    icon: Scale,
    label: 'Laws & Regulations'
  }, {
    to: '/contracts',
    icon: FileText,
    label: 'Contracts'
  }, {
    to: '/tasks',
    icon: CheckSquare,
    label: 'Compliance Tasks'
  }];
  return <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <Shield className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="font-bold text-lg leading-tight">AI Compliance</h1>
          <p className="text-xs text-slate-400">Guardian System</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => <NavLink key={item.to} to={item.to} className={({
        isActive
      }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>)}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-200">
              AI Engine Online
            </span>
          </div>
        </div>
      </div>
    </aside>;
}