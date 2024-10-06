import React, { useState } from 'react';
import './App.css';

function App() {
  const [newsInput, setNewsInput] = useState('');
  const [sentiment, setSentiment] = useState('none');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://my-fastapi-app-16h4.onrender.com/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newsInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      setSentiment(data.sentiment);
    } catch (error) {
      console.error('Error fetching sentiment:', error);
      setSentiment('error');
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
        {sentiment === 'error' ? (
          <div className="error-message">Error fetching sentiment. Please try again.</div>
        ) : (
          <>
            <div className={`sentiment-button ${sentiment === 'negative' ? 'active negative' : ''}`}>
              Not Favorable
            </div>
            <div className={`sentiment-button ${sentiment === 'neutral' ? 'active neutral' : ''}`}>
              Neutral
            </div>
            <div className={`sentiment-button ${sentiment === 'positive' ? 'active positive' : ''}`}>
              Favorable
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
