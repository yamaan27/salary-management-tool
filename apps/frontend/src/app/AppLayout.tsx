import { NavLink, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <aside
        style={{
          width: '260px',
          background: '#111827',
          color: 'white',
          padding: '32px 24px',
        }}
      >
        <h2
          style={{
            marginTop: 0,
            fontSize: '22px',
          }}
        >
          Salary Manager
        </h2>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '32px',
          }}
        >
          <NavLink
            to="/employees"
            style={({ isActive }) => ({
              color: 'white',
              textDecoration: 'none',
              padding: '12px',
              borderRadius: '8px',
              background: isActive ? '#2563eb' : 'transparent',
            })}
          >
            Employees
          </NavLink>

          <NavLink
            to="/analytics"
            style={({ isActive }) => ({
              color: 'white',
              textDecoration: 'none',
              padding: '12px',
              borderRadius: '8px',
              background: isActive ? '#2563eb' : 'transparent',
            })}
          >
            Analytics
          </NavLink>
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
