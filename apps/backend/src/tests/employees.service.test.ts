import { EmployeesService } from '../services/employees.service';
import { EmployeesRepository } from '../repositories/employees.repository';

describe('EmployeesService', () => {
  let mockRepository: jest.Mocked<EmployeesRepository>;
  let service: EmployeesService;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new EmployeesService(mockRepository);
  });

  const validEmployee = {
    fullName: 'John Doe',
    email: 'john@example.com',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    country: 'India',
    salary: 1200000,
    currency: 'INR',
    employmentType: 'FULL_TIME' as const,
    dateOfJoining: '2024-01-01',
    managerName: 'Jane Smith',
    status: 'ACTIVE' as const,
  };

  it('creates an employee', async () => {
    mockRepository.create.mockResolvedValue({
      id: '1',
      employeeId: 'EMP001',
      ...validEmployee,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.createEmployee(validEmployee);

    expect(mockRepository.create).toHaveBeenCalled();
    expect(result.employeeId).toBe('EMP001');
  });

  it('returns paginated employees', async () => {
    mockRepository.findAll.mockResolvedValue({
      data: [],
      total: 0,
    });

    const result = await service.getEmployees({
      page: 1,
      limit: 20,
    });

    expect(mockRepository.findAll).toHaveBeenCalledWith({
      page: 1,
      limit: 20,
    });

    expect(result.total).toBe(0);
  });

  it('returns employee by id', async () => {
    mockRepository.findById.mockResolvedValue({
      id: '1',
      employeeId: 'EMP001',
      ...validEmployee,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.getEmployeeById('1');

    expect(result?.id).toBe('1');
  });

  it('updates an employee', async () => {
    mockRepository.update.mockResolvedValue({
      id: '1',
      employeeId: 'EMP001',
      ...validEmployee,
      salary: 1500000,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.updateEmployee('1', {
      salary: 1500000,
    });

    expect(result.salary).toBe(1500000);
  });

  it('deletes an employee', async () => {
    mockRepository.delete.mockResolvedValue();

    await service.deleteEmployee('1');

    expect(mockRepository.delete).toHaveBeenCalledWith('1');
  });
});
