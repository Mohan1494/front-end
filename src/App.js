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
      setSentiment(data.sentiment); // Update sentiment state based on response
    } catch (error) {
      console.error('Error fetching sentiment:', error);
      setSentiment('error'); // Set sentiment to 'error' if request fails
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="app">
      <h1 className="title">News Sentiment Classifier</h1>
      <form onSubmit={handleSubmit} className="form">
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
        {sentiment === 'error' ? (
          <div className="error-message">Error fetching sentiment. Please try again.</div>
        ) : (
          sentiment !== 'none' && (
            <div className={`sentiment-result ${sentiment.toLowerCase().replace(" ", "-")}`}>
              {sentiment}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
