import dotenv from 'dotenv';
import { createApp } from './app';
import { EmployeesService } from './services/employees.service';
import { AnalyticsService } from './services/analytics.service';
import { PrismaEmployeesRepository } from './repositories/prisma-employees.repository';
import { PrismaAnalyticsRepository } from './repositories/prisma-analytics.repository';

dotenv.config();

const employeeRepository = new PrismaEmployeesRepository();
const analyticsRepository = new PrismaAnalyticsRepository();

const employeeService = new EmployeesService(employeeRepository);
const analyticsService = new AnalyticsService(analyticsRepository);

const app = createApp({
  employeeService,
  analyticsService,
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
