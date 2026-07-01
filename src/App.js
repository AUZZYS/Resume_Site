import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './comps/Navbar'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Projects from './pages/Projects'
import Login from './pages/Login'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="page-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/projects" component={Projects} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
