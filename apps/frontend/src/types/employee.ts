export interface Employee {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  currency: string;
  employmentType: string;
  dateOfJoining: string;
  managerName?: string;
  status: string;
}
