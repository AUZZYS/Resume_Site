import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './comps/Navbar'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Projects from './pages/Projects'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="page-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/projects" component={Projects} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
