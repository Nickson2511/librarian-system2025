import { useState } from 'react';
import { Link } from 'react-router-dom';

type AuthFormProps = {
  isLogin: boolean;
  onSubmit: (formData: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => void | Promise<void>;
};

const AuthForm = ({ isLogin, onSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      ...(isLogin ? {} : { first_name: firstName, last_name: lastName }), // Optional first_name and last_name only when not login
    };

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col items-center bg-gray-800 text-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">
        {isLogin ? 'Login' : 'Signup'}
      </h2>

      {!isLogin && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full mb-4 p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full mb-4 p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
      >
        {isLogin ? 'Login' : 'Signup'}
      </button>

      {isLogin ? (
        <div className="mt-4 text-sm text-center">
          <Link to="/signup" className="text-blue-400 hover:underline block">
            Don't have an account? Signup
          </Link>
          <Link
            to="/forgot-password"
            className="text-blue-400 hover:underline block mt-2"
          >
            Forgot password?
          </Link>
        </div>
      ) : (
        <div className="mt-4 text-sm text-center">
          <Link to="/login" className="text-blue-400 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      )}
    </form>
  );
};

export default AuthForm;





