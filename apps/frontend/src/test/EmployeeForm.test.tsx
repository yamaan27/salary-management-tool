import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmployeeForm } from '../components/employee/EmployeeForm';

describe('EmployeeForm', () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all required fields', () => {
    render(<EmployeeForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/salary/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty submission', async () => {
    const user = userEvent.setup();

    render(<EmployeeForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(
      await screen.findByText(/full name is required/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it('submits valid employee payload', async () => {
    const user = userEvent.setup();

    render(<EmployeeForm onSubmit={onSubmit} />);

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

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: 'John Doe',
        email: 'john@example.com',
        country: 'India',
        salary: 1200000,
      }),
    );
  });
});
