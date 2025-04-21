import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../store/hooks";

interface IssuedBook {
  id: number;
  book: {
    id: number;
    book_name: string;
  };
  student: {
    full_name: string;
  };
  issue_date: string;
  due_date: string;
  returned: boolean;
}

const IssuedBooks = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const headers = {
          Authorization: `Token ${token}`,
        };

        const response = await axios.get("http://127.0.0.1:8000/api/issued/", {
          headers,
        });

        // Filter books that have not been returned (pending status)
        const pendingBooks = response.data.data.filter((book: IssuedBook) => !book.returned);
        setIssuedBooks(pendingBooks);
        setLoading(false);
      } catch (error) {
        console.error('An error occurred while retrieving issued books', error);
        setError("Error fetching issued books");
        setLoading(false);
      }
    };

    if (token) {
      fetchIssuedBooks();
    }
  }, [token]);

  


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Issued Book List</h2>

      {/* Loading and error state */}
      {loading && <div className="text-center text-gray-700">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow-md border border-gray-300">
        <table className="min-w-full table-auto border-collapse text-gray-800">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 border">Book ID</th>
              <th className="py-3 px-4 border">Book Name</th>
              <th className="py-3 px-4 border">Student Name</th>
              <th className="py-3 px-4 border">Issue Date</th>
              <th className="py-3 px-4 border">Due Date</th>
              <th className="py-3 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  No pending issued books available.
                </td>
              </tr>
            ) : (
              issuedBooks.map((book) => (
                <tr key={book.id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border">{book.id}</td>
                  <td className="py-2 px-4 border">{book.book.book_name}</td>
                  <td className="py-2 px-4 border">{book.student.full_name}</td>
                  <td className="py-2 px-4 border">{book.issue_date}</td>
                  <td className="py-2 px-4 border">{book.due_date}</td>
                  <td className="py-2 px-4 border text-yellow-600 font-semibold">
                    Pending
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuedBooks;












