import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaUser,
  FaCog,
  FaChartLine,
  FaChevronDown,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const routes = [
  { to: "/", label: "Home", icon: <FaHome /> },
  {
    label: "Analytics",
    icon: <FaChartLine />,
    children: [
      { to: "/reports", label: "Reports" },
      { to: "/stats", label: "Stats" },
    ],
  },
  { to: "/profile", label: "Profile", icon: <FaUser /> },
  { to: "/settings", label: "Settings", icon: <FaCog /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (idx) =>
    setOpenSubmenu((prev) => (prev === idx ? null : idx));

  return (
    <div className="flex h-screen bg-gray-800 text-gray-200 z-40">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 transition-all duration-300 flex flex-col shadow-xl`}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <span
            className={`text-2xl font-bold tracking-wider ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            } transition-opacity`}
          >
            MyApp
          </span>
          <button onClick={toggleSidebar} className="p-1 hover:text-blue-400">
            <FaBars size={20} />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {routes.map((route, idx) => (
            <div key={idx}>
              {route.children ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(idx)}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{route.icon}</span>
                      {isOpen && <span>{route.label}</span>}
                    </div>
                    {isOpen && (
                      <FaChevronDown
                        className={`transition-transform ${
                          openSubmenu === idx ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    )}
                  </button>
                  {openSubmenu === idx && isOpen && (
                    <div className="ml-8 flex flex-col space-y-1">
                      {route.children.map((sub, subIdx) => (
                        <NavLink
                          key={subIdx}
                          to={sub.to}
                          className={({ isActive }) =>
                            `p-2 rounded-lg hover:bg-blue-500 transition-colors ${
                              isActive
                                ? "bg-blue-700 text-white font-semibold"
                                : "text-gray-300"
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={route.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive
                        ? "bg-blue-700 text-white font-semibold"
                        : "text-gray-300"
                    }`
                  }
                >
                  <span className="text-lg">{route.icon}</span>
                  {isOpen && <span>{route.label}</span>}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-blue-600 transition-colors">
            <FaUser />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Content</h1>
        <p className="mt-4 text-gray-600">Your application’s main area.</p>
      </div>
    </div>
  );
};

export default Sidebar;
