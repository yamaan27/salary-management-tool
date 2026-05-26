import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

export async function fetchEmployees() {
  const response = await axios.get(`${API_BASE_URL}/employees`);

  return response.data;
}

export async function createEmployee(payload: unknown) {
  const response = await axios.post(`${API_BASE_URL}/employees`, payload);

  return response.data;
}

export async function updateEmployee(id: string, payload: unknown) {
  const response = await axios.patch(
    `${API_BASE_URL}/employees/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteEmployee(id: string) {
  await axios.delete(`${API_BASE_URL}/employees/${id}`);
}

export async function fetchCountryInsights(country: string) {
  const response = await axios.get(
    `${API_BASE_URL}/analytics/country/${country}`,
  );

  return response.data;
}

export async function fetchJobTitleInsights(country: string, jobTitle: string) {
  const response = await axios.get(`${API_BASE_URL}/analytics/job-title`, {
    params: {
      country,
      jobTitle,
    },
  });

  return response.data;
}
