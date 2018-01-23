// Application entrypoint.

// Load up the application styles
import Bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css';

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('react-root'));
