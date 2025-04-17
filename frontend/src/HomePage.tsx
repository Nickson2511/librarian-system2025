import { Link } from 'react-router-dom';
import LibrarySvg from './assets/library.svg';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Left Side: Full height SVG */}
      <div className="w-full md:w-1/2 bg-gray-800 flex items-center justify-center p-4">
        <img
          src={LibrarySvg}
          alt="Library"
          className="w-3/4 h-auto md:h-full object-contain"
        />
      </div>

      {/* Right Side: Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center px-6 py-12 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold leading-snug">
          Welcome to  Librarian Management System
        </h1>
        <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
  Manage all library services including managing users, books, articles,
  students, admins, and more — all in one place.
</p>


        <Link to="/login">
          <button className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-2 px-6 rounded-lg w-full max-w-xs">
            Login
          </button>
        </Link>

        <p className="text-sm text-gray-300">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;






