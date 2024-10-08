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
            <p>Accuracy: 0.6877</p> {/* Replace with your actual accuracy value */}
            <img src={logisticRegressionImage} alt="Logistic Regression Accuracy" style={{ maxWidth: '300px', maxHeight: '200px' }}/>
          </div>
          <div className="model-result right">
            <h3>Naive Bayes</h3>
            <p>Accuracy: 0.6087</p> {/* Replace with your actual accuracy value */}
            <img src={naiveBayesImage} alt="Naive Bayes Accuracy" style={{ maxWidth: '300px', maxHeight: '200px' }}/>
          </div>
        </div>
      </section>

      {/* Sample Input and Output Section */}
      <section className="sample-input-section">
        <h2>Sample Input and Model Results</h2>
        <div className="sample-result">
          <h3>Logistic Regression</h3>
          <p>Input: "ஹைதராபாத்: நாட்டின் மிகப்பெரிய சைபர் மோசடிகளில் ஒன்றாக, ஓய்வு பெற்ற அரசு அதிகாரியிடம் ரூ.13 கோடியை அபேஸ் செய்த சம்பவம், தெலுங்கானாவில் நடந்துள்ளது. தெலுங்கானா மாநிலத்தை சேர்ந்தவர், பொதுத்துறை நிறுவனத்தில் மூத்த மேலாளராக பணியாற்றி ஓய்வு பெற்றவர். 75 வயதான இவரிடம், பணம் நிறைய இருந்தது. அதை ஏதாவது ஒன்றில் முதலீடு செய்து மேலும் சம்பாதிக்க ஆசைப்பட்டார். அப்போது அவருக்கு வாட்ஸ்அப்பில் ஒரு மெசேஜ் வந்தது. அதன்படி முதலீடு செய்தால் பணம் நிறைய சம்பாதிக்கலாம் என்று கூறப்பட்டிருந்தது. அந்த மர்ம நபர்கள் குறிப்பிட்ட மொபைல் செயலி மூலம் 4 கோடி ரூபாயை முதலீடு செய்தார், அந்த ஓய்வு பெற்ற அதிகாரி. ஒரு சில நாட்களிலேயே, அந்த முதலீடு பணம், 10 கோடியாக பெருகி விட்டது. குறிப்பிட்ட அந்த மொபைல் செயலியில் அவரது கணக்கில் 10 கோடி ரூபாய் பணம் இருப்பதாக காட்டியது."          "</p>
          <p>Predicted Sentiment: Neutral</p>
        </div>
        <div className="sample-result">
          <h3>Naive Bayes</h3>
          <p>Input: "ஹைதராபாத்: நாட்டின் மிகப்பெரிய சைபர் மோசடிகளில் ஒன்றாக, ஓய்வு பெற்ற அரசு அதிகாரியிடம் ரூ.13 கோடியை அபேஸ் செய்த சம்பவம், தெலுங்கானாவில் நடந்துள்ளது. தெலுங்கானா மாநிலத்தை சேர்ந்தவர், பொதுத்துறை நிறுவனத்தில் மூத்த மேலாளராக பணியாற்றி ஓய்வு பெற்றவர். 75 வயதான இவரிடம், பணம் நிறைய இருந்தது. அதை ஏதாவது ஒன்றில் முதலீடு செய்து மேலும் சம்பாதிக்க ஆசைப்பட்டார். அப்போது அவருக்கு வாட்ஸ்அப்பில் ஒரு மெசேஜ் வந்தது. அதன்படி முதலீடு செய்தால் பணம் நிறைய சம்பாதிக்கலாம் என்று கூறப்பட்டிருந்தது. அந்த மர்ம நபர்கள் குறிப்பிட்ட மொபைல் செயலி மூலம் 4 கோடி ரூபாயை முதலீடு செய்தார், அந்த ஓய்வு பெற்ற அதிகாரி. ஒரு சில நாட்களிலேயே, அந்த முதலீடு பணம், 10 கோடியாக பெருகி விட்டது. குறிப்பிட்ட அந்த மொபைல் செயலியில் அவரது கணக்கில் 10 கோடி ரூபாய் பணம் இருப்பதாக காட்டியது."          "</p>
          <p>Predicted Sentiment: Neutral</p>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="challenges-section">
        <h2>Challenges Faced</h2>
        <p>During the development of this project, some challenges we encountered include:</p>
        <ul>
          <li>Web Scraping Handling unwanted content during web scraping, such as advertisements and comments, to ensure the extraction of relevant body text from e-news websites</li>
          <li>Model Performance :Due to the challenges posed by the Tamil language, the model's accuracy is relatively low at 0.6877, and the precision metrics in the test results are also inaccurate.</li>
          
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
