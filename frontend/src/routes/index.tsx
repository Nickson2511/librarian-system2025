import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import StudentManager from '../components/StudentManager';
import BookManager from '../components/BookManager';
import IssueBook from '../components/IssueBook';
import LibrarianLayout from '../layouts/LibrarianLayout';
import ReturnBook from '../components/ReturnBook';
import ViewRecords from '../components/ViewRecords';
import IssuedBooks from '../components/IssuedBooks';
import DefaulterList from '../components/DefaulterList';
import PrivateRoute from '../components/PrivateRoute';
import ForgotPasswordPage from '../components/ForgotPasswordPage';
import VerifyOtpPage from '../components/VerifyOtpPage';
import ResetPasswordPage from '../components/ResetPasswordPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      }
      />
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
      <Route path="/issue-book" element={
        <LibrarianLayout>
          <IssueBook />
        </LibrarianLayout>
      }
      />
      <Route path="/return-book" element={
        <LibrarianLayout>
          <ReturnBook />
        </LibrarianLayout>
      }
      />
      <Route path="/records" element={
        <LibrarianLayout>
          <ViewRecords />
        </LibrarianLayout>
      }
      />
      <Route path="/issued-books" element={
        <LibrarianLayout>
          <IssuedBooks />
        </LibrarianLayout>
      }
      />
      <Route path="/default-list" element={
        <LibrarianLayout>
          <DefaulterList />
        </LibrarianLayout>
      }
      />
    </Routes>
  );
};

export default AppRoutes;
