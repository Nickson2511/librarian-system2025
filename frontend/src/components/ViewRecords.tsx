import { useEffect, useState } from "react";
import axios from "axios";
import { FaBook } from "react-icons/fa";
import { useAppSelector } from "../store/hooks";


interface IssuedRecord {
  id: number;
  book: {
    id: number;
    book_name: string;
  };
  student: {
    full_name: string;
  };
  issue_date: string;
  due_date: string;
  returned: boolean;
}

const ViewRecords = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [issuedRecords, setIssuedRecords] = useState<IssuedRecord[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState<IssuedRecord[]>([]);

  useEffect(() => {
    const fetchIssuedRecords = async () => {
      try {
        const headers = {
          Authorization: `Token ${token}`,
        };

        const issuedRes = await axios.get("http://127.0.0.1:8000/api/issued/", {
          headers,
        });

        const issuedData = issuedRes.data.data || [];
        setIssuedRecords(issuedData);
        setFilteredData(issuedData); // Initially show all
      } catch (error) {
        console.error("Error fetching issued records", error);
      }
    };

    if (token) {
      fetchIssuedRecords();
    }
  }, [token]);

  const handleSearch = () => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const filtered = issuedRecords.filter((record) => {
      const issueDate = new Date(record.issue_date);
      if (start && issueDate < start) return false;
      if (end && issueDate > end) return false;
      return true;
    });

    setFilteredData(filtered);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Top Card */}
      <div className="bg-purple-600 text-white p-6 rounded-md shadow-md flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-full">
            <FaBook size={30} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Issued Book Records</h2>
            <hr className="border-white mt-1" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center text-sm md:text-base">
          <div className="flex flex-col">
            <label htmlFor="issueDate" className="mb-1 text-white font-medium">
              Start Date
            </label>
            <input
              type="date"
              id="issueDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dueDate" className="mb-1 text-white font-medium">
              End Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-black"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-white text-purple-600 px-4 py-2 rounded-md font-semibold hover:bg-purple-100"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-md shadow-md border border-gray-300">
        <table className="min-w-full table-auto border-collapse text-gray-800">
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
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  No records found for the selected date range.
                </td>
              </tr>
            ) : (
              filteredData.map((record) => (
                <tr
                  key={record.id}
                  className="text-center even:bg-gray-50 odd:bg-white hover:bg-gray-100"
                >
                  <td className="py-2 px-4 border">{record.id}</td>
                  <td className="py-2 px-4 border">{record.book.book_name}</td>
                  <td className="py-2 px-4 border">{record.student.full_name}</td>
                  <td className="py-2 px-4 border">{record.issue_date}</td>
                  <td className="py-2 px-4 border">{record.due_date}</td>
                  <td
                    className={`py-2 px-4 border font-semibold ${record.returned ? "text-green-600" : "text-yellow-600"
                      }`}
                  >
                    {record.returned ? "Returned" : "Pending"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewRecords;






