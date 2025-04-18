import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { MdDashboard } from "react-icons/md";
import { FaUserGraduate, FaBook, FaRegClipboard, FaBookReader, FaListAlt } from "react-icons/fa";
import { BiBookAdd, BiBookAlt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

const menuItems = [
  { label: "Librarian Dashboard", icon: <MdDashboard /> },
  { label: "Manage Students", icon: <FaUserGraduate /> },
  { label: "Manage Books", icon: <FaBook /> },
  { label: "Issue Book", icon: <BiBookAdd /> },
  { label: "Return Book", icon: <BiBookAlt /> },
  { label: "View Records", icon: <FaRegClipboard /> },
  { label: "View Issued Books", icon: <FaBookReader /> },
  { label: "Default List", icon: <FaListAlt /> },
  { label: "Logout", icon: <FiLogOut /> },
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
          <Link
            key={index}
            to="#"
            className="hover:bg-gray-700 p-2 rounded flex items-center gap-3 text-sm md:text-base"
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen ? <span>{item.label}</span> : null}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;







