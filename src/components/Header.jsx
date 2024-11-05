// src/components/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-8 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        {/* アニメの道 (Anime no Michi) – "Path of Anime" */}
        <Link to="/" className="text-2xl font-bold">
        アニメの道
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <NavLink
            to="/"
            exact
            activeClassName="text-purple-500"
            className="hover:text-purple-400"
          >
            Home
          </NavLink>
          <NavLink
            to="/my-list"
            activeClassName="text-purple-500"
            className="hover:text-purple-400"
          >
            My List
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
