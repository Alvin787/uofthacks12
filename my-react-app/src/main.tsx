import { useState, useEffect } from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function FlaskMessages() {
  const [currMessage, setCurrMessage] = useState("null");

  useEffect(() => {
    fetch('http://127.0.0.1:5000/vulnerabilities/lodash/NPM').then(res => res.json()).then(data => {
      setCurrMessage(data[0].severity);
    });
  }, []);

  return(
    <>
      <h1>Security</h1>
      <div className="card">
        <p>FLASK MESSAGE: {currMessage}.</p>
      </div>
    </>)
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FlaskMessages />
  </StrictMode>,
)
