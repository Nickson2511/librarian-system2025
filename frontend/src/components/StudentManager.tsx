import { FaUserGraduate } from "react-icons/fa";

const StudentManager = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Form */}
      <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Manage Students</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="admissionNumber" className="block text-sm">Admission Number</label>
            <input
              type="text"
              id="admissionNumber"
              name="admissionNumber"
              className="w-full p-2 bg-gray-700 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="fullName" className="block text-sm">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full p-2 bg-gray-700 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm">Gender</label>
            <select
              id="gender"
              name="gender"
              className="w-full p-2 bg-gray-700 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="schoolName" className="block text-sm">Primary School Name</label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              className="w-full p-2 bg-gray-700 rounded-md"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="classGrade" className="block text-sm">Class / Grade</label>
              <select
                id="classGrade"
                name="classGrade"
                className="w-full p-2 bg-gray-700 rounded-md"
              >
                <option value="">Select Grade</option>
                <option value="1st Grade">1st Grade</option>
                <option value="2nd Grade">2nd Grade</option>
                <option value="3rd Grade">3rd Grade</option>
                <option value="4th Grade">4th Grade</option>
                <option value="5th Grade">5th Grade</option>
                <option value="6th Grade">6th Grade</option>
                <option value="7th Grade">7th Grade</option>
                <option value="8th Grade">8th Grade</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="streamSection" className="block text-sm">Stream / Section</label>
              <select
                id="streamSection"
                name="streamSection"
                className="w-full p-2 bg-gray-700 rounded-md"
              >
                <option value="">Select Stream</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="White">White</option>
              </select>
            </div>
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
          <FaUserGraduate size={30} />
          <h2 className="text-xl font-semibold">Student List</h2>
        </div>
        <table className="w-full min-w-[600px] text-sm md:text-base">
          <thead>
            <tr className="bg-gray-700">
              <th className="border-b p-2 text-left">Admission Number</th>
              <th className="border-b p-2 text-left">Full Name</th>
              <th className="border-b p-2 text-left">Gender</th>
              <th className="border-b p-2 text-left">Primary School Name</th>
              <th className="border-b p-2 text-left">Class / Grade</th>
              <th className="border-b p-2 text-left">Stream / Section</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-700">
              <td className="border-b p-2">123456</td>
              <td className="border-b p-2">John Doe</td>
              <td className="border-b p-2">Male</td>
              <td className="border-b p-2">Sunshine Primary</td>
              <td className="border-b p-2">5th Grade</td>
              <td className="border-b p-2">Red</td>
            </tr>
            <tr className="hover:bg-gray-700">
              <td className="border-b p-2">654321</td>
              <td className="border-b p-2">Jane Smith</td>
              <td className="border-b p-2">Female</td>
              <td className="border-b p-2">Greenfield Primary</td>
              <td className="border-b p-2">6th Grade</td>
              <td className="border-b p-2">Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManager;



