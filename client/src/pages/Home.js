import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink, Code, Database, Server, Star, Sparkles, Wrench, BookOpen, Layers, Circle } from 'lucide-react';
import axios from 'axios';
import './Home.css';

// Typing Animation Component
const TypingAnimation = ({ text, className, delay = 0, speed = 100, pauseTime = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (!isDeleting && currentIndex < text.length) {
      // Typing phase
      setIsTyping(true);
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex >= text.length) {
      // Pause before deleting
      setIsTyping(false);
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    } else if (isDeleting && displayText.length > 0) {
      // Deleting phase
      setIsTyping(true);
      const deleteTimeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, speed / 2); // Delete faster than typing
      return () => clearTimeout(deleteTimeout);
    } else if (isDeleting && displayText.length === 0) {
      // Reset for next cycle
      setIsDeleting(false);
      setCurrentIndex(0);
      setIsTyping(false);
      const resetTimeout = setTimeout(() => {
        setIsTyping(true);
      }, 500); // Small pause before starting again
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, text, speed, started, isDeleting, displayText, pauseTime]);

  return (
    <span className={`${className} typing-text`}>
      {displayText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ 
            marginLeft: '2px',
            color: '#667eea',
            fontWeight: 'bold'
          }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Mouse move effect for hero section
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Start typing animation after initial animation
  useEffect(() => {
    setStartTyping(false);
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          axios.get('/api/projects/featured'),
          axios.get('/api/skills/featured')
        ]);
        setFeaturedProjects(projectsRes.data);
        setSkills(skillsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const skillCategories = [
    {
      icon: <Code />, title: "Programming Language", color: "#3B82F6", items: [
        "Python", "Java", "C", "R", "Kotlin", "C#", "C++", "JavaScript", "HTML", "CSS", "PHP"
      ]
    },
    {
      icon: <Wrench />, title: "Tools & IDE's", color: "#10B981", items: [
        "GitHub", "VS Code", "Eclipse", "Android Studio", "Visual Studio", "Figma", "IntelliJ IDEA", "IDLE Python"
      ]
    },
    {
      icon: <BookOpen />, title: "Web Development Frameworks & Libraries", color: "#F59E0B", items: [
        "React.js", "Node.js", "Spring Boot", "Bootstrap (CSS)", "Firebase", "WordPress"
      ]
    },
    {
      icon: <Database />, title: "DataBases", color: "#764ba2", items: [
        "XAMPP", "MySQL Workbench", "MongoDB", "SQL Sever Management Studio"
      ]
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {/* Animated background elements */}
        <motion.div
          className="floating-elements"
          style={{ y }}
        >
          <motion.div
            className="floating-star"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: '10%',
              top: '20%'
            }}
          >
            <Star size={20} />
          </motion.div>
          
          <motion.div
            className="floating-sparkle"
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{
              right: '15%',
              top: '40%'
            }}
          >
            <Sparkles size={16} />
          </motion.div>
          
          <motion.div
            className="floating-star"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{
              left: '80%',
              top: '60%'
            }}
          >
            <Star size={16} />
          </motion.div>
        </motion.div>

        {/* Mouse follower effect */}
        <motion.div
          className="mouse-follower"
          animate={{
            x: mousePosition.x - 25,
            y: mousePosition.y - 25,
            scale: isHovered ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15
          }}
        />

        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {startTyping ? (
                <>
                  Hi, I'm <motion.span 
                    className="gradient-text"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    <TypingAnimation 
                      text="Lihini Athukorala" 
                      className="gradient-text"
                      speed={150}
                      pauseTime={3000}
                    />
                  </motion.span>
                </>
              ) : (
                "Hi, I'm Lihini Athukorala"
              )}
            </motion.h1>
            
            <motion.h2 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {startTyping ? (
                <TypingAnimation 
                  text={"Full Stack Developer | Mobile Application Developer"} 
                  className="hero-subtitle-text"
                  speed={120}
                  delay={2000}
                  pauseTime={2500}
                />
              ) : (
                "Full Stack Developer | Mobile Application Developer"
              )}
            </motion.h2>
            
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I create beautiful, functional, and user-friendly web applications 
              using modern technologies. Passionate about clean code and great user experiences.
              Based in Sri Lanka, I specialize in JavaScript, Kotlin, and modern web development.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/projects" className="btn btn-primary">
                  View My Work
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="btn btn-secondary">
                  Get In Touch
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="skills-overview section">
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2>What I Do</h2>
            <p>I specialize in building modern web applications with cutting-edge technologies</p>
          </motion.div>

          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className="skill-category card"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="skill-icon" 
                  style={{ color: category.color }}
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                >
                  {category.icon}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                >
                  {category.title}
                </motion.h3>
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  style={{ textAlign: 'left', margin: '0 auto', maxWidth: 300 }}
                >
                  {category.items.map((item, i) => (
                    <li key={i} style={{ color: '#a0a0a0', fontSize: '1rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Circle size={12} style={{ color: category.color, minWidth: 14 }} />
                      {item}
                    </li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2>Featured Projects</h2>
            <p>Some of my recent work that showcases my skills and creativity</p>
          </motion.div>

          {loading ? (
            <div className="loading"></div>
          ) : (
            <div className="projects-grid">
                          {featuredProjects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project._id}
                className="project-card card"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 2,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                  <motion.div 
                    className="project-image"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <motion.div 
                      className="project-tech"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                    >
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <motion.span 
                          key={i} 
                          className="tech-tag"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.6 + i * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                    <motion.div 
                      className="project-links"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
                    >
                      <motion.a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={20} />
                        Code
                      </motion.a>
                      {project.liveUrl && (
                        <motion.a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-link"
                          whileHover={{ scale: 1.1, x: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={20} />
                          Live
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            className="view-all-projects"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/projects" className="btn btn-secondary">
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  View All Projects
                </motion.span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 