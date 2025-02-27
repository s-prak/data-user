import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import DocumentResults from '../components/DocumentResult';
import { decrypt } from '../crypto/decrypt';

function DocumentsPage() {
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  const fetchAllDocuments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/DataUser');
      if (response.data && response.data.length > 0) {
        const decryptedDocuments = response.data.map(doc => decrypt(doc));
        setDocs(decryptedDocuments);
      } else {
        setDocs(null);
      }
    } catch (err) {
      setError('Error fetching all documents. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="documents-page">
      <h2>All Documents</h2>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {docs === null && !loading && <div>No documents found.</div>}
      {docs && docs.length > 0 && !loading && <DocumentResults docs={docs} />}
    </div>
  );
}

export default DocumentsPage;