import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AppRoutes;
