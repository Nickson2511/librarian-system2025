import React, { useEffect, useState, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import { FaUserGraduate } from "react-icons/fa";
import { useAppSelector } from "../store/hooks";

interface Student {
  id: number;
  admission_number: string;
  full_name: string;
  gender: string;
  primary_school_name: string;
  grade: string;
  stream: string;
}

interface ValidationErrors {
  [field: string]: string[];
}

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Partial<Student>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const token = useAppSelector((state) => state.auth.token);

  const fetchStudents = useCallback(async () => {
    if (!token) return;

    try {
      const response: AxiosResponse<{ data: Student[] }> = await axios.get(
        "http://127.0.0.1:8000/api/students/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setStudents(response.data.data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  }, [token]);

  const handleCreate = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/students/create/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setFormData({});
      setErrors({});
      setGlobalError(null);
      fetchStudents();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        setGlobalError(err.response.data.message || "Validation error.");
      } else {
        setGlobalError("Something went wrong while creating student.");
      }
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/students/${editingId}/update/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setFormData({});
      setErrors({});
      setGlobalError(null);
      setEditingId(null);
      fetchStudents();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        setGlobalError(err.response.data.message || "Validation error.");
      } else {
        setGlobalError("Something went wrong while updating student.");
      }
    }
  };

  const handleDelete = async (id?: number) => {
    const targetId = id || editingId;
    if (!targetId) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/students/${targetId}/delete/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setEditingId(null);
      setFormData({});
      setErrors({});
      setGlobalError(null);
      fetchStudents();
    } catch {
      setGlobalError("Failed to delete student.");
    }
  };

  const handleEditClick = (student: Student) => {
    setEditingId(student.id);
    setFormData(student);
    setErrors({});
    setGlobalError(null);
  };

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const getGradeSuffix = (number: number) => {
    if (number === 1) return "st";
    if (number === 2) return "nd";
    if (number === 3) return "rd";
    return "th";
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* Left Form */}
      <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Manage Students</h2>

        {globalError && (
          <div className="bg-red-500 p-2 mb-4 rounded-md text-sm">
            {globalError}
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label htmlFor="admissionNumber" className="block text-sm">
              Admission Number
            </label>
            <input
              type="text"
              id="admissionNumber"
              value={formData.admission_number || ""}
              onChange={(e) =>
                setFormData({ ...formData, admission_number: e.target.value })
              }
              className="w-full p-2 bg-gray-700 rounded-md"
            />
            {errors.admission_number && (
              <p className="text-red-400 text-sm">
                {errors.admission_number.join(", ")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.full_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              className="w-full p-2 bg-gray-700 rounded-md"
            />
            {errors.full_name && (
              <p className="text-red-400 text-sm">
                {errors.full_name.join(", ")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm">
              Gender
            </label>
            <select
              id="gender"
              value={formData.gender || ""}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full p-2 bg-gray-700 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-400 text-sm">{errors.gender.join(", ")}</p>
            )}
          </div>

          <div>
            <label htmlFor="schoolName" className="block text-sm">
              Primary School Name
            </label>
            <input
              type="text"
              id="schoolName"
              value={formData.primary_school_name || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  primary_school_name: e.target.value,
                })
              }
              className="w-full p-2 bg-gray-700 rounded-md"
            />
            {errors.primary_school_name && (
              <p className="text-red-400 text-sm">
                {errors.primary_school_name.join(", ")}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="classGrade" className="block text-sm">
                Class / Grade
              </label>
              <select
                id="classGrade"
                value={formData.grade || ""}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
                className="w-full p-2 bg-gray-700 rounded-md"
              >
                <option value="">Select Grade</option>
                {[...Array(8)].map((_, i) => {
                  const gradeValue = `${i + 1}${getGradeSuffix(i + 1)} grade`;
                  return (
                    <option key={i + 1} value={gradeValue}>
                      {gradeValue}
                    </option>
                  );
                })}
              </select>

              {errors.grade && (
                <p className="text-red-400 text-sm">{errors.grade.join(", ")}</p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="streamSection" className="block text-sm">
                Stream / Section
              </label>
              <select
                id="streamSection"
                value={formData.stream || ""}
                onChange={(e) =>
                  setFormData({ ...formData, stream: e.target.value })
                }
                className="w-full p-2 bg-gray-700 rounded-md"
              >
                <option value="">Select Stream</option>
                {["red", "blue", "green", "white"].map((s) => (
                  <option key={s} value={s}>
                    {s[0] + s.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {errors.stream && (
                <p className="text-red-400 text-sm">{errors.stream.join(", ")}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={editingId ? handleUpdate : handleCreate}
              className={`${editingId ? "bg-blue-500" : "bg-green-500"
                } px-4 py-2 rounded-md text-white`}
            >
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => handleDelete()}
                className="bg-red-500 px-4 py-2 rounded-md text-white"
              >
                Delete
              </button>
            )}
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
              <th className="p-2">ID</th>
              <th className="p-2">Admission No.</th>
              <th className="p-2">Name</th>
              <th className="p-2">Gender</th>
              <th className="p-2">School</th>
              <th className="p-2">Grade</th>
              <th className="p-2">Stream</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="p-2">{student.id}</td>
                <td className="p-2">{student.admission_number}</td>
                <td className="p-2">{student.full_name}</td>
                <td className="p-2">{student.gender}</td>
                <td className="p-2">{student.primary_school_name}</td>
                <td className="p-2">{student.grade}</td>
                <td className="p-2">{student.stream}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditClick(student)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManager;







