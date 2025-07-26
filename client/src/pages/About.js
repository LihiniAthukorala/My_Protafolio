import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Mail, Linkedin, Github, MapPin, Calendar, User } from 'lucide-react';
import axios from 'axios';
import GitHubStats from '../components/GitHubStats';
import './About.css';

const About = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const experience = [
    {
      year: '2023 - Present',
      title: 'Full Stack Developer',
      company: 'Tech Company',
      description: 'Building scalable web applications using modern technologies and best practices.'
    },
    {
      year: '2022 - 2023',
      title: 'Frontend Developer',
      company: 'Startup',
      description: 'Developed responsive user interfaces and improved user experience.'
    },
    {
      year: '2021 - 2022',
      title: 'Junior Developer',
      company: 'Digital Agency',
      description: 'Worked on various client projects and learned industry best practices.'
    }
  ];

  // Replace the education array with the new entries
  const education = [
    {
      institution: 'Sri Lanka Institute of Information Technology',
      degree: 'BSc (Hons) degree in Information Technology',
      date: 'July 2023 - Present',
      description: null
    },
    {
      institution: 'Diploma in Information Technology',
      degree: 'ESoft Metro Campus, Gampaha',
      date: 'February 2023 - February 2024',
      description: null
    },
    {
      institution: 'Diploma in English',
      degree: 'ESoft Metro Campus, Gampaha',
      date: 'February 2023 - October 2023',
      description: null
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>About Me</h1>
          <p>Get to know me better - my journey, skills, and what drives me</p>
        </motion.div>

        {/* Personal Info */}
        <motion.div
          className="personal-info section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="info-grid">
            <div className="info-card card">
              <div className="info-header">
                <User size={24} />
                <h3>Personal Information</h3>
              </div>
              <div className="info-content">
                <div className="info-item">
                  <MapPin size={16} />
                  <span>Location: Sri Lanka</span>
                </div>
                <div className="info-item">
                  <Mail size={16} />
                  <span>Email: lihini0511@gmail.com</span>
                </div>
                <div className="info-item">
                  <Calendar size={16} />
                  <span>Available: Open to opportunities</span>
                </div>
              </div>
            </div>

            <div className="info-card card">
              <div className="info-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="action-buttons">
                <a href="https://drive.google.com/uc?export=download&id=1mDh-ZEs0ycDU8ndP2-bQ0dj-Sb3haDXy" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  <Download size={16} />
                  Download Resume
                </a>
                <a href="mailto:lihini.athukorala@gmail.com" className="btn btn-secondary">
                  <Mail size={16} />
                  Send Email
                </a>
              </div>
              <div className="social-links">
                <a href="http://www.linkedin.com/in/lihini-athukorala-759803347" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/LihiniAthukorala" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Text */}
        <motion.div
          className="about-text section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="card">
            <h2>My Story</h2>
            <p>
              I'm a passionate Full Stack Developer from Sri Lanka with a love for creating beautiful, 
              functional, and user-friendly applications. My journey in development began during my 
              university years, where I discovered my passion for turning ideas into reality through code.
            </p>
            <p>
              With expertise in JavaScript, Kotlin, and modern web technologies, I specialize in building 
              both web and mobile applications that solve real-world problems. I believe in writing clean, 
              maintainable code and staying up-to-date with the latest industry trends and best practices.
            </p>
            <p>
              My projects include TravelEase for travel planning, Planty-Life for plant care management, 
              and a Personal Financial Tracker. When I'm not coding, you can find me exploring new 
              technologies, contributing to open-source projects, or sharing my knowledge with the 
              developer community. I'm always eager to learn new things and take on challenging projects 
              that push my skills to the next level.
            </p>
          </div>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          className="github-section section"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <GitHubStats />
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          ref={ref}
          className="skills-section section"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-header">
            <h2>Technical Skills</h2>
            <p>Technologies and tools I work with</p>
          </div>

          {loading ? (
            <div className="loading"></div>
          ) : (
            <div className="skills-container">
              {['frontend', 'backend', 'database'].map((category) => (
                <div key={category} className="skill-category">
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                  <div className="skills-list">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill) => (
                        <div key={skill._id} className="skill-item">
                          <div className="skill-info">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-level">{skill.proficiency}%</span>
                          </div>
                          <div className="skill-bar">
                            <div 
                              className="skill-progress" 
                              style={{ 
                                width: `${skill.proficiency}%`,
                                backgroundColor: skill.color || '#667eea'
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Experience */}
        <motion.div
          className="experience-section section"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="section-header">
            <h2>Experience</h2>
            <p>My professional journey</p>
          </div>

          <div className="timeline">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="timeline-content card">
                  <div className="timeline-year">{exp.year}</div>
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          className="education-section section"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="section-header">
            <h2>Education</h2>
            <p>My academic background</p>
          </div>

          <div className="education-list">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="education-item card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <div>
                    <h3 style={{ marginBottom: '0.2rem' }}><b>{edu.institution}</b></h3>
                    {edu.degree && <ul style={{ margin: 0, paddingLeft: '1.2em' }}><li>{edu.degree}</li></ul>}
                  </div>
                  <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '2rem' }}>{edu.date}</div>
                </div>
                {edu.description && <p>{edu.description}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 