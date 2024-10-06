import React, { useState } from 'react';
import './App.css';

function App() {
  const [newsInput, setNewsInput] = useState('');
  const [sentiment, setSentiment] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://back-end-jis5.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newsInput }),  
      });
  
      const data = await response.json();
      setSentiment(data.sentiment); // assuming backend returns { sentiment: 'positive' }
    } catch (error) {
      console.error('Error fetching sentiment:', error);
    }
  };
  

  return (
    <div className="app">
      <h1>News Sentiment Classifier</h1>
      <textarea
        value={newsInput}
        onChange={(e) => setNewsInput(e.target.value)}
        placeholder="Enter news content here..."
      />
      <button onClick={handleSubmit}>Classify</button>

      <div className="sentiment-display">
        <div className={`sentiment-button ${sentiment === 'positive' ? 'active positive' : ''}`}>
          Positive
        </div>
        <div className={`sentiment-button ${sentiment === 'negative' ? 'active negative' : ''}`}>
          Negative
        </div>
        <div className={`sentiment-button ${sentiment === 'neutral' ? 'active neutral' : ''}`}>
          Neutral
        </div>
      </div>
    </div>
  );
}

export default App;
