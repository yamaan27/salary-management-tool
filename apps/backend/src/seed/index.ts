import fs from 'node:fs/promises';
import path from 'node:path';
import { getPrismaClient } from '../prisma/client';
import { runSeed } from './runSeed';

async function readNames(fileName: string): Promise<string[]> {
  const filePath = path.join(__dirname, fileName);

  const content = await fs.readFile(filePath, 'utf-8');

  return content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

async function main() {
  const prisma = getPrismaClient();

  const [firstNames, lastNames] = await Promise.all([
    readNames('first_names.txt'),
    readNames('last_names.txt'),
  ]);

  console.time('seed');

  await runSeed({
    db: prisma,
    firstNames,
    lastNames,
    count: 10000,
    batchSize: 1000,
  });

  console.timeEnd('seed');

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);

  const prisma = getPrismaClient();
  await prisma.$disconnect();

  process.exit(1);
});
