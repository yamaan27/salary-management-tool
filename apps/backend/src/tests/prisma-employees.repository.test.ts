import { PrismaEmployeesRepository } from '../repositories/prisma-employees.repository';

describe('PrismaEmployeesRepository', () => {
  const mockDb = {
    employee: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  let repository: PrismaEmployeesRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new PrismaEmployeesRepository(mockDb as any);
  });

  const employeePayload = {
    employeeId: 'EMP001',
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
    mockDb.employee.create.mockResolvedValue({
      id: '1',
      ...employeePayload,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await repository.create(employeePayload);

    expect(mockDb.employee.create).toHaveBeenCalled();
    expect(result.id).toBe('1');
  });

  it('returns paginated employees', async () => {
    mockDb.employee.findMany.mockResolvedValue([]);
    mockDb.employee.count.mockResolvedValue(0);

    const result = await repository.findAll({
      page: 1,
      limit: 20,
    });

    expect(mockDb.employee.findMany).toHaveBeenCalled();
    expect(mockDb.employee.count).toHaveBeenCalled();
    expect(result.total).toBe(0);
  });

  it('finds employee by id', async () => {
    mockDb.employee.findUnique.mockResolvedValue({
      id: '1',
      ...employeePayload,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await repository.findById('1');

    expect(mockDb.employee.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });

    expect(result?.id).toBe('1');
  });

  it('updates an employee', async () => {
    mockDb.employee.update.mockResolvedValue({
      id: '1',
      ...employeePayload,
      salary: 1500000,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await repository.update('1', {
      salary: 1500000,
    });

    expect(mockDb.employee.update).toHaveBeenCalled();
    expect(result.salary).toBe(1500000);
  });

  it('deletes an employee', async () => {
    mockDb.employee.delete.mockResolvedValue({});

    await repository.delete('1');

    expect(mockDb.employee.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });
});
