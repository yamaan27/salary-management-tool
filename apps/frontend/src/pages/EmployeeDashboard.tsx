import { useEffect, useState } from 'react';
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../api/client';
import { Employee } from '../types/employee';
import { EmployeeTable } from '../components/employee/EmployeeTable';
import { EmployeeForm } from '../components/employee/EmployeeForm';
import { EmployeeFormValues } from '../components/employee/employeeForm.schema';

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

  async function handleSubmit(payload: EmployeeFormValues) {
    const finalPayload = {
      ...payload,
      currency: 'INR',
    };

    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, finalPayload);
      setEditingEmployee(null);
    } else {
      await createEmployee(finalPayload);
    }

    await loadEmployees();
  }

  async function handleDelete(id: string) {
    await deleteEmployee(id);
    await loadEmployees();
  }

  function handleEdit(employee: Employee) {
    setEditingEmployee(employee);
  }

  async function handleSearch() {
    setPage(1);
    setSearch(searchInput);

    await loadEmployees({
      page: 1,
      search: searchInput,
    });
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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1
        style={{
          marginTop: 0,
          fontSize: '32px',
        }}
      >
        Employee Dashboard
      </h1>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <input
          placeholder="Search employees"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />

        <button
          type="button"
          onClick={handleSearch}
          style={{
            background: '#2563eb',
            color: 'white',
          }}
        >
          Search
        </button>
      </div>

      <div
        style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <EmployeeForm
          onSubmit={handleSubmit}
          initialValues={editingEmployee ?? undefined}
        />
      </div>

      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '24px',
        }}
      >
        <button type="button" onClick={handlePreviousPage}>
          Previous
        </button>

        <span>Page {page}</span>

        <button type="button" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
