import { useAppDispatch } from '../store/hooks';
import { registerAdmin } from '../store/auth/slice';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import LibrarySvg from '../assets/library.svg';

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignup = async (formData: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => {
    try {
      const { email, password, first_name, last_name } = formData;

      // Assert first_name and last_name are not undefined
      const result = await dispatch(
        registerAdmin({
          email,
          password,
          first_name: first_name!,
          last_name: last_name!,
        })
      ).unwrap();

      console.log('Signup successful! Token:', result);
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
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
    </div>
  );
};

export default SignupPage;
















