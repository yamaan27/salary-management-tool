import {
  Pencil,
  Trash2,
  Users,
} from 'lucide-react';
import type { Employee } from '../../types/employee';
import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === 'ACTIVE'
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-slate-100 text-slate-600';

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

function EmploymentBadge({ type }: { type: string }) {
  const styles =
    type === 'FULL_TIME'
      ? 'bg-blue-100 text-blue-700'
      : type === 'CONTRACT'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-purple-100 text-purple-700';

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {type.replace('_', ' ')}
    </span>
  );
}

export function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );
  if (!employees.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <Users className="text-slate-500" size={28} />
        </div>

        <h3 className="text-lg font-semibold">No employees found</h3>
        <p className="mt-2 text-sm text-slate-500">
          Try adjusting filters or create a new employee.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-600">
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Country</th>
              <th className="px-6 py-4">Salary</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee.id}
                className={`border-t border-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                }`}
              >
                <td className="px-6 py-5">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {employee.fullName}
                    </p>
                    <p className="text-sm text-slate-500">{employee.email}</p>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div>
                    <p className="font-medium">{employee.jobTitle}</p>
                    <p className="text-sm text-slate-500">
                      {employee.department}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-slate-600">
                  {employee.country}
                </td>

                <td className="px-6 py-5 font-semibold">
                  ₹ {employee.salary.toLocaleString('en-IN')}
                </td>

                <td className="px-6 py-5">
                  <EmploymentBadge type={employee.employmentType} />
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={employee.status} />
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(employee)}
                      className="rounded-xl border border-slate-200 p-2 transition transition-all duration-200 hover:scale-105 hover:bg-blue-50"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => setEmployeeToDelete(employee)}
                      className="rounded-xl border border-slate-200 p-2 transition transition-all duration-200 hover:scale-105 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {employeeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
              <AlertTriangle className="text-red-600" />
            </div>

            <h3 className="text-xl font-semibold">Delete employee?</h3>

            <p className="mt-2 text-sm text-slate-500">
              This will permanently remove{' '}
              <strong>{employeeToDelete.fullName}</strong>.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setEmployeeToDelete(null)}
                className="rounded-2xl border border-slate-200 px-5 py-3"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDelete(employeeToDelete.id);
                  setEmployeeToDelete(null);
                }}
                className="rounded-2xl bg-red-600 px-5 py-3 font-medium text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}