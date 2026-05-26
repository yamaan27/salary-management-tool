import { AnalyticsService } from '../services/analytics.service';
import { AnalyticsRepository } from '../repositories/analytics.repository';

describe('AnalyticsService', () => {
  let mockRepository: jest.Mocked<AnalyticsRepository>;
  let service: AnalyticsService;

  beforeEach(() => {
    mockRepository = {
      getCountrySalaryStats: jest.fn(),
      getAverageSalaryByJobTitle: jest.fn(),
    };

    service = new AnalyticsService(mockRepository);
  });

  it('returns country salary insights', async () => {
    mockRepository.getCountrySalaryStats.mockResolvedValue({
      minSalary: 500000,
      maxSalary: 3000000,
      avgSalary: 1500000,
      employeeCount: 4,
      salaries: [500000, 1000000, 1500000, 3000000],
    });

    const result = await service.getCountryInsights('India');

    expect(result).toEqual({
      minSalary: 500000,
      maxSalary: 3000000,
      avgSalary: 1500000,
      employeeCount: 4,
      medianSalary: 1250000,
    });
  });

  it('returns average salary by job title and country', async () => {
    mockRepository.getAverageSalaryByJobTitle.mockResolvedValue(1800000);

    const result = await service.getAverageSalaryByJobTitle({
      country: 'India',
      jobTitle: 'Software Engineer',
    });

    expect(result).toEqual({
      country: 'India',
      jobTitle: 'Software Engineer',
      avgSalary: 1800000,
    });
  });

  it('calculates median correctly for odd count', async () => {
    mockRepository.getCountrySalaryStats.mockResolvedValue({
      minSalary: 500000,
      maxSalary: 2500000,
      avgSalary: 1400000,
      employeeCount: 5,
      salaries: [500000, 1000000, 1500000, 2000000, 2500000],
    });

    const result = await service.getCountryInsights('India');

    expect(result.medianSalary).toBe(1500000);
  });

  it('calculates median correctly for even count', async () => {
    mockRepository.getCountrySalaryStats.mockResolvedValue({
      minSalary: 500000,
      maxSalary: 3000000,
      avgSalary: 1500000,
      employeeCount: 4,
      salaries: [500000, 1000000, 1500000, 3000000],
    });

    const result = await service.getCountryInsights('India');

    expect(result.medianSalary).toBe(1250000);
  });
});
