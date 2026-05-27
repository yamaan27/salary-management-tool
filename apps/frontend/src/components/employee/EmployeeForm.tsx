import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { employeeFormSchema } from './employeeForm.schema';

type EmployeeFormValues = z.input<typeof employeeFormSchema>;

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormValues) => void;
  initialValues?: Partial<EmployeeFormValues>;
}

function InputField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      {children}

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
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

  const inputStyles =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-slate-900 focus:bg-white';

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="grid gap-8">
      {/* Personal */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <p className="text-sm text-slate-500">
            Employee identity and contact details
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InputField label="Full Name" error={errors.fullName?.message}>
            <input
              {...register('fullName')}
              className={inputStyles}
              placeholder="John Doe"
            />
          </InputField>

          <InputField label="Email" error={errors.email?.message}>
            <input
              {...register('email')}
              className={inputStyles}
              placeholder="john@example.com"
            />
          </InputField>

          <InputField label="Country" error={errors.country?.message}>
            <input
              {...register('country')}
              className={inputStyles}
              placeholder="India"
            />
          </InputField>
        </div>
      </div>

      {/* Employment */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Employment Details</h3>
          <p className="text-sm text-slate-500">Role, department, and status</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InputField label="Job Title">
            <input
              {...register('jobTitle')}
              className={inputStyles}
              placeholder="Software Engineer"
            />
          </InputField>

          <InputField label="Department">
            <input
              {...register('department')}
              className={inputStyles}
              placeholder="Engineering"
            />
          </InputField>

          <InputField label="Employment Type">
            <select {...register('employmentType')} className={inputStyles}>
              <option value="">Select employment type</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERN">Intern</option>
            </select>
          </InputField>

          <InputField label="Status">
            <select {...register('status')} className={inputStyles}>
              <option value="">Select status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </InputField>

          <InputField label="Date of Joining">
            <input
              type="date"
              {...register('dateOfJoining')}
              className={inputStyles}
            />
          </InputField>
        </div>
      </div>

      {/* Compensation */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Compensation</h3>
          <p className="text-sm text-slate-500">
            Salary and compensation metadata
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <InputField label="Salary" error={errors.salary?.message as string}>
            <input
              type="number"
              {...register('salary')}
              className={inputStyles}
              placeholder="1200000"
            />
          </InputField>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          className="rounded-2xl bg-slate-900 px-8 py-3 font-medium text-white shadow-md transition hover:opacity-90"
        >
          Save Employee
        </button>
      </div>
    </form>
  );
}
