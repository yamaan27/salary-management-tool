import { AnalyticsRepository } from '../repositories/analytics.repository';

interface AverageSalaryByJobTitleParams {
  country: string;
  jobTitle: string;
}

export class AnalyticsService {
  constructor(private readonly repository: AnalyticsRepository) {}

  async getCountryInsights(country: string) {
    const stats = await this.repository.getCountrySalaryStats(country);

    return {
      minSalary: stats.minSalary,
      maxSalary: stats.maxSalary,
      avgSalary: stats.avgSalary,
      employeeCount: stats.employeeCount,
      medianSalary: this.calculateMedian(stats.salaries),
    };
  }

  async getAverageSalaryByJobTitle(params: AverageSalaryByJobTitleParams) {
    const avgSalary = await this.repository.getAverageSalaryByJobTitle(params);

    return {
      country: params.country,
      jobTitle: params.jobTitle,
      avgSalary,
    };
  }

  private calculateMedian(salaries: number[]): number {
    if (salaries.length === 0) {
      return 0;
    }

    const sorted = [...salaries].sort((a, b) => a - b);

    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  }
}
