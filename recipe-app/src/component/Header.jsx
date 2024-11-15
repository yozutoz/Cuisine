import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
      setSearch('');
    }
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">Cookbook</Link>
        <nav className="nav">
          <Link to="/recipes" className="logo">All Recipes</Link>
          <Link to="/random" className="logo">Random Recipe</Link>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}

export default Header;