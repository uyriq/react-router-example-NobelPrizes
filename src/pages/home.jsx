import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './home.module.css'

import { useAuth } from '../services/auth'
import { Button } from '../components/button'
import { HOME_CRUMB } from '../services/breadcrumbs'

export function HomePage() {
    const history = useHistory()
    const auth = useAuth()

    const logout = useCallback(() => {
        auth.signOut(() => {
            history.replace({ pathname: '/login' })
        })
    }, [auth, history])

    const onClick = () => {
        const initialBreadcrumb = [HOME_CRUMB]
        history.replace({ pathname: '/list', state: initialBreadcrumb })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form className={styles.form}>
                    <h1 className={styles.heading}>Nobel Prize Library</h1>
                    <Button primary={true} onClick={onClick}>
                        View catalog
                    </Button>
                    <Button onClick={logout}>Log out</Button>
                </form>
                <p>1901-2020</p>
            </div>
        </div>
    )
}
