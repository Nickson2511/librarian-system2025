import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import ForgotPasswordPage from '../components/ForgotPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import StudentManager from '../components/StudentManager';
import BookManager from '../components/BookManager';
import IssueBook from '../components/IssueBook';
import LibrarianLayout from '../layouts/LibrarianLayout';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route
  path="/students"
  element={
    <LibrarianLayout>
      <StudentManager />
    </LibrarianLayout>
  }
      />
      <Route path="/books" element={
        <LibrarianLayout>
          <BookManager />
          </LibrarianLayout>
          }
      />
      <Route path='/issue-book' element={
        <LibrarianLayout>
          <IssueBook />
        </LibrarianLayout>
      }
      />
    </Routes>
  );
};

export default AppRoutes;
