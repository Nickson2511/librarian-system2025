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

const DefaulterList = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [defaulters, setDefaulters] = useState<IssuedBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDefaulters = async () => {
      try {
        const headers = {
          Authorization: `Token ${token}`,
        };

        const response = await axios.get("http://127.0.0.1:8000/api/issued/", {
          headers,
        });

        // Filter out books that are not returned and are overdue by more than 14 days
        const overdueBooks = response.data.data.filter((book: IssuedBook) => {
          const dueDate = new Date(book.due_date);
          const today = new Date();
          const timeDiff = today.getTime() - dueDate.getTime();
          const daysOverdue = timeDiff / (1000 * 3600 * 24);

          // Check if the book is overdue by more than 14 days and has not been returned
          return !book.returned && daysOverdue > 14;
        });

        setDefaulters(overdueBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching defaulters", error);
        setLoading(false);
      }
    };

    if (token) {
      fetchDefaulters();
    }
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-red-600 inline-block mb-6">
        Defaulter List
      </h2>

      {/* Loading state */}
      {loading && <div className="text-center text-gray-700">Loading...</div>}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-red-100 text-red-800">
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
            {defaulters.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-black">
                  No defaulters found.
                </td>
              </tr>


            ) : (
              defaulters.map((book) => (
                <tr key={book.id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border">{book.id}</td>
                  <td className="py-2 px-4 border">{book.book.book_name}</td>
                  <td className="py-2 px-4 border">{book.student.full_name}</td>
                  <td className="py-2 px-4 border">{book.issue_date}</td>
                  <td className="py-2 px-4 border">{book.due_date}</td>
                  <td className="py-2 px-4 border text-red-600 font-semibold">
                    Overdue
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

export default DefaulterList;





