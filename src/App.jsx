import { useEffect, useState } from 'react'
// import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { generateClient } from 'aws-amplify/data'
// import amplifyconfig from './amplifyconfig.json'
import BucketListApp from './components/BucketListApp'
import '@aws-amplify/ui-react/styles.css'
import './App.css'

// Configure Amplify - Commented out for initial deployment
// Amplify.configure(amplifyconfig)

// Create the data client - Commented out for initial deployment
// const client = generateClient()

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <div className="app">
            <header className="app-header">
              <div className="header-content">
                <h1>🎯 My Bucket List Tracker</h1>
                <div className="user-info">
                  <span>Welcome, {user?.username || 'User'}!</span>
                  <button onClick={signOut} className="sign-out-btn">
                    Sign out
                  </button>
                </div>
              </div>
            </header>
            
            <main className="app-main">
              <Routes>
                <Route path="/" element={<BucketListApp user={user} client={null} />} />
              </Routes>
            </main>
            
            <footer className="app-footer">
              <p>&copy; 2025 Bucket List Tracker - Built with AWS Amplify</p>
            </footer>
          </div>
        </Router>
      )}
    </Authenticator>
  )
}

export default App
