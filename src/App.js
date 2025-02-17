import './App.css';
import api from './api/axiosConfig';
import { useState } from 'react';

// Reusable InputField component
const InputField = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="input-field"
  />
);

// Reusable Button component
const Button = ({ onClick, text }) => (
  <button onClick={onClick} className="search-button">
    {text}
  </button>
);

// Reusable DocumentResults component
const DocumentResults = ({ docs }) => (
  <div className="results-container">
    <h3>Results:</h3>
    <pre>{JSON.stringify(docs, null, 2)}</pre>
  </div>
);

// No results found component
const NoResultsFound = () => (
  <div className="no-results">
    <h3>No matches found</h3>
  </div>
);

function App() {
  const [keyword, setKeyword] = useState('');
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getDocs = async () => {
    if (!keyword) {
      setError("Please enter a keyword.");
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await api.get(`/DataUser/${keyword}`);
      if (response.data === null || response.data.length === 0) {
        setDocs(null);  // Set docs to null to trigger NoResultsFound
      } else {
        setDocs(response.data); // Otherwise, store the results
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>Search Documents</h2>
      <div className="input-container">
        <InputField
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
        />
        <Button onClick={getDocs} text="Search" />
      </div>

      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {/* Check if docs is null or empty */}
      {docs === null && !loading && <NoResultsFound />}
      {docs && docs.length > 0 && !loading && <DocumentResults docs={docs} />}
    </div>
  );
}

export default App;
