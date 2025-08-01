import { useState } from 'react';
import { FaTimes, FaSearch, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ currentUser, onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchInput('');
    onSearch('');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <h1 className="logo-text">
            <span className="logo-light">Panch</span>
            <span className="logo-dark">karma</span>
          </h1>
        </Link>

        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchInput}
            onChange={handleSearchChange}
          />
          {searchInput ? (
            <FaTimes className="search-clear-icon" onClick={clearSearch} title="Clear" />
          ) : (
            <FaSearch className="search-icon" />
          )}
        </form>
        <button
          className="hamburger-btn"
          aria-label="Open menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <FaBars />
        </button>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li>
            {currentUser ? (
              <div className="auth-logged-in">
                <Link to="/profile" className="profile-link">
                  <img
                    src={currentUser.avatar || '/assets/avatar.png'}
                    alt="avatar"
                    className="header-avatar"
                  />
                </Link>
              </div>
            ) : (
              <Link to="/sign-in" className="nav-link">Sign In</Link>
            )}
          </li>
        </ul>
      </div>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
          <FaTimes />
        </button>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li>
            {currentUser ? (
              <Link to="/profile" onClick={closeMenu}>Profile</Link>
            ) : (
              <Link to="/sign-in" onClick={closeMenu}>Sign In</Link>
            )}
          </li>
        </ul>
      </div>
      {menuOpen && <div className="mobile-menu-overlay" onClick={closeMenu} />}
    </header>
  );
};

export default Header;
