import { FaBook } from "react-icons/fa";
import { PiBooksFill } from "react-icons/pi"; // Library icon alternative

const ReturnBook = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left Side - Library SVG */}
      <div className="hidden md:flex items-center justify-center w-1/3">
        <PiBooksFill size={200} className="text-red-600" />
      </div>

      {/* Right Side - Content Card */}
      <div className="bg-white rounded-md shadow-md p-6 flex-1 space-y-6">
        {/* Issued Book Details */}
        <div className="bg-red-600 text-white p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Issued Book Details</h2>
          <hr className="border-white mb-4" />
          <div className="space-y-2 text-sm md:text-base">
            <div className="flex justify-between">
              <span>Book ID:</span>
              <span>BK12345</span>
            </div>
            <div className="flex justify-between">
              <span>Book Name:</span>
              <span>Introduction to Algorithms</span>
            </div>
            <div className="flex justify-between">
              <span>Student Name:</span>
              <span>Alice Johnson</span>
            </div>
            <div className="flex justify-between">
              <span>Issue Date:</span>
              <span>01/04/2025</span>
            </div>
            <div className="flex justify-between">
              <span>Due Date:</span>
              <span>15/04/2025</span>
            </div>
          </div>
        </div>

        {/* Return Book Section Header */}
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-full">
            <FaBook className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-black">Return Book</h2>
            <hr className="border-red-600 mt-1" />
          </div>
        </div>

        {/* Return Book Form with Inputs */}
        <div className="space-y-4 text-sm md:text-base">
          <div className="flex flex-col">
            <label htmlFor="bookId" className="mb-1 font-medium text-gray-700">
              Book ID:
            </label>
            <input
              type="text"
              id="bookId"
              placeholder="Enter Book ID"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="admissionNumber" className="mb-1 font-medium text-gray-700">
              Admission Number:
            </label>
            <input
              type="text"
              id="admissionNumber"
              placeholder="Enter Admission Number"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <button className="bg-purple-600 text-white w-full py-2 rounded-md hover:bg-purple-700">
            Find Details
          </button>
          <button className="bg-red-600 text-white w-full py-2 rounded-md hover:bg-red-700">
            Return Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnBook;










