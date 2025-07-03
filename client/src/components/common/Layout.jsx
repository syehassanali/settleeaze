import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#1976d2' }}>Student Arrival Services</h1>
      <nav style={{ marginBottom: '20px' }}>
        <a href="/" style={{ marginRight: '15px' }}>Home</a>
        <a href="/services" style={{ marginRight: '15px' }}>Services</a>
        <a href="/login" style={{ marginRight: '15px' }}>Login</a>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout