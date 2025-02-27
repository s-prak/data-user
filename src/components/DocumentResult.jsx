import '../styles/components/DocumentResults.css';

const DocumentResults = ({ docs }) => (
  <div className="results-container">
    <h3>Results:</h3>
    <pre>{JSON.stringify(docs, null, 2)}</pre>
  </div>
);

export default DocumentResults;
