import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DocumentsPage from './pages/DocumentsPage';
import NavBar from './components/Navbar';

function App() {
  return (
    <Router>
      <NavBar /> {/* Add NavBar here */}
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
