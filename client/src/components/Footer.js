import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: 'https://github.com/LihiniAthukorala',
      label: 'GitHub'
    },
    {
      icon: <Linkedin size={20} />,
      url: 'http://www.linkedin.com/in/lihini-athukorala-759803347',
      label: 'LinkedIn'
    },
    {
      icon: <Mail size={20} />,
      url: 'mailto:lihini0511@gmail.com',
      label: 'Email'
    },
    {
      icon: <Phone size={20} />,
      url: 'https://wa.me/94713873172',
      label: 'WhatsApp'
    }
  ];

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <span className="gradient-text">Lihini Athukorala</span>
            </Link>
            <p className="footer-description">
              Full Stack Developer passionate about creating beautiful and functional web applications.
              Based in Sri Lanka, specializing in JavaScript, Kotlin, and modern web development.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact</h3>
            <div className="contact-info">
              <p><Mail size={16} style={{verticalAlign: 'middle', marginRight: 6}}/> lihini0511@gmail.com</p>
              <p><Phone size={16} style={{verticalAlign: 'middle', marginRight: 6}}/> <a href="https://wa.me/94713873172" target="_blank" rel="noopener noreferrer">+94 71 387 3172 (WhatsApp)</a></p>
              <p><Linkedin size={16} style={{verticalAlign: 'middle', marginRight: 6}}/> <a href="http://www.linkedin.com/in/lihini-athukorala-759803347" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
              <p><Github size={16} style={{verticalAlign: 'middle', marginRight: 6}}/> <a href="https://github.com/LihiniAthukorala" target="_blank" rel="noopener noreferrer">GitHub</a></p>
              <p>Sri Lanka</p>
              <p>Available for opportunities</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Lihini Athukorala. All rights reserved.
            </p>
            <p className="made-with">
              Made with <Heart size={16} className="heart-icon" /> using React & Node.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 