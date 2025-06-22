import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./styles/global/border.css"
import "./styles/global/box.css"
import "./styles/global/position.css"
import "./styles/global/text.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

