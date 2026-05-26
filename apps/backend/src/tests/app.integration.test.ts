import request from 'supertest';
import { createApp } from '../app';

describe('Backend application', () => {
  const mockEmployeeService = {
    createEmployee: jest.fn(),
    getEmployees: jest.fn(),
    getEmployeeById: jest.fn(),
    updateEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
  };

  const mockAnalyticsService = {
    getCountryInsights: jest.fn(),
    getAverageSalaryByJobTitle: jest.fn(),
  };

  const app = createApp({
    employeeService: mockEmployeeService as any,
    analyticsService: mockAnalyticsService as any,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /health returns health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
    });
  });

  it('employee routes are wired', async () => {
    mockEmployeeService.getEmployees.mockResolvedValue({
      data: [],
      total: 0,
    });

    const response = await request(app).get('/api/employees');

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(0);
  });

  it('analytics routes are wired', async () => {
    mockAnalyticsService.getCountryInsights.mockResolvedValue({
      minSalary: 500000,
      maxSalary: 3000000,
      avgSalary: 1500000,
      employeeCount: 4,
      medianSalary: 1250000,
    });

    const response = await request(app).get('/api/analytics/country/India');

    expect(response.status).toBe(200);
    expect(response.body.avgSalary).toBe(1500000);
  });
});
