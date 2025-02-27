import { Link } from 'react-router-dom';
import '../styles/components/NavBar.css';

function NavBar() {
  return (
    <nav className="nav-bar">
      <h1 className="logo">📄 DocSearch</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">Search Documents</Link>
        <Link to="/documents" className="nav-link">View All Documents</Link>
      </div>
    </nav>
  );
}

export default NavBar;