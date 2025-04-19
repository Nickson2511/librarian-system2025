import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { FaBook } from "react-icons/fa";
import { useAppSelector } from "../store/hooks";

// Book structure returned from the backend
interface Book {
  id: number; // Auto-incremented by backend
  book_id: string;
  book_name: string;
  author_name: string;
  quantity: number;
}

// Validation error response from the backend
interface ValidationErrors {
  [field: string]: string[];
}

interface BookApiErrorResponse {
  message?: string;
  errors?: ValidationErrors;
}

const BookManager = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [formData, setFormData] = useState<Partial<Book>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const token = useAppSelector((state) => state.auth.token);

  const fetchBooks = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get<{ data: Book[] }>(
        "http://127.0.0.1:8000/api/books/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setBooks(response.data.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }, [token]);

  const handleCreate = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/books/create/", formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setFormData({});
      setErrors({});
      setGlobalError(null);
      fetchBooks();
    } catch (err) {
      const error = err as AxiosError<BookApiErrorResponse>;
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        setGlobalError(error.response.data.message || "Validation error.");
      } else {
        setGlobalError("Something went wrong while creating the book.");
      }
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/books/${editingId}/update/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setFormData({});
      setEditingId(null);
      setErrors({});
      setGlobalError(null);
      fetchBooks();
    } catch (err) {
      const error = err as AxiosError<BookApiErrorResponse>;
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        setGlobalError(error.response.data.message || "Validation error.");
      } else {
        setGlobalError("Something went wrong while updating the book.");
      }
    }
  };

  const handleDelete = async (id?: number) => {
    const targetId = id || editingId;
    if (!targetId) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/books/${targetId}/delete/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setFormData({});
      setEditingId(null);
      setErrors({});
      setGlobalError(null);
      fetchBooks();
    } catch {
      setGlobalError("Failed to delete the book.");
    }
  };

  const handleEditClick = (book: Book) => {
    setEditingId(book.id);
    setFormData(book);
    setErrors({});
    setGlobalError(null);
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* Left Form */}
      <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Manage Books</h2>

        {globalError && (
          <div className="bg-red-500 p-2 mb-4 rounded-md text-sm">
            {globalError}
          </div>
        )}

        <form className="space-y-4">

          <div>
            <label htmlFor="bookId" className="block text-sm">
              Book ID
            </label>
            <input
              type="text"
              id="bookId"
              value={formData.book_id || ""}
              onChange={(e) =>
                setFormData({ ...formData, book_id: e.target.value })
              }
              className="w-full p-2 bg-gray-700 rounded-md"
            />
            {errors.book_id && (
              <p className="text-red-400 text-sm">
                {errors.book_id.join(", ")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="bookName" className="block text-sm">
              Book Name
            </label>
            <input
              type="text"
              id="bookName"
              value={formData.book_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, book_name: e.target.value })
              }
              className="w-full p-2 bg-gray-700 rounded-md"
            />
            {errors.book_name && (
              <p className="text-red-400 text-sm">
                {errors.book_name.join(", ")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="authorName" className="block text-sm">
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              value={formData.author_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, author_name: e.target.value })
              }
              className="w-full p-2 bg-gray-700 rounded-md"
            />
            {errors.author_name && (
              <p className="text-red-400 text-sm">
                {errors.author_name.join(", ")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={formData.quantity ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value, 10) || 0,
                })
              }
              className="w-full p-2 bg-gray-700 rounded-md"
            />
            {errors.quantity && (
              <p className="text-red-400 text-sm">
                {errors.quantity.join(", ")}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleCreate}
              className="bg-green-500 px-4 py-2 rounded-md text-white"
            >
              Add
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 px-4 py-2 rounded-md text-white"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => handleDelete()}
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        </form>
      </div>

      {/* Right Table */}
      <div className="bg-gray-800 text-white p-4 rounded-md shadow-md overflow-x-auto">
        <div className="flex items-center gap-3 mb-4">
          <FaBook size={30} />
          <h2 className="text-xl font-semibold">Book List</h2>
        </div>
        <table className="w-full min-w-[700px] text-sm md:text-base">
          <thead>
            <tr className="bg-gray-700">
              <th className="border-b p-2 text-left">Auto ID</th>
              <th className="border-b p-2 text-left">Book ID</th>
              <th className="border-b p-2 text-left">Book Name</th>
              <th className="border-b p-2 text-left">Author Name</th>
              <th className="border-b p-2 text-left">Quantity</th>
              <th className="border-b p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-700">
                <td className="border-b p-2">{book.id}</td>
                <td className="border-b p-2">{book.book_id}</td>
                <td className="border-b p-2">{book.book_name}</td>
                <td className="border-b p-2">{book.author_name}</td>
                <td className="border-b p-2">{book.quantity}</td>
                <td className="border-b p-2">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManager;





