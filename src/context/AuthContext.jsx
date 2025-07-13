import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import api from '../services/api'
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);

      // Use compatible decode function
      const payload = jwtDecode(response.data.token);
      localStorage.setItem('userId', payload.id);

      // Store userName if available
      if (response.data.user && response.data.user.name) {
        localStorage.setItem('userName', response.data.user.name);
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        localStorage.setItem('userName', 'Unknown');
      }

      localStorage.setItem('token', response.data.token);
      toast.success('Logged in successfully');
      // Removed navigate('/dashboard') here
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      console.log('Register response:', response.data);
      setUser(response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.user._id || response.data.user.id)
      toast.success('Registered successfully')
      // Removed navigate('/dashboard') here
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)