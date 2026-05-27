import { useEffect, useState } from 'react';
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../api/client';
import type { Employee } from '../types/employee';
import { EmployeeTable } from '../components/employee/EmployeeTable';
import { EmployeeForm } from '../components/employee/EmployeeForm';
import { z } from 'zod';
import { employeeFormSchema } from '../components/employee/employeeForm.schema';
import { toast } from 'sonner';

type EmployeeFormInput = z.input<typeof employeeFormSchema>;

export function EmployeeDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const [page, setPage] = useState(1);
  const limit = 20;

  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  async function loadEmployees(
    overrides?: Partial<{
      page: number;
      search: string;
    }>,
  ) {
    setLoading(true);

    const nextPage = overrides?.page ?? page;
    const nextSearch = overrides?.search ?? search;

    const response = await fetchEmployees({
      page: nextPage,
      limit,
      search: nextSearch,
    });

    setEmployees(response.data);
    setLoading(false);
  }

  const handleSubmit = async (payload: EmployeeFormInput) => {
    try {
      const normalizedPayload = {
        ...payload,
        salary: Number(payload.salary),
      };

      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, normalizedPayload);
        toast.success('Employee updated successfully');
      } else {
        await createEmployee(normalizedPayload);
        toast.success('Employee created successfully');
      }

      setEditingEmployee(null);
      await loadEmployees();
    } catch {
      toast.error('Failed to save employee');
    }
  };

  async function handleDelete(id: string) {
    try {
      await deleteEmployee(id);
      toast.success('Employee deleted successfully');
      await loadEmployees();
    } catch {
      toast.error('Failed to delete employee');
    }
  }

  function handleEdit(employee: Employee) {
    setEditingEmployee(employee);
  }

  async function handleSearch() {
    try {
      setPage(1);
      setSearch(searchInput);

      await loadEmployees({
        page: 1,
        search: searchInput,
      });

      toast.success('Search updated');
    } catch {
      toast.error('Search failed');
    }
  }

  async function handleNextPage() {
    const nextPage = page + 1;
    setPage(nextPage);

    await loadEmployees({
      page: nextPage,
    });
  }

  async function handlePreviousPage() {
    if (page === 1) return;

    const previousPage = page - 1;
    setPage(previousPage);

    await loadEmployees({
      page: previousPage,
    });
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6">
        <div className="h-24 animate-pulse rounded-3xl bg-white shadow-sm" />
        <div className="h-48 animate-pulse rounded-3xl bg-white shadow-sm" />
        <div className="h-96 animate-pulse rounded-3xl bg-white shadow-sm" />
      </div>
    );
  }
  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="mt-2 text-slate-500">
            Manage workforce records, compensation, and employment details.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            placeholder="Search employees..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm outline-none transition focus:border-slate-900"
          />

          <button
            type="button"
            onClick={handleSearch}
            className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white shadow-md transition hover:opacity-90"
          >
            Search
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {editingEmployee ? 'Edit Employee' : 'Add Employee'}
            </h2>
            <p className="text-sm text-slate-500">
              Maintain accurate workforce records.
            </p>
          </div>
        </div>

        <EmployeeForm
          onSubmit={handleSubmit}
          initialValues={editingEmployee ?? undefined}
        />
      </div>

      {/* Table */}
      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition disabled:opacity-40"
        >
          Previous
        </button>

        <div className="rounded-2xl bg-white px-6 py-3 shadow-sm">
          Page {page}
        </div>

        <button
          type="button"
          onClick={handleNextPage}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition hover:bg-slate-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
