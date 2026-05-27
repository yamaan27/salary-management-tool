export const EMPLOYMENT_TYPES = ['FULL_TIME', 'CONTRACT', 'INTERN'] as const;

export const EMPLOYEE_STATUSES = ['ACTIVE', 'INACTIVE'] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];
export type EmployeeStatus = (typeof EMPLOYEE_STATUSES)[number];

export interface CreateEmployeeInput {
  fullName: string;
  email: string;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  currency: string;
  employmentType: EmploymentType;
  dateOfJoining: string;
  managerName?: string;
  status: EmployeeStatus;
}
