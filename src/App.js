import React, { useState } from 'react';
import './App.css';

function App() {
  const [newsInput, setNewsInput] = useState('');
  const [sentiment, setSentiment] = useState('none'); // Initial sentiment state
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state

    try {
      const response = await fetch('https://my-fastapi-app-16h4.onrender.com/predict/', { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newsInput }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to get error details from the response
        throw new Error(errorData.error || 'Network response was not ok'); // Handle response errors
      }

      const data = await response.json();
      console.log("Received response:", data); // Log response to verify the backend response structure
      setSentiment(data.sentiment); // Assuming backend returns { sentiment: 'Not Favorable' }
    } catch (error) {
      console.error('Error fetching sentiment:', error);
      setSentiment('error'); // Set sentiment to 'error' if request fails
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="app">
      <h1>News Sentiment Classifier</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newsInput}
          onChange={(e) => {
            setNewsInput(e.target.value);
            console.log("Input Text:", e.target.value); // Print input text to confirm it's captured correctly
          }}
          placeholder="Enter news content here..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Classifying...' : 'Classify'}
        </button>
      </form>

      <div className="sentiment-display">
        {sentiment === 'error' ? (
          <div className="error-message">Error fetching sentiment. Please try again.</div>
        ) : (
          <>
            <div className={`sentiment-button ${sentiment === 'Not Favorable' ? 'active negative' : ''}`}>
              Not Favorable
            </div>
            <div className={`sentiment-button ${sentiment === 'Neutral' ? 'active neutral' : ''}`}>
              Neutral
            </div>
            <div className={`sentiment-button ${sentiment === 'Favorable' ? 'active positive' : ''}`}>
              Favorable
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
