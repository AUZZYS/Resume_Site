import React, { createContext, useContext, useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authIsReady, setAuthIsReady] = useState(false)

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged(u => {
            setUser(u)
            setAuthIsReady(true)
        })
        return unsub
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {authIsReady && children}
        </AuthContext.Provider>
    )
}
