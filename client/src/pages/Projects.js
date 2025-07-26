import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Filter } from 'lucide-react';
// import axios from 'axios';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Apps' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'desktop', name: 'Desktop Apps' },
    { id: 'other', name: 'Other' }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/LihiniAthukorala/repos?sort=updated&per_page=10');
        const repos = await response.json();
        const projects = repos.map((repo, index) => {
          const imageColors = ['667eea', '10b981', 'f59e0b', '8b5cf6', 'ef4444', '06b6d4'];
          const color = imageColors[index % imageColors.length];
          const image = `https://via.placeholder.com/400x250/${color}/ffffff?text=${encodeURIComponent(repo.name)}`;
          return {
            _id: repo.id,
            title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || `A ${repo.language || 'web'} project.`,
            image,
            technologies: repo.language ? [repo.language] : ['JavaScript'],
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || null,
            category: repo.language === 'Kotlin' ? 'mobile' : 'web'
          };
        });
        setProjects(projects);
        setFilteredProjects(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  return (
    <div className="projects-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>My Projects</h1>
          <p>Explore my portfolio of web applications, mobile apps, and other creative projects</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="filter-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => handleFilter(category.id)}
              >
                <Filter size={16} />
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="loading"></div>
        ) : (
          <motion.div
            ref={ref}
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                className="project-card card"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                      >
                        <Github size={20} />
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-link"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className={`project-category ${project.category}`}>
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Projects Message */}
        {!loading && filteredProjects.length === 0 && (
          <motion.div
            className="no-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3>No projects found</h3>
            <p>No projects match the selected filter. Try selecting a different category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects; 