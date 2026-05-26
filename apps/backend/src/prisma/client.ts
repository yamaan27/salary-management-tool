import { PrismaClient } from '@prisma/client';

let prismaInstance: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      adapter: undefined as any,
    });
  }

  return prismaInstance;
}
