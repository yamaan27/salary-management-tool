import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { registerEmployeeRoutes } from './routes/employees.routes';
import { registerAnalyticsRoutes } from './routes/analytics.routes';

interface AppDependencies {
  employeeService: {
    createEmployee(payload: unknown): Promise<unknown>;
    getEmployees(params: {
      page: number;
      limit: number;
      search?: string;
      country?: string;
    }): Promise<unknown>;
    getEmployeeById(id: string): Promise<unknown>;
    updateEmployee(id: string, payload: unknown): Promise<unknown>;
    deleteEmployee(id: string): Promise<void>;
  };

  analyticsService: {
    getCountryInsights(country: string): Promise<unknown>;
    getAverageSalaryByJobTitle(params: {
      country: string;
      jobTitle: string;
    }): Promise<unknown>;
  };
}

export function createApp(dependencies: AppDependencies) {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());

  app.get('/health', (_, res) => {
    res.status(200).json({
      status: 'ok',
    });
  });

  registerEmployeeRoutes(app, dependencies.employeeService);
  registerAnalyticsRoutes(app, dependencies.analyticsService);

  return app;
}
