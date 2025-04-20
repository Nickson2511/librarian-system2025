import { useState } from 'react';
import { FaBook } from 'react-icons/fa';
import { PiBooksFill } from 'react-icons/pi';
import axios from 'axios';
import { useAppSelector } from '../store/hooks';

interface ReturnedBook {
  id: number;
  book: {
    id: number;
    book_name: string;
    author_name: string;
    quantity: number;
  };
  student: {
    id: number;
    full_name: string;
    gender: string;
    admission_number: string;
    primary_school_name: string;
    grade: string;
    stream: string;
  };
  issue_date: string;
  due_date: string;
  returned: boolean;
}

const ReturnBook = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [bookId, setBookId] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [details, setDetails] = useState<ReturnedBook | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReturnBook = async () => {
    setLoading(true);
    try {
      // Step 1: Return the book
      const returnRes = await axios.post(
        'http://127.0.0.1:8000/api/issued/return/',
        {
          book_id: Number(bookId),
          admission_number: admissionNumber,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      alert(returnRes.data.message);

      // Step 2: Fetch specific returned book details using bookId
      const detailRes = await axios.get(
        `http://127.0.0.1:8000/api/issued/returned/${bookId}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      setDetails(detailRes.data.data);
    } catch (err) {
      console.error('Error during return:', err);
      alert('Return failed or no details found.');
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="hidden md:flex items-center justify-center w-1/3">
        <PiBooksFill size={200} className="text-red-600" />
      </div>

      <div className="bg-white rounded-md shadow-md p-6 flex-1 space-y-6">
        {/* Issued Book Details */}
        <div className="bg-red-600 text-white p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Issued Book Details</h2>
          <hr className="border-white mb-4" />
          <div className="space-y-2 text-sm md:text-base">
            {details ? (
              <>
                <div className="flex justify-between">
                  <span>Book ID:</span>
                  <span>{details.book.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Book Name:</span>
                  <span>{details.book.book_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Student Name:</span>
                  <span>{details.student.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Issue Date:</span>
                  <span>{details.issue_date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Due Date:</span>
                  <span>{details.due_date}</span>
                </div>
              </>
            ) : (
              <p>No details to show.</p>
            )}
          </div>
        </div>

        {/* Return Book Section */}
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-full">
            <FaBook className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-black">Return Book</h2>
            <hr className="border-red-600 mt-1" />
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4 text-sm md:text-base">
          <div className="flex flex-col">
            <label htmlFor="bookId" className="mb-1 font-medium text-gray-700">
              Book ID:
            </label>
            <input
              type="text"
              id="bookId"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              placeholder="Enter Book ID"
              className="border border-gray-300 rounded-md px-3 py-2 bg-white text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="admissionNumber" className="mb-1 font-medium text-gray-700">
              Admission Number:
            </label>
            <input
              type="text"
              id="admissionNumber"
              value={admissionNumber}
              onChange={(e) => setAdmissionNumber(e.target.value)}
              placeholder="Enter Admission Number"
              className="border border-gray-300 rounded-md px-3 py-2 bg-white text-black"
            />
          </div>
        </div>

        {/* Button */}
        <div className="pt-4">
          <button
            onClick={handleReturnBook}
            className="bg-red-600 text-white w-full py-2 rounded-md hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Return Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnBook;







