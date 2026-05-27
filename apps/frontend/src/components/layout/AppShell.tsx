import type { ReactNode } from 'react';
import {
  BarChart3,
  Briefcase,
  Building2,
  UserCircle2,
} from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  activeView: 'employees' | 'analytics';
  onNavigate: (view: 'employees' | 'analytics') => void;
}

export function AppShell({ children, activeView, onNavigate }: AppShellProps) {
  const navItems = [
    {
      key: 'employees' as const,
      label: 'Employees',
      icon: Briefcase,
    },
    {
      key: 'analytics' as const,
      label: 'Analytics',
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="border-b border-slate-200 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                <Building2 size={22} />
              </div>

              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  SalaryOS
                </h1>
                <p className="text-sm text-slate-500">Workforce intelligence</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => onNavigate(item.key)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-5 lg:px-10">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Salary Management Dashboard
                </h2>
                <p className="text-sm text-slate-500">
                  Manage employees, compensation, and analytics
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 md:flex">
                  <Search size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-400">
                    Search employees...
                  </span>
                </div> */}

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
                  <UserCircle2 size={24} />
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium">Admin</p>
                    <p className="text-xs text-slate-500">Production</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
