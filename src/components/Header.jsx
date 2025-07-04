import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const menuItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/embed">Embed</Link></li>
      <li><Link to="/extract">Extract</Link></li>
      <li><Link to="/about">About</Link></li>
    </>
  );

  return (
    <header className="bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Steganografi PVD
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menuItems}
          </ul>
        </div>
        <div className="navbar-end">
          {/* Bisa ditambahkan komponen lain di sini jika perlu */}
        </div>
      </div>
    </header>
  );
};

export default Header;