import { runSeed } from '../seed/runSeed';

describe('runSeed', () => {
  const mockDb = {
    employee: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('clears existing employees before seeding', async () => {
    mockDb.employee.deleteMany.mockResolvedValue({});

    await runSeed({
      db: mockDb as any,
      firstNames: ['John'],
      lastNames: ['Smith'],
      count: 100,
    });

    expect(mockDb.employee.deleteMany).toHaveBeenCalled();
  });

  it('inserts employees in batches', async () => {
    mockDb.employee.deleteMany.mockResolvedValue({});
    mockDb.employee.createMany.mockResolvedValue({ count: 1000 });

    await runSeed({
      db: mockDb as any,
      firstNames: ['John'],
      lastNames: ['Smith'],
      count: 2500,
      batchSize: 1000,
    });

    expect(mockDb.employee.createMany).toHaveBeenCalledTimes(3);
  });

  it('uses createMany for performance', async () => {
    mockDb.employee.deleteMany.mockResolvedValue({});
    mockDb.employee.createMany.mockResolvedValue({ count: 100 });

    await runSeed({
      db: mockDb as any,
      firstNames: ['John'],
      lastNames: ['Smith'],
      count: 100,
    });

    expect(mockDb.employee.createMany).toHaveBeenCalled();
  });
});
