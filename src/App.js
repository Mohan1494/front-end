import React, { useState } from 'react';
import './App.css';

function App() {
  const [newsInput, setNewsInput] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSentiment(''); // Clear previous sentiment

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
        setSentiment(data.sentiment.trim().toLowerCase());
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
      setSentiment('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">News Sentiment Classifier</h1>
        <form className="form" onSubmit={handleSubmit}>
          <textarea
            className="textarea"
            value={newsInput}
            onChange={(e) => setNewsInput(e.target.value)}
            placeholder="Enter news content here..."
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Classifying...' : 'Classify'}
          </button>
        </form>

        <div className="sentiment-display">
          {loading ? (
            <div className="loading-message">Analyzing sentiment...</div>
          ) : sentiment ? (
            sentiment === 'error' ? (
              <div className="error-message">Error fetching sentiment. Please try again.</div>
            ) : (
              <div className={`sentiment-result ${sentiment.replace(/\s+/g, '-')}`}>
                {sentiment}
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
