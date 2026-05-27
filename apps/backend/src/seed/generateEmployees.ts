type GenerateEmployeesParams = {
  count: number;
  firstNames: string[];
  lastNames: string[];
};

const COUNTRIES = ['India'];

const JOB_TITLES = [
  'Software Engineer',
  'Senior Software Engineer',
  'Engineering Manager',
  'Product Manager',
  'HR Manager',
  'Data Analyst',
  'QA Engineer',
];

const salaryBands: Record<string, [number, number]> = {
  Intern: [200000, 500000],
  'HR Manager': [800000, 1500000],
  'Data Analyst': [600000, 1400000],
  'Software Engineer': [1000000, 2500000],
  'Senior Software Engineer': [1800000, 4000000],
  'Engineering Manager': [2500000, 6000000],
  'Product Manager': [1800000, 4500000],
  Designer: [700000, 1800000],
  'Backend Engineer': [1200000, 3000000],
  'Frontend Engineer': [1000000, 2800000],
  'DevOps Engineer': [1500000, 3500000],
};

const DEPARTMENTS = ['Engineering', 'Product', 'HR', 'Operations', 'Finance'];

const EMPLOYMENT_TYPES = ['FULL_TIME', 'CONTRACT', 'INTERN'] as const;

const STATUSES = ['ACTIVE', 'INACTIVE'] as const;

function deterministicPick<T>(items: readonly T[], index: number): T {
  return items[index % items.length];
}

function deterministicSalary(jobTitle: string, index: number): number {
  const [minSalary, maxSalary] = salaryBands[jobTitle] ?? [500000, 1500000];

  const spread = maxSalary - minSalary;

  return minSalary + (index % spread);
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
    const jobTitle = deterministicPick(JOB_TITLES, index);

    return {
      employeeId: `EMP${String(index + 1).padStart(6, '0')}`,
      fullName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${index}@example.com`,
      jobTitle,
      department: deterministicPick(DEPARTMENTS, index),
      country: deterministicPick(COUNTRIES, index),
      salary: deterministicSalary(jobTitle, index),
      currency: 'INR',
      employmentType: deterministicPick(EMPLOYMENT_TYPES, index),
      dateOfJoining: deterministicJoinDate(index),
      managerName: `Manager ${index % 50}`,
      status: deterministicPick(STATUSES, index),
    };
  });
}
