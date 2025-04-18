import { FaBook } from "react-icons/fa";

const BookManager = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Form */}
      <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Manage Books</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="bookId" className="block text-sm">Book ID</label>
            <input
              type="text"
              id="bookId"
              name="bookId"
              className="w-full p-2 bg-gray-700 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="bookName" className="block text-sm">Book Name</label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              className="w-full p-2 bg-gray-700 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="authorName" className="block text-sm">Author Name</label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              className="w-full p-2 bg-gray-700 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="w-full p-2 bg-gray-700 rounded-md"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <button type="button" className="bg-green-500 px-4 py-2 rounded-md text-white">Add</button>
            <button type="button" className="bg-blue-500 px-4 py-2 rounded-md text-white">Update</button>
            <button type="button" className="bg-red-500 px-4 py-2 rounded-md text-white">Delete</button>
          </div>
        </form>
      </div>

      {/* Right Table */}
      <div className="bg-gray-800 text-white p-4 rounded-md shadow-md overflow-x-auto">
        <div className="flex items-center gap-3 mb-4">
          <FaBook size={30} />
          <h2 className="text-xl font-semibold">Book List</h2>
        </div>
        <table className="w-full min-w-[600px] text-sm md:text-base">
          <thead>
            <tr className="bg-gray-700">
              <th className="border-b p-2 text-left">Book ID</th>
              <th className="border-b p-2 text-left">Book Name</th>
              <th className="border-b p-2 text-left">Author Name</th>
              <th className="border-b p-2 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-700">
              <td className="border-b p-2">B001</td>
              <td className="border-b p-2">Intro to Programming</td>
              <td className="border-b p-2">John Smith</td>
              <td className="border-b p-2">15</td>
            </tr>
            <tr className="hover:bg-gray-700">
              <td className="border-b p-2">B002</td>
              <td className="border-b p-2">Advanced Mathematics</td>
              <td className="border-b p-2">Jane Doe</td>
              <td className="border-b p-2">8</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManager;
