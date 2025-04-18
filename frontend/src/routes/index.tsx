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
import ReturnBook from '../components/ReturnBook';
import ViewRecords from '../components/ViewRecords';
import IssuedBooks from '../components/IssuedBooks';
import DefaulterList from '../components/DefaulterList';
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
      <Route path="/issue-book" element={
        <LibrarianLayout>
          <IssueBook />
        </LibrarianLayout>
      }
      />
      <Route path="/return-book" element={
        <LibrarianLayout>
          <ReturnBook/>
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
