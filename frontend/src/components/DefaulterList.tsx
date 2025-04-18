const DefaulterList = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-red-600 inline-block mb-6">
        Defaulter List
      </h2>

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
            {/* Example row */}
            <tr className="text-center hover:bg-gray-50">
              <td className="py-2 px-4 border">BK45678</td>
              <td className="py-2 px-4 border">Clean Code</td>
              <td className="py-2 px-4 border">Jane Smith</td>
              <td className="py-2 px-4 border">2025-03-15</td>
              <td className="py-2 px-4 border">2025-03-30</td>
              <td className="py-2 px-4 border text-red-600 font-semibold">
                Pending
              </td>
            </tr>
            {/* Add more rows dynamically based on data */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DefaulterList;
