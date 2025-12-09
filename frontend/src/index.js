import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Suppress ResizeObserver errors (these are harmless warnings from vis-network library)
// They don't affect functionality, just clutter the console
const suppressResizeObserverErrors = () => {
  // Suppress console errors
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' && 
      (args[0].includes('ResizeObserver') || 
       args[0].includes('ResizeObserver loop'))
    ) {
      return;
    }
    originalError.apply(console, args);
  };

  // Catch unhandled errors
  window.addEventListener('error', (event) => {
    if (
      event.message && 
      (event.message.includes('ResizeObserver') || 
       event.message.includes('ResizeObserver loop'))
    ) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return false;
    }
  });

  // Also suppress in the error handler
  const originalOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (typeof message === 'string' && message.includes('ResizeObserver')) {
      return true;
    }
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };
};

suppressResizeObserverErrors();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

