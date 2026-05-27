import { CreateEmployeeInput } from '@salary/shared';
import { getPrismaClient } from '../prisma/client';
import { Employee, EmployeesRepository } from './employees.repository';

interface PrismaDb {
  employee: {
    create: (args: any) => Promise<any>;
    findMany: (args: any) => Promise<any[]>;
    count: (args?: any) => Promise<number>;
    findUnique: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
}

export class PrismaEmployeesRepository implements EmployeesRepository {
  constructor(
    private readonly db: PrismaDb = getPrismaClient() as unknown as PrismaDb,
  ) {}

  async create(
    employee: CreateEmployeeInput & { employeeId: string },
  ): Promise<Employee> {
    const created = await this.db.employee.create({
      data: {
        ...employee,
        currency: 'INR',
        dateOfJoining: new Date(employee.dateOfJoining),
      },
    });

    return this.mapEmployee(created);
  }

  async findAll(params: {
    page: number;
    limit: number;
    search?: string;
    country?: string;
  }): Promise<{ data: Employee[]; total: number }> {
    const { page, limit, search, country } = params;

    const where: any = {};

    if (search) {
      where.OR = [
        {
          fullName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          jobTitle: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (country) {
      where.country = country;
    }

    const [employees, total] = await Promise.all([
      this.db.employee.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.db.employee.count({ where }),
    ]);

    return {
      data: employees.map((employee) => this.mapEmployee(employee)),
      total,
    };
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = await this.db.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      return null;
    }

    return this.mapEmployee(employee);
  }

  async update(
    id: string,
    payload: Partial<CreateEmployeeInput>,
  ): Promise<Employee> {
    const updated = await this.db.employee.update({
      where: { id },
      data: payload.dateOfJoining
        ? {
            ...payload,
            dateOfJoining: new Date(payload.dateOfJoining),
          }
        : payload,
    });

    return this.mapEmployee(updated);
  }

  async delete(id: string): Promise<void> {
    await this.db.employee.delete({
      where: { id },
    });
  }

  private mapEmployee(employee: any): Employee {
    return {
      ...employee,
      dateOfJoining:
        employee.dateOfJoining instanceof Date
          ? employee.dateOfJoining.toISOString().split('T')[0]
          : employee.dateOfJoining,
    };
  }
}
