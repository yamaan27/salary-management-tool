import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

vi.mock('../pages/EmployeeDashboard', () => ({
  EmployeeDashboard: () => <div>Employee Dashboard</div>,
}));

vi.mock('../pages/AnalyticsDashboard', () => ({
  AnalyticsDashboard: () => <div>Salary Insights</div>,
}));

describe('App routing', () => {
  it('renders employee dashboard route', async () => {
    render(
      <MemoryRouter initialEntries={['/employees']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/employee dashboard/i)).toBeInTheDocument();
  });

  it('renders analytics dashboard route', async () => {
    render(
      <MemoryRouter initialEntries={['/analytics']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/salary insights/i)).toBeInTheDocument();
  });

  it('shows navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/employees']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('link', {
        name: /employees/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /analytics/i,
      }),
    ).toBeInTheDocument();
  });
});
