import './bootstrap';
import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Portfolio from './components/Portfolio';

if (document.getElementById('root')) {
    createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <Portfolio />
        </React.StrictMode>
    );
}
