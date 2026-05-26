import { render, screen } from '@testing-library/react';
import { EmployeeTable } from '../components/employee/EmployeeTable';

describe('EmployeeTable', () => {
  const employees = [
    {
      id: '1',
      employeeId: 'EMP001',
      fullName: 'John Doe',
      email: 'john@example.com',
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      country: 'India',
      salary: 1200000,
      currency: 'INR',
      employmentType: 'FULL_TIME',
      dateOfJoining: '2024-01-01',
      status: 'ACTIVE',
    },
  ];

  it('renders employee data', () => {
    render(<EmployeeTable employees={employees} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('India')).toBeInTheDocument();
  });
});
