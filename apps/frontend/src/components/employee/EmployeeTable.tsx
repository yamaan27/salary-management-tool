import type { Employee } from '../../types/employee';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Job Title</th>
          <th>Country</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.employeeId}</td>
            <td>{employee.fullName}</td>
            <td>{employee.jobTitle}</td>
            <td>{employee.country}</td>
            <td>
              {employee.currency} {employee.salary}
            </td>
            <td>
              <button type="button" onClick={() => onEdit(employee)}>
                Edit
              </button>

              <button type="button" onClick={() => onDelete(employee.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
