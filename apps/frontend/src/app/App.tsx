import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { EmployeeDashboard } from '../pages/EmployeeDashboard';
import { AnalyticsDashboard } from '../pages/AnalyticsDashboard';

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/employees" replace />} />

        <Route path="/employees" element={<EmployeeDashboard />} />

        <Route path="/analytics" element={<AnalyticsDashboard />} />
      </Route>
    </Routes>
  );
}
