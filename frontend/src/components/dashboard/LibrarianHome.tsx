import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../store/hooks';

interface Book {
  id: number;
  book_name: string;
  quantity: number;
  author_name: string;
}

interface IssuedBook {
  id: number;
  book_id: number;
  admission_number: string;
  issue_date: string;
  due_date: string;
  returned: boolean;
}

interface Student {
  admission_number: string;
  full_name: string;
  primary_school_name: string;
  grade: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const LibrarianHome = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [students, setStudents] = useState<Student[]>([]); // Added state for students
  const [issuedBooks, setIssuedBooks] = useState<number>(0);
  const [defaulters, setDefaulters] = useState<number>(0);
  const token = useAppSelector((state) => state.auth.token);

  const fetchStats = useCallback(async () => {
    if (!token) return;

    try {
      const bookResponse = await axios.get<{ data: Book[] }>(
        'http://127.0.0.1:8000/api/books/',
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setBooks(bookResponse.data.data);
      setTotalBooks(bookResponse.data.data.reduce((sum, book) => sum + book.quantity, 0));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/students/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setStudents(response.data.data); // Set fetched students to state
        setTotalStudents(response.data.data.length);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    };

    if (token) {
      fetchStudentData(); // Fetch student details
    }
  }, [token]);

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await axios.get<{ data: IssuedBook[] }>("http://127.0.0.1:8000/api/issued/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const today = new Date();
        const issuedData = response.data.data;

        const pendingBooks = issuedData.filter((book) => !book.returned);
        const overdueBooks = pendingBooks.filter((book) => {
          const dueDate = new Date(book.due_date);
          return dueDate < today;
        });

        setIssuedBooks(pendingBooks.length);
        setDefaulters(overdueBooks.length); 
      } catch (error) {
        console.error("Error fetching issued books:", error);
      }
    };

    if (token) {
      fetchIssuedBooks();
    }
  }, [token]);

  const pieData = books.map((book) => ({
    name: book.book_name,
    value: book.quantity,
  }));

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen text-gray-900">
      <h2 className="text-2xl font-bold mb-4">Welcome To Librarian Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Books</h3>
          <p className="text-2xl font-bold mt-2 text-gray-900">{totalBooks}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
          <p className="text-2xl font-bold mt-2 text-gray-900">{totalStudents}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Issued Books</h3>
          <p className="text-2xl font-bold mt-2 text-gray-900">{issuedBooks}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Defaulter List</h3>
          <p className="text-2xl font-bold mt-2 text-gray-900">{defaulters}</p>
        </div>
      </div>

      {/* Tables + Chart */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tables */}
        <div className="flex-1 space-y-6">
          {/* Student Details Table */}
          <div className="overflow-x-auto">
            <h3 className="text-xl font-semibold mb-2">Student Details</h3>
            <table className="w-full text-sm border border-gray-300 bg-white text-gray-800">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 text-left">Admission No.</th>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">School</th>
                  <th className="border px-4 py-2 text-left">Grade</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.admission_number}>
                    <td className="border px-4 py-2">{student.admission_number}</td>
                    <td className="border px-4 py-2">{student.full_name}</td>
                    <td className="border px-4 py-2">{student.primary_school_name}</td>
                    <td className="border px-4 py-2">{student.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Book Details Table */}
          <div className="overflow-x-auto">
            <h3 className="text-xl font-semibold mb-2">Book Details</h3>
            <table className="w-full text-sm border border-gray-300 bg-white text-gray-800">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 text-left">Book ID</th>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Author</th>
                  <th className="border px-4 py-2 text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td className="border px-4 py-2">{book.id}</td>
                    <td className="border px-4 py-2">{book.book_name}</td>
                    <td className="border px-4 py-2">{book.author_name}</td>
                    <td className="border px-4 py-2">{book.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="lg:w-1/3 w-full">
          <h3 className="text-xl font-semibold mb-2">Most Issued Books</h3>
          <div className="bg-white p-4 rounded shadow text-gray-800">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianHome;











