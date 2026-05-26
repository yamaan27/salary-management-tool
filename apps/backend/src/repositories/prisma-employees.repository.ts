import { prisma } from '../prisma/client';

export class PrismaEmployeesRepository {
  constructor(private readonly db = prisma) {}
}
