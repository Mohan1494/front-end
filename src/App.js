import React, { useState } from 'react';
import './App.css';

function App() {
  const [newsInput, setNewsInput] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSentiment(null); // Clear any previous sentiment

    try {
      const response = await fetch('https://my-fastapi-app-16h4.onrender.com/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newsInput }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data && data.sentiment) {
        setSentiment(data.sentiment.trim());
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
      setSentiment('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>News Sentiment Classifier</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newsInput}
          onChange={(e) => setNewsInput(e.target.value)}
          placeholder="Enter news content here..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Classifying...' : 'Classify'}
        </button>
      </form>

      <div className="sentiment-display">
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : sentiment ? (
          sentiment === 'Error' ? (
            <div className="error-message">Error fetching sentiment. Please try again.</div>
          ) : (
            <div className="sentiment-result">
              <div
                className={`sentiment-circle ${
                  sentiment === 'Not Favorable'
                    ? 'negative'
                    : sentiment === 'Neutral'
                    ? 'neutral'
                    : 'positive'
                }`}
              ></div>
              <div className="sentiment-label">{sentiment}</div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default App;
