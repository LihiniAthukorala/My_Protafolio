const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    // Fetch projects from GitHub API
    try {
      const response = await fetch('https://api.github.com/users/LihiniAthukorala/repos?sort=updated&per_page=10');
      const repos = await response.json();
      
      const projects = repos.map((repo, index) => {
        // Determine category based on repo name and language
        let category = 'web';
        if (repo.language === 'Kotlin' || repo.name.toLowerCase().includes('planty')) {
          category = 'mobile';
        }
        
        // Generate placeholder image based on repo name
        const imageColors = ['667eea', '10b981', 'f59e0b', '8b5cf6', 'ef4444', '06b6d4'];
        const color = imageColors[index % imageColors.length];
        const image = `https://via.placeholder.com/400x250/${color}/ffffff?text=${encodeURIComponent(repo.name)}`;
        
        return {
          _id: repo.id.toString(),
          title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: repo.description || `A ${repo.language || 'web'} project showcasing modern development practices.`,
          image: image,
          technologies: repo.language ? [repo.language] : ['JavaScript'],
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || null,
          featured: index < 3, // First 3 repos are featured
          category: category,
          createdAt: new Date(repo.created_at),
          updatedAt: new Date(repo.updated_at),
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language
        };
      });
      
      res.json(projects);
    } catch (githubError) {
      console.error('GitHub API error:', githubError);
      // Fallback to mock data if GitHub API fails
      const mockProjects = [
        {
          _id: '1',
          title: 'TravelEase',
          description: 'A comprehensive travel planning and management application with user-friendly interface and travel itinerary features.',
          image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=TravelEase',
          technologies: ['JavaScript', 'HTML', 'CSS', 'React'],
          githubUrl: 'https://github.com/LihiniAthukorala/TravelEase',
          liveUrl: null,
          featured: true,
          category: 'web',
          createdAt: new Date()
        },
        {
          _id: '2',
          title: 'Planty-Life',
          description: 'A plant care and management application helping users track and maintain their plants with care reminders.',
          image: 'https://via.placeholder.com/400x250/10b981/ffffff?text=Planty-Life',
          technologies: ['Kotlin', 'Android', 'Java'],
          githubUrl: 'https://github.com/LihiniAthukorala/Planty-Life',
          liveUrl: null,
          featured: true,
          category: 'mobile',
          createdAt: new Date()
        },
        {
          _id: '3',
          title: 'Personal Financial Tracker',
          description: 'A personal finance management application to track expenses, income, and financial goals.',
          image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=Finance+Tracker',
          technologies: ['JavaScript', 'HTML', 'CSS'],
          githubUrl: 'https://github.com/LihiniAthukorala/Personal-Financial-Tracker',
          liveUrl: null,
          featured: true,
          category: 'web',
          createdAt: new Date()
        }
      ];
      res.json(mockProjects);
    }
  }
});

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project
router.post('/', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    technologies: req.body.technologies,
    githubUrl: req.body.githubUrl,
    liveUrl: req.body.liveUrl,
    featured: req.body.featured,
    category: req.body.category
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project
router.patch('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    Object.keys(req.body).forEach(key => {
      project[key] = req.body[key];
    });

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 