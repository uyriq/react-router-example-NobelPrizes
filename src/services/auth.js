import { useContext, useState, createContext } from 'react'
import { loginRequest } from './api'

const fakeAuth = {
    isAuthenticated: false,
    signIn(cb) {
        fakeAuth.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signOut(cb) {
        fakeAuth.isAuthenticated = false
        setTimeout(cb, 100)
    },
}

const AuthContext = createContext(undefined)

export function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}

export function useProvideAuth() {
    const [user, setUser] = useState(null)

    const signIn = async (form) => {
        const data = await loginRequest(form)
            .then((res) => res.json())
            .then((data) => data)

        if (data.success) {
            setUser({ ...data.user, id: data.user._id })
        }
    }

    const signOut = (cb) => {
        return fakeAuth.signOut(() => {
            setUser(null)
            cb()
        })
    }

    return {
        user,
        signIn,
        signOut,
    }
}
