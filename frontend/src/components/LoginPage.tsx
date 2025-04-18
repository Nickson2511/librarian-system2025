import { useAppDispatch } from '../store/hooks';
import { loginAdmin } from '../store/auth/slice';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import LibrarySvg from '../assets/library.svg';

type ErrorWithResponse = {
  response: {
    data: Record<string, string[]>;
  };
};

const isErrorWithResponse = (err: unknown): err is ErrorWithResponse => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    typeof (err as { response?: unknown }).response === 'object' &&
    err.response !== null &&
    'data' in (err as { response: { data?: unknown } }).response
  );
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formData: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }): Promise<Record<string, string[]> | null> => {
    try {
      const result = await dispatch(loginAdmin(formData)).unwrap();
      console.log('Login successful! Token:', result);
      navigate('/dashboard');
      return null;
    } catch (err: unknown) {
      if (isErrorWithResponse(err)) {
        return err.response.data;
      }
      return { general: ['Invalid email or password'] };
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gray-800 flex items-center justify-center p-4">
        <img src={LibrarySvg} alt="Library" className="w-3/4 h-auto md:h-full object-contain" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 min-h-screen">
        <AuthForm isLogin={true} onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;







