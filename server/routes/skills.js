const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ proficiency: -1 });
    res.json(skills);
  } catch (error) {
    // Fetch skills from GitHub API
    try {
      const response = await fetch('https://api.github.com/users/LihiniAthukorala/repos?per_page=100');
      const repos = await response.json();
      
      // Count languages used in repositories
      const languageCount = {};
      repos.forEach(repo => {
        if (repo.language) {
          languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
        }
      });
      
      // Convert to skills array
      const skills = Object.entries(languageCount).map(([language, count], index) => {
        // Determine category and color based on language
        let category = 'other';
        let color = '#6B7280';
        
        if (['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React'].includes(language)) {
          category = 'frontend';
          color = language === 'JavaScript' ? '#F7DF1E' : 
                  language === 'TypeScript' ? '#3178C6' :
                  language === 'HTML' ? '#E34F26' :
                  language === 'CSS' ? '#1572B6' : '#61DAFB';
        } else if (['Kotlin', 'Java', 'Android'].includes(language)) {
          category = 'mobile';
          color = language === 'Kotlin' ? '#7F52FF' :
                  language === 'Java' ? '#ED8B00' : '#3DDC84';
        } else if (['Python', 'Node.js', 'PHP'].includes(language)) {
          category = 'backend';
          color = language === 'Python' ? '#3776AB' :
                  language === 'Node.js' ? '#339933' : '#777BB4';
        }
        
        // Calculate proficiency based on repo count (max 100%)
        const proficiency = Math.min(count * 20, 100);
        
        return {
          _id: (index + 1).toString(),
          name: language,
          category: category,
          proficiency: proficiency,
          color: color,
          featured: index < 5 // Top 5 languages are featured
        };
      });
      
      // Sort by proficiency
      skills.sort((a, b) => b.proficiency - a.proficiency);
      
      res.json(skills);
    } catch (githubError) {
      console.error('GitHub API error:', githubError);
      // Fallback to mock data if GitHub API fails
      const mockSkills = [
        { _id: '1', name: 'JavaScript', category: 'frontend', proficiency: 90, color: '#F7DF1E', featured: true },
        { _id: '2', name: 'Kotlin', category: 'mobile', proficiency: 85, color: '#7F52FF', featured: true },
        { _id: '3', name: 'React', category: 'frontend', proficiency: 80, color: '#61DAFB', featured: true },
        { _id: '4', name: 'HTML5', category: 'frontend', proficiency: 95, color: '#E34F26', featured: true },
        { _id: '5', name: 'CSS3', category: 'frontend', proficiency: 90, color: '#1572B6', featured: false },
        { _id: '6', name: 'Java', category: 'mobile', proficiency: 85, color: '#ED8B00', featured: false },
        { _id: '7', name: 'Android', category: 'mobile', proficiency: 80, color: '#3DDC84', featured: false },
        { _id: '8', name: 'Git', category: 'other', proficiency: 85, color: '#F05032', featured: false },
        { _id: '9', name: 'Node.js', category: 'backend', proficiency: 75, color: '#339933', featured: false },
        { _id: '10', name: 'Express.js', category: 'backend', proficiency: 70, color: '#000000', featured: false }
      ];
      res.json(mockSkills);
    }
  }
});

// Get skills by category
router.get('/category/:category', async (req, res) => {
  try {
    const skills = await Skill.find({ category: req.params.category }).sort({ proficiency: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured skills
router.get('/featured', async (req, res) => {
  try {
    const skills = await Skill.find({ featured: true }).sort({ proficiency: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get skill by ID
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new skill
router.post('/', async (req, res) => {
  const skill = new Skill({
    name: req.body.name,
    category: req.body.category,
    proficiency: req.body.proficiency,
    icon: req.body.icon,
    color: req.body.color,
    featured: req.body.featured
  });

  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update skill
router.patch('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    Object.keys(req.body).forEach(key => {
      skill[key] = req.body[key];
    });

    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete skill
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await skill.deleteOne();
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 