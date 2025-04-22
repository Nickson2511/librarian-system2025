import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

interface LocationState {
  email: string;
}

const VerifyOtpPage = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const navigate = useNavigate();
  const emailFromState = state?.email || '';

  const [otpCode, setOtpCode] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ message: string }>(
        'http://127.0.0.1:8000/api/accounts/verify-otp/',
        {
          email: emailFromState,
          otp_code: otpCode,
        }
      );
      setMessage(response.data.message);
      setError('');
      setTimeout(() => {
        navigate('/reset-password', { state: { email: emailFromState } });
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Verification failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>
        <p className="mb-4 text-gray-400">OTP was sent to: {emailFromState}</p>
        <input
          type="text"
          placeholder="Enter OTP code"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          className="w-full mb-4 p-3 bg-gray-900 border border-gray-700 rounded-lg"
          required
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpPage;
