import { FaBook, FaUserGraduate } from "react-icons/fa";

const IssueBook = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Book Details Card */}
      <div className="bg-red-600 text-white rounded-md shadow-md p-4 flex-1">
        <div className="flex items-center gap-3 mb-4">
          <FaBook size={24} />
          <h2 className="text-xl font-semibold">Book Details</h2>
        </div>
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
            <span>Author:</span>
            <span>Thomas H. Cormen</span>
          </div>
          <div className="flex justify-between">
            <span>Quantity:</span>
            <span>5</span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-[1px] bg-white hidden md:block" />

      {/* Student Details + Issue Section Card */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Student Details */}
        <div className="bg-blue-600 text-white rounded-md shadow-md p-4">
          <div className="flex items-center gap-3 mb-4">
            <FaUserGraduate size={24} />
            <h2 className="text-xl font-semibold">Student Details</h2>
          </div>
          <div className="space-y-2 text-sm md:text-base">
            <div className="flex justify-between">
              <span>Admission Number:</span>
              <span>ADM89076</span>
            </div>
            <div className="flex justify-between">
              <span>Student Name:</span>
              <span>Alice Johnson</span>
            </div>
            <div className="flex justify-between">
              <span>Gender:</span>
              <span>Female</span>
            </div>
            <div className="flex justify-between">
              <span>Primary School Name:</span>
              <span>Hope Academy</span>
            </div>
            <div className="flex justify-between">
              <span>Class / Grade:</span>
              <span>6th Grade</span>
            </div>
            <div className="flex justify-between">
              <span>Stream / Section:</span>
              <span>Green</span>
            </div>
          </div>
        </div>

        {/* Issue Section */}
        <div className="bg-white text-black rounded-md shadow-md p-4">
          <div className="flex items-center gap-3 mb-1">
            <FaBook className="text-red-600" size={20} />
            <h2 className="text-lg font-semibold">Issue Book</h2>
          </div>
          <hr className="border-red-600 mb-4" />
          <form className="space-y-4 text-sm md:text-base">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <label htmlFor="bookId" className="font-medium">
                Book ID:
              </label>
              <input
                id="bookId"
                type="text"
                placeholder="Enter Book ID"
                className="border border-gray-300 p-2 rounded-md w-full md:w-2/3"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <label htmlFor="admissionNo" className="font-medium">
                Admission Number:
              </label>
              <input
                id="admissionNo"
                type="text"
                placeholder="Enter Admission No."
                className="border border-gray-300 p-2 rounded-md w-full md:w-2/3"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <label htmlFor="issueDate" className="font-medium">
                Issue Date:
              </label>
              <input
                id="issueDate"
                type="date"
                className="border border-gray-300 p-2 rounded-md w-full md:w-2/3"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <label htmlFor="dueDate" className="font-medium">
                Due Date:
              </label>
              <input
                id="dueDate"
                type="date"
                className="border border-gray-300 p-2 rounded-md w-full md:w-2/3"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
              >
                Issue Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueBook;




















