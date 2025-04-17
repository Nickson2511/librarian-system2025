import { useAppDispatch } from '../store/hooks';
import { registerAdmin } from '../store/auth/slice';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import LibrarySvg from '../assets/library.svg';
import { useState } from 'react';

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = async (formData: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }): Promise<Record<string, string[]> | null> => {
    try {
      const result = await dispatch(
        registerAdmin({
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name!,
          last_name: formData.last_name!,
        })
      ).unwrap();

      console.log('Signup successful! Token:', result);
      navigate('/login');
      return null;
    } catch (err) {
      if (typeof err === 'object' && err !== null) {
        return err as Record<string, string[]>;
      }
      setErrorMessage('Something went wrong. Try again.');
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gray-800 flex items-center justify-center p-4">
        <img
          src={LibrarySvg}
          alt="Library"
          className="w-3/4 h-auto md:h-full object-contain"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 min-h-screen">
        <AuthForm isLogin={false} onSubmit={handleSignup} />
      </div>
      {errorMessage && (
        <div className="text-red-400 mb-4 text-sm w-full text-left">{errorMessage}</div>
      )}
    </div>
  );
};

export default SignupPage;














