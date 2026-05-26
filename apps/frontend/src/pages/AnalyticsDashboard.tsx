import { useEffect, useState } from 'react';
import { fetchCountryInsights, fetchJobTitleInsights } from '../api/client';

interface CountryInsights {
  minSalary: number;
  maxSalary: number;
  avgSalary: number;
  employeeCount: number;
  medianSalary: number;
}

interface JobTitleInsights {
  country: string;
  jobTitle: string;
  avgSalary: number;
}

export function AnalyticsDashboard() {
  const [country] = useState('India');
  const [jobTitle, setJobTitle] = useState('');

  const [countryInsights, setCountryInsights] =
    useState<CountryInsights | null>(null);

  const [jobTitleInsights, setJobTitleInsights] =
    useState<JobTitleInsights | null>(null);

  async function loadCountryInsights() {
    const result = await fetchCountryInsights(country);
    setCountryInsights(result);
  }

  async function loadJobTitleInsights() {
    if (!jobTitle.trim()) {
      return;
    }

    const result = await fetchJobTitleInsights(country, jobTitle);

    setJobTitleInsights(result);
  }

  useEffect(() => {
    loadCountryInsights();
  }, []);

  return (
    <div>
      <h1>Salary Insights</h1>

      <div>
        <label htmlFor="jobTitle">Job Title</label>
        <input
          id="jobTitle"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
        />

        <button onClick={loadJobTitleInsights}>Load Insights</button>
      </div>

      {countryInsights && (
        <div>
          <p>{countryInsights.minSalary}</p>
          <p>{countryInsights.maxSalary}</p>
          <p>{countryInsights.avgSalary}</p>
          <p>{countryInsights.employeeCount}</p>
          <p>{countryInsights.medianSalary}</p>
        </div>
      )}

      {jobTitleInsights && (
        <div>
          <p>{jobTitleInsights.avgSalary}</p>
        </div>
      )}
    </div>
  );
}
