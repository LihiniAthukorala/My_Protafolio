# Portfolio Website - MERN Stack

A modern, responsive portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring beautiful animations, contact form functionality, and a comprehensive project showcase.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Clean, responsive design with glassmorphism effects
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Responsive Design**: Mobile-first approach with perfect mobile experience
- **Contact Form**: Functional contact form with validation and email notifications
- **Project Showcase**: Filterable project gallery with categories
- **Skills Visualization**: Interactive skills display with progress bars
- **SEO Optimized**: Meta tags and proper HTML structure

### Backend (Node.js/Express)
- **RESTful API**: Complete CRUD operations for projects, skills, and contacts
- **MongoDB Integration**: MongoDB with Mongoose for data persistence
- **Email Notifications**: Nodemailer integration for contact form submissions
- **Security**: Helmet.js for security headers and input validation
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Nodemailer** - Email service
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Database Setup**
   
   Make sure MongoDB is running. If using MongoDB Atlas, replace the MONGODB_URI with your connection string.

5. **Run the application**
   ```bash
   # Development mode (runs both server and client)
   npm run dev
   
   # Or run separately:
   # Server only
   npm run server
   
   # Client only
   npm run client
   ```

## 📁 Project Structure

```
portfolio-website/
├── server/
│   ├── index.js          # Main server file
│   ├── models/           # MongoDB models
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   └── Contact.js
│   └── routes/           # API routes
│       ├── projects.js
│       ├── skills.js
│       └── contact.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── pages/        # Page components
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Projects.js
│   │   │   └── Contact.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## 🎨 Customization

### Personal Information
Update the following files with your information:

1. **Personal Details**: Update `client/src/pages/About.js` and `client/src/pages/Contact.js`
2. **Social Links**: Update social media links in `client/src/components/Footer.js`
3. **Projects**: Add your projects through the API or directly in the database
4. **Skills**: Add your skills through the API or directly in the database

### Styling
- Main styles: `client/src/index.css`
- Component-specific styles: Each component has its own CSS file
- Color scheme: Update CSS variables in the main CSS files

## 📊 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/featured` - Get featured skills
- `GET /api/skills/category/:category` - Get skills by category
- `POST /api/skills` - Create new skill
- `PATCH /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `GET /api/contact/unread` - Get unread messages
- `PATCH /api/contact/:id/read` - Mark message as read
- `DELETE /api/contact/:id` - Delete message

## 🚀 Deployment

### Backend Deployment (Heroku/Netlify)
1. Set up environment variables in your hosting platform
2. Deploy the server directory
3. Update the client's proxy configuration

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the `client/build` directory
3. Update API endpoints to point to your deployed backend

### Database
- Use MongoDB Atlas for cloud database hosting
- Update the MONGODB_URI in your environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- UI inspiration from modern portfolio designs

## 📞 Support

If you have any questions or need help with the setup, feel free to reach out!

---

**Happy Coding! 🎉** 