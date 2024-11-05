// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MyList from './pages/MyList';
import AnimeDetail from './pages/AnimeDetail';

const App = () => {
  return (
    <Router>
      <Header /> {/* Header added here for consistent navigation */}
      <main className="py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          {/* Additional routes for Series, Movies, etc. can be added here */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
