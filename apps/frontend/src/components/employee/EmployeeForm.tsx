import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeFormSchema, EmployeeFormValues } from './employeeForm.schema';

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormValues) => void;
}

export function EmployeeForm({ onSubmit }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
  });

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
        {errors.jobTitle && <p>{errors.jobTitle.message}</p>}
      </div>

      <div>
        <label htmlFor="department">Department</label>
        <input id="department" {...register('department')} />
        {errors.department && <p>{errors.department.message}</p>}
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input id="country" {...register('country')} />
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      <div>
        <label htmlFor="salary">Salary</label>
        <input id="salary" type="number" {...register('salary')} />
        {errors.salary && <p>{errors.salary.message}</p>}
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
        {errors.dateOfJoining && <p>{errors.dateOfJoining.message}</p>}
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
