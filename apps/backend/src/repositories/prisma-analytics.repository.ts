import { getPrismaClient } from '../prisma/client';
import {
  AnalyticsRepository,
  CountrySalaryStats,
} from './analytics.repository';

interface PrismaDb {
  employee: {
    aggregate: (args: any) => Promise<any>;
    findMany: (args: any) => Promise<any[]>;
  };
}

export class PrismaAnalyticsRepository implements AnalyticsRepository {
  constructor(
    private readonly db: PrismaDb = getPrismaClient() as unknown as PrismaDb,
  ) {}

  async getCountrySalaryStats(country: string): Promise<CountrySalaryStats> {
    const [aggregates, salaries] = await Promise.all([
      this.db.employee.aggregate({
        where: {
          country,
        },
        _min: {
          salary: true,
        },
        _max: {
          salary: true,
        },
        _avg: {
          salary: true,
        },
        _count: {
          id: true,
        },
      }),
      this.db.employee.findMany({
        where: {
          country,
        },
        select: {
          salary: true,
        },
      }),
    ]);

    return {
      minSalary: aggregates._min.salary ?? 0,
      maxSalary: aggregates._max.salary ?? 0,
      avgSalary: aggregates._avg.salary ?? 0,
      employeeCount: aggregates._count.id ?? 0,
      salaries: salaries.map((employee) => employee.salary),
    };
  }

  async getAverageSalaryByJobTitle(params: {
    country: string;
    jobTitle: string;
  }): Promise<number> {
    const result = await this.db.employee.aggregate({
      where: {
        country: params.country,
        jobTitle: params.jobTitle,
      },
      _avg: {
        salary: true,
      },
    });

    return result._avg.salary ?? 0;
  }
}
