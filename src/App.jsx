import { Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import HomePage from './pages/Home/HomePage'
import ServicesPage from './pages/Services/ServicesPage'
import ServiceDetail from './pages/Services/ServiceDetail'
import DashboardPage from './pages/Dashboard/DashboardPage'
import AdminDashboard from './pages/Admin/AdminDashboard'
import PrivateRoute from './components/common/PrivateRoute'
import AdminRoute from './components/common/AdminRoute'
import NotFoundPage from './pages/Home/NotFoundPage'
import Login from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage'
import GoogleAuthHandler from './components/auth/GoogleAuthHandler'
import PackagesPage from './pages/Packages/PackagesPage'
import AboutPage from './pages/About/AboutPage'
import BlogPage from './pages/Blog/BlogPage'
import BlogPostPage from './pages/Blog/BlogPostPage'
import ContactPage from './pages/Contact/ContactPage'
import ScrollToTop from './components/common/ScrollToTop';


// Add temporary fallback components
const TempLogin = () => <div>Login Page - Under Construction</div>
const TempRegister = () => <div>Register Page - Under Construction</div>

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="contact" element={<ContactPage />} />
          
          
          <Route path="dashboard" element={<PrivateRoute />}>
            <Route index element={<DashboardPage />} />
          </Route>
          
          <Route path="admin" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/google/callback" element={<GoogleAuthHandler />} />
      </Routes>
    </>
  )
}

export default App