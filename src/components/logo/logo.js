import React from 'react';
import './logo.css';

export default function Logo() {
    return (
        <div className="logo-container">
            <img src={require('./job.png')} alt="logo" />
        </div>
    );
}
