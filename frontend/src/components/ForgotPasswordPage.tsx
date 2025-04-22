import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LibrarySvg from '../assets/library.svg';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ message: string }>(
        'http://127.0.0.1:8000/api/accounts/forgot-password/',
        { email }
      );
      console.log(response.data);
      setSubmitted(true);
      setError('');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Something went wrong');
      } else {
        setError('An unexpected error occurred');
      }
    }
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
            <p className="text-green-400 mb-4">OTP has been sent to your email.</p>
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
              {error && <p className="text-red-500 mb-2">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Send OTP
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








