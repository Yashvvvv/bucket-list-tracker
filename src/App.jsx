import { useState } from 'react'
// import { Amplify } from 'aws-amplify'
// import { Authenticator } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { generateClient } from 'aws-amplify/data'
// import amplifyconfig from './amplifyconfig.json'
import BucketListApp from './components/BucketListApp'
// import '@aws-amplify/ui-react/styles.css'
import './App.css'

// Configure Amplify - Commented out for initial deployment
// Amplify.configure(amplifyconfig)

// Create the data client - Commented out for initial deployment
// const client = generateClient()

function App() {
  // Mock user for frontend-only deployment
  const [isSignedIn, setIsSignedIn] = useState(true)
  const mockUser = {
    username: 'DemoUser',
    email: 'demo@example.com'
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
  }

  const handleSignIn = () => {
    setIsSignedIn(true)
  }

  if (!isSignedIn) {
    return (
      <div className="amplify-authenticator">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h1 style={{ color: '#2C5530', marginBottom: '20px' }}>🧭 Welcome to Bucket List Tracker</h1>
            <p style={{ color: '#5D4E75', marginBottom: '30px', lineHeight: '1.6' }}>
              Start your adventure and track your dreams! This is a demo version of the application.
            </p>
            <button 
              onClick={handleSignIn}
              style={{
                padding: '15px 30px',
                background: 'linear-gradient(135deg, #2C5530 0%, #1A4B47 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(44, 85, 48, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 20px rgba(44, 85, 48, 0.4)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 15px rgba(44, 85, 48, 0.3)'
              }}
            >
              ✈️ Start Your Journey
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1>My Bucket List Tracker</h1>
            <div className="user-info">
              <span>Welcome, {mockUser.username}!</span>
              <button onClick={handleSignOut} className="sign-out-btn">
                Sign out
              </button>
            </div>
          </div>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<BucketListApp user={mockUser} client={null} />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>&copy; 2025 Bucket List Tracker - Built with AWS Amplify</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
