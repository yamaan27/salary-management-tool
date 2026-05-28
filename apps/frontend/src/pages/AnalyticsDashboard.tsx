import { useEffect, useState } from 'react';
import {
  fetchJobTitleInsights,
  fetchEmployees,
} from '../api/client';
import { toast } from 'sonner';

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

const COUNTRIES = ['India', 'United States', 'Germany', 'Canada', 'Singapore'];

export function AnalyticsDashboard() {
const [country, setCountry] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobTitles, setJobTitles] = useState<string[]>([]);

  const [countryInsights, setCountryInsights] =
    useState<CountryInsights | null>(null);

  const [jobTitleInsights, setJobTitleInsights] =
    useState<JobTitleInsights | null>(null);

  async function loadCountryInsights() {
    const endpoint = country
      ? `http://localhost:4000/api/analytics/country/${country}`
      : `http://localhost:4000/api/analytics/country`;

    const response = await fetch(endpoint);

    const result = await response.json();

    setCountryInsights(result);
  }

  async function loadJobTitles() {
    try {
      const response = await fetchEmployees({
        page: 1,
        limit: 2000,
        search: '',
      });

      const titles = response.data
        .map((employee: { jobTitle: string }) => employee.jobTitle)
        .filter((title: string) => title.length > 0);

      const uniqueTitles = [...new Set<string>(titles)].sort();

      setJobTitles(uniqueTitles);
    } catch {
      toast.error('Failed to load job titles');
    }
  }

  async function loadJobTitleInsights() {
    if (!jobTitle.trim()) {
      toast.error('Enter a job title');
      return;
    }

    try {
      const result = await fetchJobTitleInsights(country, jobTitle);
      setJobTitleInsights(result);
      toast.success('Insights loaded');
    } catch {
      toast.error('Failed to load insights');
    }
  }

  useEffect(() => {
    loadCountryInsights();
  }, [country]);

  useEffect(() => {
    loadJobTitles();
  }, []);

  function formatCurrency(value: number) {
    if (value >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(1)}Cr`;
    }

    if (value >= 100000) {
      return `₹ ${(value / 100000).toFixed(1)}L`;
    }

    return `₹ ${value.toLocaleString('en-IN')}`;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>

        <p className="mt-2 text-slate-500">
          Executive compensation insights across workforce data.
        </p>
      </div>

      {/* Search Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Salary Intelligence</h2>

          <p className="text-sm text-slate-500">
            Analyze compensation benchmarks by job title.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Country
            </label>

            <select
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 shadow-sm outline-none transition focus:border-slate-900 focus:bg-white"
            >
              <option value="">All Countries</option>

              {COUNTRIES.map((countryOption) => (
                <option key={countryOption} value={countryOption}>
                  {countryOption}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="jobTitle"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Job Title
            </label>

            <select
              id="jobTitle"
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 shadow-sm outline-none transition focus:border-slate-900 focus:bg-white"
            >
              <option value="">Select a job title</option>

              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={loadJobTitleInsights}
            className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white shadow-md transition hover:opacity-90"
          >
            Load Insights
          </button>
        </div>
      </div>

      {/* Country KPI Cards */}
      {countryInsights && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {[
            ['Minimum Salary', countryInsights.minSalary],
            ['Maximum Salary', countryInsights.maxSalary],
            ['Average Salary', countryInsights.avgSalary],
            ['Median Salary', countryInsights.medianSalary],
            ['Employee Count', countryInsights.employeeCount],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex min-h-[150px] flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-medium text-slate-500">{label}</p>

              <h2 className="mt-3 whitespace-nowrap text-2xl font-bold tracking-tight xl:text-3xl">
                {typeof value === 'number' && label !== 'Employee Count'
                  ? formatCurrency(value)
                  : Number(value).toLocaleString('en-IN')}
              </h2>
            </div>
          ))}
        </div>
      )}

      {/* Job Title Insights */}
      {jobTitleInsights && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-500">
              Compensation Benchmark
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              {jobTitleInsights.jobTitle}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Country</p>
              <p className="mt-2 text-xl font-semibold">
                {jobTitleInsights.country}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Average Salary</p>

              <p className="mt-2 text-xl font-semibold">
                {formatCurrency(jobTitleInsights.avgSalary)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
