import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';

describe('App routing', () => {
  it('renders employee dashboard route', async () => {
    render(
      <MemoryRouter initialEntries={['/employees']}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/employee dashboard/i)).toBeInTheDocument();
  });

  it('renders analytics dashboard route', async () => {
    render(
      <MemoryRouter initialEntries={['/analytics']}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/salary insights/i)).toBeInTheDocument();
  });

  it('shows navigation links', async () => {
    render(
      <MemoryRouter initialEntries={['/employees']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole('link', {
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
