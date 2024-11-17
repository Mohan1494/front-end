import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home'; // Import the home page
import './App.css';

function App() {
  const [newsInput, setNewsInput] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSentiment(null);

    try {
      const response = await fetch('https://bert-model-api.onrender.com/predict/', {
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
    <Router>
      <div className="app">
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/classifier" className="nav-link">Classifier</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/classifier"
            element={
              <div className="container">
                <h1 className="title">தமிழ்செய்தி உணர்வு வகைப்பாட்டு முறை</h1>
                <form className="form" onSubmit={handleSubmit}>
                  <textarea
                    className="textarea"
                    value={newsInput}
                    onChange={(e) => setNewsInput(e.target.value)}
                    placeholder="இங்கே செய்தி உள்ளடக்கத்தை உள்ளீடு செய்யவும்..."
                  />
                  <button type="submit" className="button" disabled={loading}>
                    {loading ? 'வகைப்படுத்தல்...' : 'வகைப்படுத்து'}
                  </button>
                </form>
                <div className="sentiment-display">
                  {loading ? (
                    <div className="loading-message">உணர்வு பகுப்பாய்வு செய்யப்படுகிறது...</div>
                  ) : sentiment ? (
                    sentiment === 'error' ? (
                      <div className="error-message">உணர்வைப் பெறுவதில் பிழை. மீண்டும் முயற்சிக்கவும்.</div>
                    ) : (
                      <div className="sentiment-result">
                        <div
                          className={`sentiment-circle ${
                            sentiment === 'not favorable'
                              ? 'negative'
                              : sentiment === 'neutral'
                              ? 'neutral'
                              : sentiment === 'favorable'
                              ? 'positive'
                              : ''
                          }`}
                        ></div>
                        <div className="sentiment-label">{sentiment}</div>
                      </div>
                    )
                  ) : null}
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
