// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import HomePage from './pages/Home/HomePage'
import ServicesPage from './pages/Services/ServicesPage'
import ServiceDetail from './pages/Services/ServiceDetail'
import LoginPage from './pages/Auth/LoginPage' // Fixed path
import RegisterPage from './pages/Auth/RegisterPage' // Fixed path
import DashboardPage from './pages/Dashboard/DashboardPage'
import AdminDashboard from './pages/Admin/AdminDashboard'
import PrivateRoute from './components/common/PrivateRoute'
import AdminRoute from './components/common/AdminRoute'
import NotFoundPage from './pages/Home/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        <Route path="dashboard" element={<PrivateRoute />}>
          <Route index element={<DashboardPage />} />
        </Route>
        
        <Route path="admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App