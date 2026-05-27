import { NavLink, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <aside
        style={{
          width: '240px',
          padding: '24px',
          borderRight: '1px solid #ddd',
          background: '#f8f9fa',
        }}
      >
        <h2>Salary Manager</h2>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '24px',
          }}
        >
          <NavLink to="/employees">Employees</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: '32px',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
