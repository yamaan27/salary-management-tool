import axios from 'axios';
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  fetchCountryInsights,
  fetchJobTitleInsights,
} from '../api/client';

vi.mock('axios');

const mockedAxios = vi.mocked(axios);

describe('API client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches employees', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        data: [],
        total: 0,
      },
    });

    const result = await fetchEmployees();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:4000/api/employees',
    );

    expect(result.total).toBe(0);
  });

  it('creates employee', async () => {
    const payload = {
      fullName: 'John Doe',
      email: 'john@example.com',
    };

    mockedAxios.post.mockResolvedValue({
      data: {
        id: '1',
        ...payload,
      },
    });

    const result = await createEmployee(payload);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:4000/api/employees',
      payload,
    );

    expect(result.id).toBe('1');
  });

  it('updates employee', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: {
        id: '1',
        salary: 1500000,
      },
    });

    const result = await updateEmployee('1', {
      salary: 1500000,
    });

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      'http://localhost:4000/api/employees/1',
      {
        salary: 1500000,
      },
    );

    expect(result.salary).toBe(1500000);
  });

  it('deletes employee', async () => {
    mockedAxios.delete.mockResolvedValue({});

    await deleteEmployee('1');

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      'http://localhost:4000/api/employees/1',
    );
  });

  it('fetches country insights', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        avgSalary: 1500000,
      },
    });

    const result = await fetchCountryInsights('India');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:4000/api/analytics/country/India',
    );

    expect(result.avgSalary).toBe(1500000);
  });

  it('fetches job title insights', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        avgSalary: 1800000,
      },
    });

    const result = await fetchJobTitleInsights('India', 'Software Engineer');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:4000/api/analytics/job-title',
      {
        params: {
          country: 'India',
          jobTitle: 'Software Engineer',
        },
      },
    );

    expect(result.avgSalary).toBe(1800000);
  });
});
