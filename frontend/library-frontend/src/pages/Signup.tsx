import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
      {/* Add signup form here later */}
      <p>
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
