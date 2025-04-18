const IssuedBooks = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Issued Book List
      </h2>

      {/* Table */}
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
            <tr className="text-center hover:bg-gray-50">
              <td className="py-2 px-4 border">BK98765</td>
              <td className="py-2 px-4 border">Design Patterns</td>
              <td className="py-2 px-4 border">John Doe</td>
              <td className="py-2 px-4 border">2025-04-05</td>
              <td className="py-2 px-4 border">2025-04-20</td>
              <td className="py-2 px-4 border text-yellow-600 font-semibold">
                Pending
              </td>
            </tr>
            {/* Add more rows dynamically as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuedBooks;
