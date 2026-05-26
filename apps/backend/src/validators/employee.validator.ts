import { z } from 'zod';
import {
  EMPLOYEE_STATUSES,
  EMPLOYMENT_TYPES,
  CreateEmployeeInput,
} from '@salary/shared';

const createEmployeeSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().email(),
  jobTitle: z.string().trim().min(1),
  department: z.string().trim().min(1),
  country: z.string().trim().min(1),
  salary: z.number().positive(),
  currency: z.string().trim().min(1),
  employmentType: z.enum(EMPLOYMENT_TYPES),
  dateOfJoining: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  managerName: z.string().trim().optional(),
  status: z.enum(EMPLOYEE_STATUSES),
});

export function validateCreateEmployee(payload: unknown): CreateEmployeeInput {
  return createEmployeeSchema.parse(payload);
}
