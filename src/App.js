// src/App.js

import React from 'react';
import './App.css';
import SubjectForm from './Components/SubjectForm';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Subject Management</h1>
            </header>
            <main>
                <SubjectForm />
            </main>
        </div>
    );
};

export default App;
