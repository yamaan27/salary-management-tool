import request from 'supertest';
import express from 'express';
import { registerEmployeeRoutes } from '../routes/employees.routes';

describe('Employee API', () => {
  const mockService = {
    createEmployee: jest.fn(),
    getEmployees: jest.fn(),
    getEmployeeById: jest.fn(),
    updateEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
  };

  const app = express();

  beforeAll(() => {
    app.use(express.json());
    registerEmployeeRoutes(app, mockService as any);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const employee = {
    id: '1',
    employeeId: 'EMP001',
    fullName: 'John Doe',
    email: 'john@example.com',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    country: 'India',
    salary: 1200000,
    currency: 'INR',
    employmentType: 'FULL_TIME',
    dateOfJoining: '2024-01-01',
    managerName: 'Jane Smith',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('POST /api/employees creates employee', async () => {
    mockService.createEmployee.mockResolvedValue(employee);

    const response = await request(app).post('/api/employees').send({
      fullName: 'John Doe',
      email: 'john@example.com',
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      country: 'India',
      salary: 1200000,
      currency: 'INR',
      employmentType: 'FULL_TIME',
      dateOfJoining: '2024-01-01',
      status: 'ACTIVE',
    });

    expect(response.status).toBe(201);
    expect(response.body.employeeId).toBe('EMP001');
  });

  it('GET /api/employees returns paginated employees', async () => {
    mockService.getEmployees.mockResolvedValue({
      data: [employee],
      total: 1,
    });

    const response = await request(app).get('/api/employees');

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(1);
  });

  it('GET /api/employees/:id returns employee', async () => {
    mockService.getEmployeeById.mockResolvedValue(employee);

    const response = await request(app).get('/api/employees/1');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe('1');
  });

  it('PATCH /api/employees/:id updates employee', async () => {
    mockService.updateEmployee.mockResolvedValue({
      ...employee,
      salary: 1500000,
    });

    const response = await request(app).patch('/api/employees/1').send({
      salary: 1500000,
    });

    expect(response.status).toBe(200);
    expect(response.body.salary).toBe(1500000);
  });

  it('DELETE /api/employees/:id deletes employee', async () => {
    mockService.deleteEmployee.mockResolvedValue(undefined);

    const response = await request(app).delete('/api/employees/1');

    expect(response.status).toBe(204);
  });
});
