import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnalyticsDashboard } from '../pages/AnalyticsDashboard';
import * as api from '../api/client';

vi.mock('../api/client');

describe('AnalyticsDashboard', () => {
  const mockedApi = vi.mocked(api);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads country salary insights', async () => {
    mockedApi.fetchCountryInsights.mockResolvedValue({
      minSalary: 500000,
      maxSalary: 3000000,
      avgSalary: 1500000,
      employeeCount: 42,
      medianSalary: 1250000,
    });

    mockedApi.fetchJobTitleInsights.mockResolvedValue({
      country: 'India',
      jobTitle: 'Software Engineer',
      avgSalary: 1800000,
    });

    render(<AnalyticsDashboard />);

    expect(await screen.findByText('1500000')).toBeInTheDocument();
    expect(screen.getByText('3000000')).toBeInTheDocument();
    expect(screen.getByText('1250000')).toBeInTheDocument();
  });

  it('loads job title salary insights', async () => {
    const user = userEvent.setup();

    mockedApi.fetchCountryInsights.mockResolvedValue({
      minSalary: 500000,
      maxSalary: 3000000,
      avgSalary: 1500000,
      employeeCount: 42,
      medianSalary: 1250000,
    });

    mockedApi.fetchJobTitleInsights.mockResolvedValue({
      country: 'India',
      jobTitle: 'Software Engineer',
      avgSalary: 1800000,
    });

    render(<AnalyticsDashboard />);

    await user.type(
      await screen.findByLabelText(/job title/i),
      'Software Engineer',
    );

    await user.click(
      screen.getByRole('button', {
        name: /load insights/i,
      }),
    );

    await waitFor(() => {
      expect(mockedApi.fetchJobTitleInsights).toHaveBeenCalledWith(
        'India',
        'Software Engineer',
      );
    });

    expect(screen.getByText('1800000')).toBeInTheDocument();
  });
});
