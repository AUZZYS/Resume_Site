import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => (
    <nav className="navbar">
        <span className="nav-brand">Ollie</span>
        <div className="nav-links">
            <NavLink exact to="/" className="nav-link" activeClassName="nav-active">Home</NavLink>
            <NavLink to="/gallery" className="nav-link" activeClassName="nav-active">Gallery</NavLink>
            <NavLink to="/projects" className="nav-link" activeClassName="nav-active">Projects</NavLink>
        </div>
    </nav>
)

export default Navbar
