import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-base-100 shadow-lg">
      <div className="container mx-auto navbar">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Steganografi Modern
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/embed">Embed</Link></li>
            <li><Link to="/extract">Extract</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;