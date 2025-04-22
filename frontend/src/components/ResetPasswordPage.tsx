import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

interface LocationState {
  email: string;
}

const ResetPasswordPage = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const email = state?.email || '';
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post<{ message: string }>(
        'http://127.0.0.1:8000/api/accounts/reset-password/',
        {
          email,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }
      );
      setMessage(response.data.message);
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Reset failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        <p className="mb-4 text-gray-400">Resetting for: {email}</p>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 p-3 bg-gray-900 border border-gray-700 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 p-3 bg-gray-900 border border-gray-700 rounded-lg"
          required
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
