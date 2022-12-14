import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from './country.module.css'
import arrow from '../../images/arrow.svg'

export const CountryList = ({ countries }) => {
    const history = useHistory()

    return (
        <ul>
            {countries.map(({ name, code, count }, index) => (
                <li key={index}>
                    <Link to={{ pathname: `/list/${code}`, state: history.location.state }} className={styles.link}>
                        <div className={styles.country}>
                            <div className={styles.info}>
                                <span>{name}</span>
                            </div>
                            <div className={styles.info}>
                                <span>{count}</span>
                                <img src={arrow} alt="arrow" />
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
