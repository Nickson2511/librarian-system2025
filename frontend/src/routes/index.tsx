import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import ForgotPasswordPage from '../components/ForgotPasswordPage';
import DashboardPage from '../pages/DashboardPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element ={<DashboardPage/>} />
    </Routes>
  );
};

export default AppRoutes;
