import React from 'react'
import { NavLink } from 'react-router-dom'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { user } = useAuthContext()

    return (
        <nav className="navbar">
            <span className="nav-brand"></span>
            <div className="nav-links">
                <NavLink exact to="/" className="nav-link" activeClassName="nav-active">Home</NavLink>
                <NavLink to="/gallery" className="nav-link" activeClassName="nav-active">Gallery</NavLink>
                <NavLink to="/projects" className="nav-link" activeClassName="nav-active">Projects</NavLink>
                {user
                    ? <button className="nav-logout" onClick={() => projectAuth.signOut()}>Logout</button>
                    : <NavLink to="/login" className="nav-link" activeClassName="nav-active">Login</NavLink>
                }
            </div>
        </nav>
    )
}

export default Navbar
