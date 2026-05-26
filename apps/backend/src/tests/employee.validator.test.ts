import { validateCreateEmployee } from '../validators/employee.validator';

describe('validateCreateEmployee', () => {
  const validPayload = {
    fullName: 'John Doe',
    email: 'john@example.com',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    country: 'India',
    salary: 1200000,
    currency: 'INR',
    employmentType: 'FULL_TIME',
    dateOfJoining: '2024-01-01',
    managerName: 'Jane Smith',
    status: 'ACTIVE',
  };

  it('accepts a valid employee payload', () => {
    expect(() => validateCreateEmployee(validPayload)).not.toThrow();
  });

  it('rejects missing full name', () => {
    expect(() =>
      validateCreateEmployee({
        ...validPayload,
        fullName: '',
      }),
    ).toThrow();
  });

  it('rejects invalid email', () => {
    expect(() =>
      validateCreateEmployee({
        ...validPayload,
        email: 'not-an-email',
      }),
    ).toThrow();
  });

  it('rejects negative salary', () => {
    expect(() =>
      validateCreateEmployee({
        ...validPayload,
        salary: -1000,
      }),
    ).toThrow();
  });

  it('rejects invalid employment type', () => {
    expect(() =>
      validateCreateEmployee({
        ...validPayload,
        employmentType: 'FREELANCER',
      }),
    ).toThrow();
  });

  it('rejects invalid status', () => {
    expect(() =>
      validateCreateEmployee({
        ...validPayload,
        status: 'PENDING',
      }),
    ).toThrow();
  });
});
