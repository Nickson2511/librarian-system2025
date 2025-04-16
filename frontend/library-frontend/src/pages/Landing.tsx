import { Link } from 'react-router-dom'
import LibrarySVG from '../assets/library.svg'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 bg-gray-950 text-white px-4">
      <img src={LibrarySVG} alt="Library" className="w-64 h-64" />
      <div className="text-center md:text-left space-y-6">
        <h1 className="text-4xl font-bold">Welcome to Our Library Admin Panel</h1>
        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
