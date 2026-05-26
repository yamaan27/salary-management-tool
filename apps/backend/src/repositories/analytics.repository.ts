export interface CountrySalaryStats {
  minSalary: number;
  maxSalary: number;
  avgSalary: number;
  employeeCount: number;
  salaries: number[];
}

export interface AnalyticsRepository {
  getCountrySalaryStats(country: string): Promise<CountrySalaryStats>;

  getAverageSalaryByJobTitle(params: {
    country: string;
    jobTitle: string;
  }): Promise<number>;
}
