import { z } from 'zod';

export const employeeFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  jobTitle: z.string().min(1, 'Job title is required'),
  department: z.string().min(1, 'Department is required'),
  country: z.string().min(1, 'Country is required'),
  salary: z.coerce.number().positive('Salary must be greater than zero'),
  employmentType: z.string().min(1),
  status: z.string().min(1),
  dateOfJoining: z.string().min(1, 'Date of joining is required'),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
