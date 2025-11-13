import { createContext, useContext, useState, useEffect } from 'react';
import API from '../Services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    if (localStorage.getItem('token')) loadUser();
    else setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    navigateBasedOnRole(res.data.user.role);
  };

  const register = async (data) => {
    const res = await API.post('/auth/register', data);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    navigateBasedOnRole(res.data.user.role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const navigateBasedOnRole = (role) => {
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'librarian') navigate('/librarian/dashboard');
    else navigate('/user/dashboard');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);