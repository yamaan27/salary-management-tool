import { useEffect, useState } from 'react';
import { fetchEmployees, createEmployee } from '../api/client';
import { Employee } from '../types/employee';
import { EmployeeTable } from '../components/employee/EmployeeTable';
import { EmployeeForm } from '../components/employee/EmployeeForm';
import { EmployeeFormValues } from '../components/employee/employeeForm.schema';

export function EmployeeDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadEmployees() {
    setLoading(true);

    const response = await fetchEmployees();

    setEmployees(response.data);
    setLoading(false);
  }

  async function handleCreateEmployee(payload: EmployeeFormValues) {
    await createEmployee({
      ...payload,
      currency: 'INR',
    });

    await loadEmployees();
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

      <EmployeeForm onSubmit={handleCreateEmployee} />

      <EmployeeTable
        employees={employees}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
}
