import { useState } from 'react';
import { Link } from 'react-router-dom';

type AuthFormProps = {
  isLogin: boolean;
  onSubmit: (formData: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => Promise<Record<string, string[]> | null>;
};

const AuthForm = ({ isLogin, onSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const errors: Record<string, string[]> = {};

    // Validate email (always)
    if (!email) {
      errors.email = ['Email is required.'];
    } else {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) {
        errors.email = ['Please enter a valid email address.'];
      }
    }

    // Validate password based on login/signup
    if (!password) {
      errors.password = ['Password is required.'];
    } else if (!isLogin) {
      if (password.length < 8) {
        errors.password = ['Password must be at least 8 characters.'];
      } else if (!/[a-z]/.test(password)) {
        errors.password = ['Password must contain at least one lowercase letter.'];
      } else if (!/[A-Z]/.test(password)) {
        errors.password = ['Password must contain at least one uppercase letter.'];
      } else if (!/[0-9]/.test(password)) {
        errors.password = ['Password must contain at least one number.'];
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.password = ['Password must contain at least one special character.'];
      }
    }

    // Signup-only fields
    if (!isLogin) {
      if (!firstName) {
        errors.first_name = ['First name is required.'];
      }
      if (!lastName) {
        errors.last_name = ['Last name is required.'];
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const submitErrors = await onSubmit({
      email,
      password,
      ...(isLogin ? {} : { first_name: firstName, last_name: lastName }),
    });

    if (submitErrors) {
      setFieldErrors(submitErrors);
      if (submitErrors.general) {
        setErrorMessage(submitErrors.general[0]);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col items-center bg-gray-800 text-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Signup'}</h2>

      {!isLogin && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full mb-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-lg"
          />
          {fieldErrors.first_name && (
            <p className="text-red-400 text-sm mb-2">{fieldErrors.first_name.join(', ')}</p>
          )}

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full mb-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-lg"
          />
          {fieldErrors.last_name && (
            <p className="text-red-400 text-sm mb-2">{fieldErrors.last_name.join(', ')}</p>
          )}
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-lg"
      />
      {fieldErrors.email && (
        <p className="text-red-400 text-sm mb-2">{fieldErrors.email.join(', ')}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-lg"
      />
      {fieldErrors.password && (
        <p className="text-red-400 text-sm mb-2">{fieldErrors.password.join(', ')}</p>
      )}

      {errorMessage && (
        <div className="text-red-400 mb-4 text-sm w-full text-left">{errorMessage}</div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
      >
        {isLogin ? 'Login' : 'Signup'}
      </button>

      <div className="mt-4 text-sm text-center">
        {isLogin ? (
          <>
            <Link to="/signup" className="text-blue-400 hover:underline block">
              Don't have an account? Signup
            </Link>
            <Link to="/forgot-password" className="text-blue-400 hover:underline block mt-2">
              Forgot password?
            </Link>
          </>
        ) : (
          <Link to="/login" className="text-blue-400 hover:underline">
            Already have an account? Login
          </Link>
        )}
      </div>
    </form>
  );
};

export default AuthForm;











