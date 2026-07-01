import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const history = useHistory()
    const { user } = useAuthContext()

    if (user) {
        history.replace('/')
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            await projectAuth.signInWithEmailAndPassword(email, password)
            history.push('/')
        } catch (err) {
            setError('Invalid email or password')
        }
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                {error && <p className="login-error">{error}</p>}
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default Login
