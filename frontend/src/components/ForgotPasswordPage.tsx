// src/components/ForgotPasswordPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LibrarySvg from '../assets/library.svg';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual reset logic
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gray-800 flex items-center justify-center p-4">
        <img src={LibrarySvg} alt="Library" className="w-3/4 h-auto md:h-full object-contain" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-800 text-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
          {submitted ? (
            <p className="text-green-400 mb-4">If your email is valid, a reset link has been sent.</p>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 p-3 bg-gray-900 border border-gray-700 rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Send Reset Link
              </button>
            </>
          )}
          <p className="text-sm mt-4">
            Back to{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
