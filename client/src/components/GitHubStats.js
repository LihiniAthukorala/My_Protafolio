import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitBranch, Users, Calendar } from 'lucide-react';
import axios from 'axios';
import './GitHubStats.css';

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/github/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="github-stats loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <motion.div
      className="github-stats"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="stats-header">
        <Github size={24} />
        <h3>GitHub Statistics</h3>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Github size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.totalRepos}</span>
            <span className="stat-label">Repositories</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Star size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.totalStars}</span>
            <span className="stat-label">Stars</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <GitBranch size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.totalForks}</span>
            <span className="stat-label">Forks</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
        </div>
      </div>

      {stats.topLanguages && stats.topLanguages.length > 0 && (
        <div className="top-languages">
          <h4>Top Languages</h4>
          <div className="languages-list">
            {stats.topLanguages.map((lang, index) => (
              <div key={index} className="language-item">
                <span className="language-name">{lang.language}</span>
                <span className="language-count">{lang.count} repos</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="github-link">
        <a 
          href="https://github.com/LihiniAthukorala" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          <Github size={16} />
          View GitHub Profile
        </a>
      </div>
    </motion.div>
  );
};

export default GitHubStats; 