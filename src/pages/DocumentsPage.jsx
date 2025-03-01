import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import Card from '../components/Card';
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
        setDocs(response.data);
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
    <div className="documents-page max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">All Documents</h2>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error-message text-red-500">{error}</div>}
      {docs === null && !loading && <div>No documents found.</div>}
      {docs && docs.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {docs.map((doc) => (
            <Card key={doc.id} title={`Keyword: ${doc.keyword}`}>
              <p className="text-gray-600">Content: {doc.document}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentsPage;
