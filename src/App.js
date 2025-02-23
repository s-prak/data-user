import './App.css';
import api from './api/axiosConfig';
import { useState } from 'react';
import InputField from './components/InputField';
import Button from './components/Button';
import DocumentResults from './components/DocumentResult';
import NoResultsFound from './components/NoResultsFound';
import { encrypt } from './crypto/encrypt';
import { decrypt } from './crypto/decrypt';

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

    const encryptedKeyword=encrypt(keyword);
    
    try {
      const response = await api.get(`/DataUser/${encryptedKeyword}`);
      if (response.data === null || response.data.length === 0) {
        setDocs(null);  // Set docs to null to trigger NoResultsFound
      } else {
        const decryptedDocument= decrypt(response.data);
        setDocs(decryptedDocument); // Otherwise, store the results
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