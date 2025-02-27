import natural from "natural";
import { encrypt } from "./src/crypto/encrypt.js";
import { decrypt } from "./src/crypto/decrypt.js";

// 🔹 TF-IDF Model
const tfidf = new natural.TfIdf();

// 🔹 Simulated Database (Key: Encrypted Keyword, Value: [{ DocID, Score }])
let encryptedIndex = {};

// 🔹 Function to Add Documents Incrementally
const addDocument = (docId, content) => {
    tfidf.addDocument(content); // Add new document to the TF-IDF model

    let docIndex = tfidf.documents.length - 1;
    tfidf.listTerms(docIndex).forEach(({ term, tfidf }) => {
        let encryptedKeyword = encrypt(term);
        let encryptedDocId = encrypt(docId);
        let encryptedScore = encrypt(tfidf.toString());

        if (!encryptedIndex[encryptedKeyword]) {
            encryptedIndex[encryptedKeyword] = [];
        }

        // Append new doc entry to the existing index
        encryptedIndex[encryptedKeyword].push({ encryptedDocId, encryptedScore });
    });

    console.log(`Document ${docId} added successfully.`);
};

// 🔹 Search Function with Ranking
const searchEncrypted = (query) => {
    let encryptedQuery = encrypt(query);

    if (!encryptedIndex[encryptedQuery]) {
        console.log("No results found.");
        return;
    }

    let results = encryptedIndex[encryptedQuery];

    results.sort((a, b) => {
        return parseFloat(decrypt(b.encryptedScore)) - parseFloat(decrypt(a.encryptedScore));
    });

    console.log(`Results for query: "${query}"`);
    results.forEach((doc) => {
        console.log(`Doc ID: ${decrypt(doc.encryptedDocId)} | Score: ${decrypt(doc.encryptedScore)}`);
    });
};

// 🔹 Example Usage
addDocument("doc1", "machine learning is amazing");
addDocument("doc2", "deep learning helps artificial intelligence");
addDocument("doc3", "machine learning improves privacy");

// Search for encrypted keyword
searchEncrypted("machine");

// 🔹 Adding a new document later without deleting old ones
addDocument("doc4", "machine learning and AI are powerful");

// Search again after adding new documents
searchEncrypted("machine");
