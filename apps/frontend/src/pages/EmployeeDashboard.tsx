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

  async function loadEmployees() {
    setLoading(true);

    const response = await fetchEmployees();

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

  useEffect(() => {
    loadEmployees();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Employee Dashboard</h1>

      <EmployeeForm
        onSubmit={handleSubmit}
        initialValues={editingEmployee ?? undefined}
      />

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
