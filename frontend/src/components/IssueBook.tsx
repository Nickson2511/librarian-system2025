import { useState } from 'react';
import { FaBook, FaUserGraduate } from 'react-icons/fa';
import axios from 'axios';
import { useAppSelector } from '../store/hooks';

interface BookDetails {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

interface StudentDetails {
  admission_number: string;
  name: string;
  gender: string;
  primary_school: string;
  grade: string;
  stream: string;
}

interface FormData {
  book_id: string;
  admission_number: string;
  issue_date: string;
  due_date: string;
}

const IssueBook = () => {
  const token = useAppSelector((state) => state.auth.token);

  const [formData, setFormData] = useState<FormData>({
    book_id: '',
    admission_number: '',
    issue_date: '',
    due_date: '',
  });

  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const fetchIssuedDetails = async (issuedId: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/issued/${issuedId}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      const data = response.data.data;

      setBookDetails({
        id: data.book.id,
        title: data.book.book_name,
        author: data.book.author_name,
        quantity: data.book.quantity,
      });

      setStudentDetails({
        admission_number: data.student.admission_number,
        name: data.student.full_name,
        gender: data.student.gender,
        primary_school: data.student.primary_school_name,
        grade: data.student.grade,
        stream: data.student.stream,
      });
    } catch (error) {
      console.error('Error fetching issued details:', error);
      setBookDetails(null);
      setStudentDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        'http://127.0.0.1:8000/api/issued/issue/',
        formData,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      alert('Book issued successfully.');
      const issuedId = response.data.data.id;

      fetchIssuedDetails(issuedId);

      setFormData((prev) => ({
        ...prev,
        issue_date: '',
        due_date: '',
      }));
    } catch (err) {
      console.error('Issue failed', err);
      alert('Issue failed');
      setBookDetails(null);
      setStudentDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Book Details Card */}
      <div className="bg-red-600 text-white rounded-md shadow-md p-4 md:max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <FaBook size={24} />
          <h2 className="text-xl font-semibold">Book Details</h2>
        </div>
        <div className="space-y-2 text-sm md:text-base">
          {loading ? (
            <p>Loading...</p>
          ) : bookDetails ? (
            <>
              <div className="flex justify-between">
                <span>Book ID:</span>
                <span>{bookDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Book Name:</span>
                <span>{bookDetails.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Author:</span>
                <span>{bookDetails.author}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{bookDetails.quantity}</span>
              </div>
            </>
          ) : (
            <p>No Book Details</p>
          )}
        </div>
      </div>

      <div className="w-[1px] bg-white hidden md:block" />

      {/* Student Details + Form */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Student Info */}
        <div className="bg-blue-600 text-white rounded-md shadow-md p-4">
          <div className="flex items-center gap-3 mb-4">
            <FaUserGraduate size={24} />
            <h2 className="text-xl font-semibold">Student Details</h2>
          </div>
          <div className="space-y-2 text-sm md:text-base">
            {loading ? (
              <p>Loading...</p>
            ) : studentDetails ? (
              <>
                <div className="flex justify-between">
                  <span>Admission Number:</span>
                  <span>{studentDetails.admission_number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Student Name:</span>
                  <span>{studentDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gender:</span>
                  <span>{studentDetails.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span>Primary School:</span>
                  <span>{studentDetails.primary_school}</span>
                </div>
                <div className="flex justify-between">
                  <span>Class / Grade:</span>
                  <span>{studentDetails.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stream / Section:</span>
                  <span>{studentDetails.stream}</span>
                </div>
              </>
            ) : (
              <p>No Student Details</p>
            )}
          </div>
        </div>

        {/* Issue Form */}
        <div className="bg-white text-black rounded-md shadow-md p-4">
          <div className="flex items-center gap-3 mb-1">
            <FaBook className="text-red-600" size={20} />
            <h2 className="text-lg font-semibold">Issue Book</h2>
          </div>
          <hr className="border-red-600 mb-4" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="book_id" className="mb-1 text-sm font-medium text-gray-700">
                Book ID <span className="text-red-500">*</span>
              </label>
              <input
                id="book_id"
                type="text"
                placeholder="Enter Book ID (e.g., 123)"
                value={formData.book_id}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="admission_number" className="mb-1 text-sm font-medium text-gray-700">
                Student Admission Number <span className="text-red-500">*</span>
              </label>
              <input
                id="admission_number"
                type="text"
                placeholder="Enter Student Admission Number"
                value={formData.admission_number}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="issue_date" className="mb-1 text-sm font-medium text-gray-700">
                Issue Date <span className="text-red-500">*</span>
              </label>
              <input
                id="issue_date"
                type="date"
                value={formData.issue_date}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="due_date" className="mb-1 text-sm font-medium text-gray-700">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Issue Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueBook;














