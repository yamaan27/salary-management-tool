import { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';

export default function App() {
  const [view, setView] = useState<'employees' | 'analytics'>('employees');

  return (
    <AppShell activeView={view} onNavigate={setView}>
      {view === 'employees' ? <EmployeeDashboard /> : <AnalyticsDashboard />}
    </AppShell>
  );
}
