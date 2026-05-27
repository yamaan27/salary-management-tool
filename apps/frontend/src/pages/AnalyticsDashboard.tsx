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

      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          alignItems: 'end',
        }}
      >
        <div style={{ flex: 1 }}>
          <label htmlFor="jobTitle">Job Title</label>

          <input
            id="jobTitle"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={loadJobTitleInsights}
          style={{
            background: '#2563eb',
            color: 'white',
          }}
        >
          Load Insights
        </button>
      </div>

      {countryInsights && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            ['Min Salary', countryInsights.minSalary],
            ['Max Salary', countryInsights.maxSalary],
            ['Average Salary', countryInsights.avgSalary],
            ['Median Salary', countryInsights.medianSalary],
            ['Employees', countryInsights.employeeCount],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <p>{label}</p>
              <h2>{value}</h2>
            </div>
          ))}
        </div>
      )}

      {jobTitleInsights && (
        <div
          style={{
            marginTop: '24px',
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <p>Average salary for {jobTitleInsights.jobTitle}</p>
          <h2>{jobTitleInsights.avgSalary}</h2>
        </div>
      )}
    </div>
  );
}
