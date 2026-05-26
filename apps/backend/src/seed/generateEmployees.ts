type GenerateEmployeesParams = {
  count: number;
  firstNames: string[];
  lastNames: string[];
};

const COUNTRIES = ['India', 'United States', 'Germany', 'Canada', 'Singapore'];

const JOB_TITLES = [
  'Software Engineer',
  'Senior Software Engineer',
  'Engineering Manager',
  'Product Manager',
  'HR Manager',
  'Data Analyst',
  'QA Engineer',
];

const DEPARTMENTS = ['Engineering', 'Product', 'HR', 'Operations', 'Finance'];

const EMPLOYMENT_TYPES = ['FULL_TIME', 'CONTRACT', 'INTERN'] as const;

const STATUSES = ['ACTIVE', 'INACTIVE'] as const;

function deterministicPick<T>(items: readonly T[], index: number): T {
  return items[index % items.length];
}

function deterministicSalary(index: number): number {
  return 500000 + (index % 25) * 100000;
}

function deterministicJoinDate(index: number): Date {
  const year = 2020 + (index % 5);
  const month = index % 12;
  const day = (index % 28) + 1;

  return new Date(year, month, day);
}

export function generateEmployees({
  count,
  firstNames,
  lastNames,
}: GenerateEmployeesParams) {
  return Array.from({ length: count }, (_, index) => {
    const firstName = deterministicPick(firstNames, index);
    const lastName = deterministicPick(lastNames, index * 7);

    return {
      employeeId: `EMP${String(index + 1).padStart(6, '0')}`,
      fullName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${index}@example.com`,
      jobTitle: deterministicPick(JOB_TITLES, index),
      department: deterministicPick(DEPARTMENTS, index),
      country: deterministicPick(COUNTRIES, index),
      salary: deterministicSalary(index),
      currency: 'INR',
      employmentType: deterministicPick(EMPLOYMENT_TYPES, index),
      dateOfJoining: deterministicJoinDate(index),
      managerName: `Manager ${index % 50}`,
      status: deterministicPick(STATUSES, index),
    };
  });
}
