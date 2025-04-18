import { FaBook } from "react-icons/fa";

const ViewRecords = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Top Card */}
      <div className="bg-purple-600 text-white p-6 rounded-md shadow-md flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-full">
            <FaBook size={30} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Issue Book Details</h2>
            <hr className="border-white mt-1" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center text-sm md:text-base">
          <div className="flex flex-col">
            <label htmlFor="issueDate" className="mb-1 text-white font-medium">
              Issue Date
            </label>
            <input
              type="date"
              id="issueDate"
              className="px-3 py-2 rounded-md border border-gray-300 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dueDate" className="mb-1 text-white font-medium">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="px-3 py-2 rounded-md border border-gray-300 text-black"
            />
          </div>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-md font-semibold hover:bg-purple-100">
            Search
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-md shadow-md">
        <table className="min-w-full table-auto border-collapse">
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
            {/* Sample row */}
            <tr className="text-center">
              <td className="py-2 px-4 border">BK12345</td>
              <td className="py-2 px-4 border">Introduction to Algorithms</td>
              <td className="py-2 px-4 border">Alice Johnson</td>
              <td className="py-2 px-4 border">2025-04-01</td>
              <td className="py-2 px-4 border">2025-04-15</td>
              <td className="py-2 px-4 border text-green-600 font-semibold">
                Returned
              </td>
            </tr>
            {/* You can map more data rows dynamically here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewRecords;
