import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Lihini Athukorala - Portfolio</title>
        <meta name="description" content="Professional portfolio website showcasing projects, skills, and experience" />
        <meta name="keywords" content="portfolio, developer, web developer, full stack, MERN stack, JavaScript, Kotlin" />
        <meta name="author" content="Lihini Athukorala" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App; 