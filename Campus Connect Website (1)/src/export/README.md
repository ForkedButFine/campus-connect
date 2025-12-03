# Campus Connect - Production Ready Application

A comprehensive student campus management platform built with React and plain CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Extract the project** to your desired location
2. **Open in VS Code**:
   ```bash
   cd campus-connect
   code .
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open browser**: Navigate to `http://localhost:5173`

## 📦 Project Structure

```
campus-connect/
├── public/               # Static assets
│   └── assets/          # Images, icons, logos
├── src/
│   ├── components/      # React components
│   │   ├── Auth/        # Login, Signup
│   │   ├── Home/        # Home page components
│   │   ├── Posts/       # Posts and social features
│   │   ├── Chat/        # Messaging and chatbot
│   │   ├── Academic/    # Study groups, Q&A
│   │   ├── Marketplace/ # Student marketplace
│   │   ├── Events/      # Clubs and events
│   │   ├── Profile/     # User profiles
│   │   └── Shared/      # Navbar, Footer
│   ├── data/            # Seed data (JSON)
│   ├── services/        # API service layer
│   ├── styles/          # CSS modules
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Available Pages

### Authentication
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - New user registration

### Main Features
- **Home** (`/`) - Dashboard with daily quotes and campus updates
- **Posts** (`/posts`) - Social wall with likes, comments
- **Messages** (`/messages`) - Private messaging
- **ChatBot** (`/chatbot`) - AI study assistant
- **Profile** (`/profile`) - User profile and achievements

### Academic
- **Study Groups** (`/study-groups`) - AI-matched study partners
- **Q&A Board** (`/qna`) - Community question board
- **Teachers** (`/teachers`) - Faculty profiles

### Campus Life
- **Events** (`/events`) - Clubs and campus events
- **Marketplace** (`/marketplace`) - Buy/sell items
- **Lost & Found** (`/lost-found`) - Report lost items
- **Campus Map** (`/campus-map`) - Interactive map

### Career & Support
- **Job Placement** (`/jobs`) - Career opportunities
- **Project Funding** (`/funding`) - Get funding for ideas
- **Alumni Network** (`/alumni`) - Connect with alumni
- **Anti-Ragging** (`/anti-ragging`) - Anonymous support
- **Friend Finder** (`/friend-finder`) - Random friend suggestions
- **Skill Exchange** (`/skills`) - Teach and learn skills

### System
- **Feedback** (`/feedback`) - Submit feedback
- **About** (`/about`) - About the platform

## 🔌 Backend Integration

Currently, the app uses **mock data** stored in `/src/data/`. To connect to a real backend:

### 1. API Configuration
Edit `/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000/api'; // Change to your backend URL
```

### 2. Required API Endpoints

#### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register user
- `POST /api/auth/logout` - Logout user

#### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

#### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Comment on post

#### Messages
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send message

#### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event

#### Marketplace
- `GET /api/marketplace` - Get marketplace items
- `POST /api/marketplace` - List item
- `PUT /api/marketplace/:id` - Update item

#### Jobs
- `GET /api/jobs` - Get job listings
- `POST /api/jobs/:id/apply` - Apply for job

### 3. Database Schema

See `/docs/database-schema.md` for complete table structures.

Key tables needed:
- `users` - User accounts
- `posts` - Student posts
- `messages` - Private messages
- `events` - Campus events
- `marketplace_items` - Student marketplace
- `study_groups` - Study groups
- `questions` - Q&A board
- `teachers` - Faculty profiles
- `alumni` - Alumni network

## 🔐 Authentication

Currently using **localStorage** for demo purposes. For production:

1. **Install JWT library**:
   ```bash
   npm install jsonwebtoken
   ```

2. **Implement token-based auth**:
   - Store JWT token in httpOnly cookies
   - Add token to request headers
   - Implement refresh token logic

3. **Update `/src/services/auth.js`** with real API calls

## 📱 Responsive Design

Breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Features Status

### ✅ Fully Functional (Frontend)
- Login/Signup UI
- All page layouts
- Navigation
- Form validations
- Local state management
- Responsive design

### 🔄 Requires Backend Integration
- User authentication (JWT)
- Real-time messaging (WebSocket)
- Database persistence
- Image upload (Multer/Cloudinary)
- Email notifications
- Push notifications

### 🎨 Customization

#### Colors
Edit `/src/styles/variables.css`:
```css
:root {
  --primary-color: #ec4899;
  --secondary-color: #8b5cf6;
  /* ... more colors */
}
```

#### Logo
Replace `/public/assets/logo.png` with your logo

## 🧪 Sample Data

All seed data is in `/src/data/`:
- `students.json` - Student profiles
- `teachers.json` - Faculty profiles
- `posts.json` - Sample posts
- `events.json` - Campus events
- `jobs.json` - Job listings
- `alumni.json` - Alumni profiles

## 📚 NPM Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Deploy Options
1. **Vercel**: `vercel --prod`
2. **Netlify**: Drag and drop `dist/` folder
3. **GitHub Pages**: Use `gh-pages` package
4. **Traditional Hosting**: Upload `dist/` contents to web server

## 🔧 Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000
VITE_UPLOAD_URL=https://your-cdn.com
```

## 🐛 Troubleshooting

### Port already in use
```bash
npm run dev -- --port 3001
```

### Clear cache
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

MIT License - Free to use for educational purposes

## 👥 Credits

Created by:
- Aakash_
- Ujjayani_
- Amulya_

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Note**: This is a frontend application. Backend API, database, and real-time features need to be implemented separately.
