import { generateEmployees } from './generateEmployees';

type SeedEmployee = ReturnType<typeof generateEmployees>[number];

type SeedDb = {
  employee: {
    deleteMany(): Promise<unknown>;
    createMany(args: { data: SeedEmployee[] }): Promise<unknown>;
  };
};

type RunSeedParams = {
  db: SeedDb;
  firstNames: string[];
  lastNames: string[];
  count: number;
  batchSize?: number;
};

function chunkArray<T>(items: T[], batchSize: number): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    chunks.push(items.slice(i, i + batchSize));
  }

  return chunks;
}

export async function runSeed({
  db,
  firstNames,
  lastNames,
  count,
  batchSize = 1000,
}: RunSeedParams) {
  await db.employee.deleteMany();

  const employees = generateEmployees({
    count,
    firstNames,
    lastNames,
  });

  const batches = chunkArray(employees, batchSize);

  for (const batch of batches) {
    await db.employee.createMany({
      data: batch,
    });
  }
}
