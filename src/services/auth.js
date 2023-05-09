import { useContext, useState, createContext } from 'react'
import { loginRequest } from './api'
import { setCookie } from './utils'

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
            .then((res) => {
                let authToken
                // Ищем интересующий нас заголовок
                res.headers.forEach((header) => {
                    if (header.indexOf('Bearer') === 0) {
                        // Отделяем схему авторизации от "полезной нагрузки токена",
                        // Стараемся экономить память в куках (доступно 4кб)
                        authToken = header.split('Bearer ')[1]
                    }
                })
                if (authToken) {
                    // Сохраняем токен в куку token
                    setCookie('token', authToken)
                }
                return res.json()
            })
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