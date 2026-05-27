import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeFormSchema } from './employeeForm.schema';
import { z } from 'zod';

type EmployeeFormValues = z.input<typeof employeeFormSchema>;
interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormValues) => void;
  initialValues?: Partial<EmployeeFormValues>;
}

export function EmployeeForm({ onSubmit, initialValues }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues as EmployeeFormValues);
    }
  }, [initialValues, reset]);

const submitHandler: SubmitHandler<EmployeeFormValues> = (data) => {
  onSubmit(data);
  reset();
};

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}
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

      <button
        type="submit"
        style={{
          background: '#16a34a',
          color: 'white',
          alignSelf: 'end',
        }}
      >
        Save
      </button>
    </form>
  );
}
