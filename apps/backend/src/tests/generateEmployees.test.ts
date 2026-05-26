import { generateEmployees } from '../seed/generateEmployees';

describe('generateEmployees', () => {
  const firstNames = ['John', 'Jane'];
  const lastNames = ['Smith', 'Patel'];

  it('generates requested employee count', () => {
    const employees = generateEmployees({
      count: 100,
      firstNames,
      lastNames,
    });

    expect(employees).toHaveLength(100);
  });

  it('generates full names from first and last names', () => {
    const employees = generateEmployees({
      count: 10,
      firstNames,
      lastNames,
    });

    expect(
      employees.some((employee) => employee.fullName.includes('John')),
    ).toBe(true);

    expect(
      employees.some((employee) => employee.fullName.includes('Smith')),
    ).toBe(true);
  });

  it('generates unique emails', () => {
    const employees = generateEmployees({
      count: 100,
      firstNames,
      lastNames,
    });

    const emails = employees.map((e) => e.email);
    const uniqueEmails = new Set(emails);

    expect(uniqueEmails.size).toBe(100);
  });

  it('assigns positive salaries', () => {
    const employees = generateEmployees({
      count: 50,
      firstNames,
      lastNames,
    });

    expect(employees.every((employee) => employee.salary > 0)).toBe(true);
  });
});
