import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './index.css';
import axios from 'axios';
import App from './components/App';
import Home from './components/Home'

let url = "https://login-portal-app.herokuapp.com/"

axios.defaults.baseURL = url;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element = {<App />}/>
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
