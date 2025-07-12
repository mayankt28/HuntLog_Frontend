import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PrimaryButton, SecondaryButton } from './Button';
import { Input } from './FormElements';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <nav className="w-full bg-discord-dark px-6 py-3 shadow-arcade-shadow flex items-center justify-between relative z-50">
      <Link to="/" className="text-discord-accent font-pixel text-2xl hover:text-discord-primary">
        HuntLog
      </Link>

      {user && (
        <div className="flex-1 mx-6 max-w-md">
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-0"
          />
        </div>
      )}

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <SecondaryButton onClick={() => navigate('/')}>Home</SecondaryButton>
            <PrimaryButton onClick={() => navigate('/login')}>Login</PrimaryButton>
            <PrimaryButton onClick={() => navigate('/signup')}>Sign Up</PrimaryButton>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center focus:outline-none"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${user.email}&background=7289da&color=fff&rounded=true&bold=true`}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-discord-primary"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-discord-dark border border-discord-primary rounded-md shadow-arcade-shadow z-50">
                <div className="p-3 font-pixel text-discord-accent border-b border-discord-primary overflow-hidden truncate whitespace-nowrap max-w-[200px]">
                  Hello,<br></br> {user.email}
                </div>
                <ul className="text-discord-text text-sm">
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-discord-primary-dark"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-600 text-red-400"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
