import { getPrismaClient } from '../prisma/client';

interface PrismaDb {
  employee: {
    aggregate: (args: any) => Promise<any>;
    findMany: (args: any) => Promise<any[]>;
  };
}

export class PrismaAnalyticsRepository {
  constructor(
    private readonly db: PrismaDb = getPrismaClient() as unknown as PrismaDb,
  ) {}
}
