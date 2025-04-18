import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/auth/slice"; 

import { Menu, X } from "lucide-react";
import { MdDashboard } from "react-icons/md";
import {
  FaUserGraduate,
  FaBook,
  FaRegClipboard,
  FaBookReader,
  FaListAlt,
} from "react-icons/fa";
import { BiBookAdd, BiBookAlt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

const menuItems = [
  { label: "Librarian Dashboard", icon: <MdDashboard />, path: "/dashboard" },
  { label: "Manage Students", icon: <FaUserGraduate />, path: "/students" },
  { label: "Manage Books", icon: <FaBook />, path: "/books" },
  { label: "Issue Book", icon: <BiBookAdd />, path: "/issue-book" },
  { label: "Return Book", icon: <BiBookAlt />, path: "/return-book" },
  { label: "View Records", icon: <FaRegClipboard />, path: "/records" },
  { label: "View Issued Books", icon: <FaBookReader />, path: "/issued-books" },
  { label: "Default List", icon: <FaListAlt />, path: "/default-list" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside
      className={`bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } min-h-screen p-4 flex flex-col`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 p-2 rounded hover:bg-gray-700 text-white self-end sm:self-start"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className="space-y-3 flex-1">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `p-2 rounded flex items-center gap-3 text-sm md:text-base transition-colors duration-200 ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}

        {/* Logout as a separate clickable item */}
        <button
          onClick={handleLogout}
          className="w-full text-left p-2 rounded flex items-center gap-3 text-sm md:text-base hover:bg-gray-700 transition-colors duration-200"
        >
          <span className="text-lg">
            <FiLogOut />
          </span>
          {isOpen && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;











