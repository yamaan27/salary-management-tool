import { CreateEmployeeInput } from '@salary/shared';
import {
  Employee,
  EmployeesRepository,
} from '../repositories/employees.repository';

interface GetEmployeesParams {
  page: number;
  limit: number;
  search?: string;
  country?: string;
}

export class EmployeesService {
  constructor(private readonly repository: EmployeesRepository) {}

  async createEmployee(payload: CreateEmployeeInput): Promise<Employee> {
    const employeeId = this.generateEmployeeId();

    return this.repository.create({
      ...payload,
      employeeId,
    });
  }

  async getEmployees(params: GetEmployeesParams) {
    return this.repository.findAll(params);
  }

  async getEmployeeById(id: string): Promise<Employee | null> {
    return this.repository.findById(id);
  }

  async updateEmployee(
    id: string,
    payload: Partial<CreateEmployeeInput>,
  ): Promise<Employee> {
    return this.repository.update(id, payload);
  }

  async deleteEmployee(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  private generateEmployeeId(): string {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `EMP${random}`;
  }
}
