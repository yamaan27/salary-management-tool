import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmployeeDashboard } from '../pages/EmployeeDashboard';
import * as api from '../api/client';

vi.mock('../api/client');

describe('EmployeeDashboard', () => {
  const mockedApi = vi.mocked(api);

  const employee = {
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
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockedApi.fetchEmployees.mockResolvedValue({
      data: [employee],
      total: 1,
    });
  });

  it('loads and renders employees', async () => {
    render(<EmployeeDashboard />);

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });

  it('creates a new employee', async () => {
    const user = userEvent.setup();

    mockedApi.fetchEmployees.mockResolvedValueOnce({
      data: [],
      total: 0,
    });

    mockedApi.createEmployee.mockResolvedValue(employee);

    render(<EmployeeDashboard />);

    await screen.findByLabelText(/full name/i);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/job title/i), 'Software Engineer');
    await user.type(screen.getByLabelText(/department/i), 'Engineering');
    await user.type(screen.getByLabelText(/country/i), 'India');
    await user.type(screen.getByLabelText(/salary/i), '1200000');

    await user.selectOptions(
      screen.getByLabelText(/employment type/i),
      'FULL_TIME',
    );

    await user.selectOptions(screen.getByLabelText(/status/i), 'ACTIVE');

    await user.type(screen.getByLabelText(/date of joining/i), '2024-01-01');

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockedApi.createEmployee).toHaveBeenCalled();
    });
  });

  it('deletes an employee', async () => {
    const user = userEvent.setup();

    mockedApi.deleteEmployee.mockResolvedValue(undefined);

    render(<EmployeeDashboard />);

    await screen.findByText('John Doe');

    await user.click(screen.getByRole('button', { name: /delete/i }));

    await waitFor(() => {
      expect(mockedApi.deleteEmployee).toHaveBeenCalledWith('1');
    });
  });

  it('edits an employee', async () => {
    const user = userEvent.setup();

    mockedApi.updateEmployee.mockResolvedValue({
      ...employee,
      salary: 1500000,
    });

    render(<EmployeeDashboard />);

    await screen.findByText('John Doe');

    await user.click(screen.getByRole('button', { name: /edit/i }));

    const salaryInput = screen.getByLabelText(/salary/i);

    await user.clear(salaryInput);
    await user.type(salaryInput, '1500000');

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockedApi.updateEmployee).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({
          salary: 1500000,
        }),
      );
    });
  });

  it('searches employees', async () => {
    const user = userEvent.setup();

    render(<EmployeeDashboard />);

    await screen.findByText('John Doe');

    await user.type(screen.getByPlaceholderText(/search employees/i), 'John');

    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(mockedApi.fetchEmployees).toHaveBeenCalledWith(
        expect.objectContaining({
          search: 'John',
        }),
      );
    });
  });

  it('changes page', async () => {
    const user = userEvent.setup();

    render(<EmployeeDashboard />);

    await screen.findByText('John Doe');

    await user.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(mockedApi.fetchEmployees).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 2,
        }),
      );
    });
  });
});
