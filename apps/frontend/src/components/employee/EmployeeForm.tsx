import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeFormSchema, EmployeeFormValues } from './employeeForm.schema';

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormValues) => void;
  initialValues?: Partial<EmployeeFormValues>;
}

export function EmployeeForm({ onSubmit, initialValues }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues as EmployeeFormValues);
    }
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input id="fullName" {...register('fullName')} />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="jobTitle">Job Title</label>
        <input id="jobTitle" {...register('jobTitle')} />
      </div>

      <div>
        <label htmlFor="department">Department</label>
        <input id="department" {...register('department')} />
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input id="country" {...register('country')} />
      </div>

      <div>
        <label htmlFor="salary">Salary</label>
        <input id="salary" type="number" {...register('salary')} />
      </div>

      <div>
        <label htmlFor="employmentType">Employment Type</label>
        <select id="employmentType" {...register('employmentType')}>
          <option value="">Select</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERN">Intern</option>
        </select>
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select id="status" {...register('status')}>
          <option value="">Select</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div>
        <label htmlFor="dateOfJoining">Date of Joining</label>
        <input id="dateOfJoining" type="date" {...register('dateOfJoining')} />
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
