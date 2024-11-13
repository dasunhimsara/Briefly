import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/summarize", {
        text: text,
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error during summarization:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/text.jpg)', // Replace with your image URL or path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px)',
        zIndex: -1
      }} />

      {/* Content Container */}
      <div style={{
        maxWidth: '600px',
        width: '100%',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1,
      }}>
        {/* Title */}
      <h1 style={{
        fontFamily: "'Pacifico', cursive",
        fontSize: '3rem',
        color: '#333',
        zIndex: 1,
        marginBottom: '20px',
        textAlign: 'center'
      }}>Briefly</h1>

        <p style={{ color: '#666', marginBottom: '20px', textAlign: 'center' }}>A simple text summarization tool.</p>

        <textarea
          placeholder="Enter text to summarize..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            height: '150px',
            marginBottom: '20px',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            outline: 'none',
            resize: 'none',
          }}
        />

        <button
          onClick={handleSummarize}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: loading ? '#aaa' : '#007BFF',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {loading && <p style={{ textAlign: 'center', marginTop: '10px' }}>Loading...</p>}

        {summary && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e9f5ff',
            borderRadius: '4px',
            border: '1px solid #b3d4fc'
          }}>
            <h3>Summary:</h3>
            <p style={{ color: '#444', lineHeight: '1.6' }}>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
