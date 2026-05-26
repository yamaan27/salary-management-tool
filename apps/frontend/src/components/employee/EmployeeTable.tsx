import { Employee } from '../../types/employee';

interface EmployeeTableProps {
  employees: Employee[];
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Job Title</th>
          <th>Country</th>
          <th>Salary</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
