import { useState } from "react";
import { NavLink } from "react-router-dom";
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
  { label: "Logout", icon: <FiLogOut />, path: "/logout" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

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

      <nav className="space-y-3">
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
            {isOpen ? <span>{item.label}</span> : null}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;












