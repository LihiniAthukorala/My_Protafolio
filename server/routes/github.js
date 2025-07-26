const express = require('express');
const router = express.Router();

// Get GitHub user info
router.get('/user', async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/users/LihiniAthukorala');
    const userData = await response.json();
    
    res.json({
      username: userData.login,
      name: userData.name,
      bio: userData.bio,
      avatar: userData.avatar_url,
      location: userData.location,
      blog: userData.blog,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
      updated_at: userData.updated_at
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    res.status(500).json({ message: 'Failed to fetch GitHub user data' });
  }
});

// Get GitHub stats
router.get('/stats', async (req, res) => {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch('https://api.github.com/users/LihiniAthukorala'),
      fetch('https://api.github.com/users/LihiniAthukorala/repos?per_page=100')
    ]);
    
    const userData = await userResponse.json();
    const repos = await reposResponse.json();
    
    // Calculate stats
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languageCount = {};
    
    repos.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });
    
    const topLanguages = Object.entries(languageCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([language, count]) => ({ language, count }));
    
    res.json({
      totalRepos: userData.public_repos,
      totalStars,
      totalForks,
      followers: userData.followers,
      following: userData.following,
      topLanguages,
      accountAge: Math.floor((new Date() - new Date(userData.created_at)) / (1000 * 60 * 60 * 24))
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    res.status(500).json({ message: 'Failed to fetch GitHub stats' });
  }
});

module.exports = router; 