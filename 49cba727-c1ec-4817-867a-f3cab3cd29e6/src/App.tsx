import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './src/pages/Dashboard';
import { ContractsPage } from './src/pages/ContractsPage';
import { LawsPage } from './src/pages/LawsPage';
import { TasksPage } from './src/pages/TasksPage';
export function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/laws" element={<LawsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Router>;
}