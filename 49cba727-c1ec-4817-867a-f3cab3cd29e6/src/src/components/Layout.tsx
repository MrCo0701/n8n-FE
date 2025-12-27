import React from 'react';
import { Sidebar } from './Sidebar';
import { Toaster } from 'react-hot-toast';
interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({
  children
}: LayoutProps) {
  return <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
      <Toaster position="top-right" toastOptions={{
      className: 'text-sm font-medium',
      duration: 4000,
      style: {
        background: '#1e293b',
        color: '#fff'
      }
    }} />
    </div>;
}