import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import datasetImage from './assets/dataset-image.png'; // Update this path
import logisticRegressionImage from './assets/logistic.png'; // Update this path
import naiveBayesImage from './assets/naive-based.png'; // Update this path

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Tamil News Sentiment Analyzer</h1>
      <p>Analyze the sentiment of Tamil news articles with just a few clicks.</p>

      {/* Dataset Section */}
      <section className="dataset-section">
        <h2>Trained Dataset</h2>
        <p>
          We have used a dataset of Tamil news articles to train our sentiment analysis models. 
          The dataset contains positive, neutral, and negative examples of news.
        </p>
        <img src={datasetImage} alt="Dataset Example" className="dataset-image" />
      </section>

      {/* Model Results Section */}
      <section className="model-results-section">
        <h2>Model Accuracy</h2>
        <div className="model-results">
          <div className="model-result left">
            <h3>Logistic Regression</h3>
            <p>Accuracy: 0.85</p> {/* Replace with your actual accuracy value */}
            <img src={logisticRegressionImage} alt="Logistic Regression Accuracy" style={{ maxWidth: '300px', maxHeight: '200px' }}/>
          </div>
          <div className="model-result right">
            <h3>Naive Bayes</h3>
            <p>Accuracy: 0.90</p> {/* Replace with your actual accuracy value */}
            <img src={naiveBayesImage} alt="Naive Bayes Accuracy" style={{ maxWidth: '300px', maxHeight: '200px' }}/>
          </div>
        </div>
      </section>

      {/* Sample Input and Output Section */}
      <section className="sample-input-section">
        <h2>Sample Input and Model Results</h2>
        <div className="sample-result">
          <h3>Logistic Regression</h3>
          <p>Input: "தமிழக அரசின் கொள்கைகள் மக்களின் நலனுக்கு சாதகமாக உள்ளன"</p>
          <p>Predicted Sentiment: Positive</p>
        </div>
        <div className="sample-result">
          <h3>Naive Bayes</h3>
          <p>Input: "தமிழக அரசின் கொள்கைகள் மக்களின் நலனுக்கு சாதகமாக உள்ளன"</p>
          <p>Predicted Sentiment: Positive</p>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="challenges-section">
        <h2>Challenges Faced</h2>
        <p>During the development of this project, some challenges we encountered include:</p>
        <ul>
          <li>Data preprocessing for Tamil text analysis.</li>
          <li>Handling imbalanced datasets.</li>
          <li>Optimizing model accuracy while ensuring minimal overfitting.</li>
          <li>Deployment of the machine learning models into a production environment.</li>
        </ul>
      </section>

      {/* Link to Classifier */}
      <Link to="/classifier">
        <button className="button">Get Started</button>
      </Link>
    </div>
  );
}

export default Home;
