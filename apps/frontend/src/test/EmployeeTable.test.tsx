import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    render(
      <EmployeeTable
        employees={employees}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('India')).toBeInTheDocument();
  });

  it('calls edit handler', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <EmployeeTable
        employees={employees}
        onEdit={onEdit}
        onDelete={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: /edit/i }));

    expect(onEdit).toHaveBeenCalledWith(employees[0]);
  });

  it('calls delete handler', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <EmployeeTable
        employees={employees}
        onEdit={vi.fn()}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
