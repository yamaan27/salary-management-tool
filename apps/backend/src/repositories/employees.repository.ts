import {
  CreateEmployeeInput,
  EmploymentType,
  EmployeeStatus,
} from '@salary/shared';

export interface Employee {
  id: string;
  employeeId: string;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeesRepository {
  create(
    employee: CreateEmployeeInput & {
      employeeId: string;
    },
  ): Promise<Employee>;

  findAll(params: {
    page: number;
    limit: number;
    search?: string;
    country?: string;
  }): Promise<{
    data: Employee[];
    total: number;
  }>;

  findById(id: string): Promise<Employee | null>;

  update(id: string, payload: Partial<CreateEmployeeInput>): Promise<Employee>;

  delete(id: string): Promise<void>;
}
