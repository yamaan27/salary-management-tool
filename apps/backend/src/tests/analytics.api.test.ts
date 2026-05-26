import request from 'supertest';
import express from 'express';
import { registerAnalyticsRoutes } from '../routes/analytics.routes';

describe('Analytics API', () => {
  const mockService = {
    getCountryInsights: jest.fn(),
    getAverageSalaryByJobTitle: jest.fn(),
  };

  const app = express();

  beforeAll(() => {
    app.use(express.json());
    registerAnalyticsRoutes(app, mockService as any);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/analytics/country/:country returns salary insights', async () => {
    mockService.getCountryInsights.mockResolvedValue({
      minSalary: 500000,
      maxSalary: 3000000,
      avgSalary: 1500000,
      employeeCount: 4,
      medianSalary: 1250000,
    });

    const response = await request(app).get('/api/analytics/country/India');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      minSalary: 500000,
      maxSalary: 3000000,
      avgSalary: 1500000,
      employeeCount: 4,
      medianSalary: 1250000,
    });
  });

  it('GET /api/analytics/job-title returns average salary by role', async () => {
    mockService.getAverageSalaryByJobTitle.mockResolvedValue({
      country: 'India',
      jobTitle: 'Software Engineer',
      avgSalary: 1800000,
    });

    const response = await request(app).get(
      '/api/analytics/job-title?country=India&jobTitle=Software Engineer',
    );

    expect(response.status).toBe(200);
    expect(response.body.avgSalary).toBe(1800000);
  });
});
