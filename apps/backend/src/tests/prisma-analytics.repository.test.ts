import { PrismaAnalyticsRepository } from '../repositories/prisma-analytics.repository';

describe('PrismaAnalyticsRepository', () => {
  const mockDb = {
    employee: {
      aggregate: jest.fn(),
      findMany: jest.fn(),
    },
  };

  let repository: PrismaAnalyticsRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new PrismaAnalyticsRepository(mockDb as any);
  });

  it('returns country salary stats', async () => {
    mockDb.employee.aggregate.mockResolvedValue({
      _min: { salary: 500000 },
      _max: { salary: 3000000 },
      _avg: { salary: 1500000 },
      _count: { id: 4 },
    });

    mockDb.employee.findMany.mockResolvedValue([
      { salary: 500000 },
      { salary: 1000000 },
      { salary: 1500000 },
      { salary: 3000000 },
    ]);

    const result = await repository.getCountrySalaryStats('India');

    expect(mockDb.employee.aggregate).toHaveBeenCalledWith({
      where: {
        country: 'India',
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
    });

    expect(result).toEqual({
      minSalary: 500000,
      maxSalary: 3000000,
      avgSalary: 1500000,
      employeeCount: 4,
      salaries: [500000, 1000000, 1500000, 3000000],
    });
  });

  it('returns average salary by job title and country', async () => {
    mockDb.employee.aggregate.mockResolvedValue({
      _avg: {
        salary: 1800000,
      },
    });

    const result = await repository.getAverageSalaryByJobTitle({
      country: 'India',
      jobTitle: 'Software Engineer',
    });

    expect(mockDb.employee.aggregate).toHaveBeenCalledWith({
      where: {
        country: 'India',
        jobTitle: 'Software Engineer',
      },
      _avg: {
        salary: true,
      },
    });

    expect(result).toBe(1800000);
  });
});
