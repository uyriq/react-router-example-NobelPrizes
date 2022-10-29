import * as React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import styles from './breadcrumbs.module.css'

import { removeRemainingCrumbs } from '../../services/breadcrumbs'

const Crumb = ({ url, title }) => {
    const history = useHistory()
    const { state } = useLocation()

    const routeTo = (event) => {
        event.preventDefault()
        history.replace({
            pathname: url,
            state: removeRemainingCrumbs(state, url),
        })
    }

    return (
        <span className={styles.item}>
            <a href={url} onClick={routeTo}>
                {title}
            </a>
            {` > `}
        </span>
    )
}

const Breadcrumbs = () => {
    const { state } = useLocation()
    if (state) {
        return (
            <nav>
                {state.map((crumb) => (
                    <Crumb {...crumb} key={crumb.url} />
                ))}
            </nav>
        )
    }
    return null
}

export { Breadcrumbs }
