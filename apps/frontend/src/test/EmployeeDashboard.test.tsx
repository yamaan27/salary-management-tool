import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmployeeDashboard } from '../pages/EmployeeDashboard';
import * as api from '../api/client';

vi.mock('../api/client');

describe('EmployeeDashboard', () => {
  const mockedApi = vi.mocked(api);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads and renders employees', async () => {
    mockedApi.fetchEmployees.mockResolvedValue({
      data: [
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
      ],
      total: 1,
    });

    render(<EmployeeDashboard />);

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });

it('creates a new employee', async () => {
  const user = userEvent.setup();

  mockedApi.fetchEmployees.mockResolvedValue({
    data: [],
    total: 0,
  });

  mockedApi.createEmployee.mockResolvedValue({
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
  });

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
});
