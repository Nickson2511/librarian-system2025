import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      {/* Add login form here later */}
      <p>
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
