# Campus Connect - Setup Instructions

## 📋 Complete Setup Guide

### Step 1: Download and Extract
1. Download the `campus-connect.zip` file
2. Extract to your desired location
3. You should see this structure:
```
campus-connect/
├── public/
├── src/
├── package.json
├── vite.config.js
└── README.md
```

### Step 2: Install Node.js
If you don't have Node.js installed:
1. Go to https://nodejs.org/
2. Download the LTS version (v18 or higher)
3. Install following the installer instructions
4. Verify installation:
```bash
node --version
npm --version
```

### Step 3: Open in VS Code
1. Open VS Code
2. File → Open Folder
3. Select the `campus-connect` folder
4. VS Code will open the project

### Step 4: Install Dependencies
Open the integrated terminal in VS Code (View → Terminal or `` Ctrl+` ``):
```bash
npm install
```

This will install all required packages (React, React Router, Vite, etc.)

### Step 5: Start Development Server
```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 6: Open in Browser
1. Press `Ctrl+Click` on the localhost URL
2. Or manually open: http://localhost:5173
3. You should see the Campus Connect login page

### Step 7: Login with Demo Account
```
Email: amulya@campus.com
Password: password
```

## 🎯 What's Working

✅ All page routing (Login, Home, Posts, Messages, etc.)
✅ Navigation between pages
✅ Form inputs and validations
✅ UI components and styling
✅ Responsive layout (mobile, tablet, desktop)
✅ Demo data from JSON files

## 🔌 What Needs Backend

The following features currently use localStorage/mock data and need real backend:

1. **User Authentication**
   - Currently: Mock login with hardcoded credentials
   - Needs: JWT tokens, session management, password hashing

2. **Database Persistence**
   - Currently: Data lost on refresh (except localStorage)
   - Needs: PostgreSQL/MongoDB connection

3. **Real-time Chat**
   - Currently: Mock messages
   - Needs: WebSocket (Socket.io) implementation

4. **File Uploads**
   - Currently: Image URLs only
   - Needs: Multer + cloud storage (Cloudinary/AWS S3)

5. **Email Notifications**
   - Currently: None
   - Needs: Nodemailer or SendGrid

## 🔧 Adding Backend

### Option 1: Quick Start with JSON Server
For rapid prototyping:

```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

### Option 2: Full Node.js + Express Backend

Create `backend/` folder with:

**backend/server.js**:
```javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Your routes here
app.post('/api/auth/login', (req, res) => {
  // Authentication logic
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

Then update `/src/services/dataService.js` to use real API endpoints.

### Option 3: Firebase (Easiest)
1. Create Firebase project
2. `npm install firebase`
3. Configure Firebase in your app
4. Use Firestore for database
5. Use Firebase Auth for authentication

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3001
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Changes not reflecting
```bash
Ctrl+C (stop server)
npm run dev (restart)
```

### Clear browser cache
- Chrome: Ctrl+Shift+Delete
- Firefox: Ctrl+Shift+Delete

## 📱 Mobile Testing

### On your phone (same WiFi):
```bash
npm run dev -- --host
```

Then visit: http://[your-computer-ip]:5173

Find your IP:
- Windows: `ipconfig`
- Mac/Linux: `ifconfig`

## 🚀 Building for Production

### Create production build:
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Preview production build:
```bash
npm run preview
```

### Deploy to hosting:

**Vercel** (Recommended):
```bash
npm install -g vercel
vercel --prod
```

**Netlify**:
1. Drag and drop `dist/` folder to netlify.com

**GitHub Pages**:
```bash
npm install gh-pages --save-dev
npm run build
npx gh-pages -d dist
```

## 📝 Next Steps

1. ✅ Verify app runs locally
2. 🔄 Set up database (PostgreSQL/MongoDB)
3. 🔄 Create backend API (Express.js)
4. 🔄 Implement authentication (JWT)
5. 🔄 Add WebSocket for real-time features
6. 🔄 Set up image upload (Cloudinary)
7. 🚀 Deploy to production

## 💡 Tips

- Use `.env` for environment variables
- Never commit `.env` or `node_modules`
- Test on multiple browsers
- Use React DevTools for debugging
- Check console for errors

## 📞 Need Help?

Common issues:
- **Blank page**: Check browser console for errors
- **Styles not loading**: Clear cache and hard reload
- **Build errors**: Check Node.js version (use v18+)

Happy coding! 🎉
