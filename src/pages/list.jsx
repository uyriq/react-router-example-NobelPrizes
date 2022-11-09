import React, { useEffect, useState, useCallback } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'

import styles from './page.module.css'

import { CountryList } from '../components/country-list'
import { SortingControl } from '../components/sorting-control'
import { isContainRoute } from '../services/breadcrumbs'
import { Breadcrumbs } from '../components/breadcrumbs'
import { deserializeQuery, loadCountries, loadLaureates, serializeQuery } from '../services/api'

export const ASC = 'asc'
export const DESC = 'desc'

const sortCb = (countrySorting, personCountSorting) => {
    if (countrySorting) {
        if (countrySorting === ASC) {
            return (a, b) => a.name.localeCompare(b.name)
        } else {
            return (a, b) => b.name.localeCompare(a.name)
        }
    }

    if (personCountSorting) {
        if (personCountSorting === ASC) {
            return (a, b) => (a.count < b.count ? 1 : a.count > b.count ? -1 : 0)
        } else {
            return (a, b) => (b.count > a.count ? -1 : b.count < a.count ? 1 : 0)
        }
    }
}

const aggregateData = (acc, person) => {
    return {
        ...acc,
        [person.bornCountryCode]: acc[person.bornCountryCode] ? [...acc[person.bornCountryCode], person] : [person],
    }
}

export const ListPage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [countrySorting, setCountrySorting] = useState(ASC)
    const [personCountSorting, setPersonCountSorting] = useState('')

    const history = useHistory()
    const { pathname, search, state } = useLocation()
    const { url, path } = useRouteMatch()

    useEffect(() => {
        if (state && !isContainRoute(state, url)) {
            history.replace({ state: [...state, { path, url, title: 'List of Nobel laureates' }] })
        }
    }, [path, url, state, history])

    const loadCountryInfo = async () => {
        setLoading(true)
        try {
            const countries = await loadCountries()
            const laureates = await loadLaureates()

            const hashLaureates = laureates.reduce(aggregateData, {})

            const normalizedData = countries
                .map(({ code, name }) => ({
                    code,
                    name,
                    count: (hashLaureates[code] && hashLaureates[code].length) || 0,
                }))
                .sort(sortCb(countrySorting, personCountSorting))
            setData(normalizedData)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (search) {
            const queryObj = deserializeQuery(search)
            Object.keys(deserializeQuery(search)).forEach((key) => {
                if (key === 'country') {
                    setCountrySorting(queryObj[key])
                    setPersonCountSorting('')
                } else {
                    setPersonCountSorting(queryObj[key])
                    setCountrySorting('')
                }
            })
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        loadCountryInfo()
    }, [countrySorting, personCountSorting])

    const content = loading ? 'loading' : data && data.length ? <CountryList countries={data} /> : null

    const getNextQuery = useCallback(
        (type, current) => {
            if (!search) {
                return `?${type}=${current}`
            } else {
                return serializeQuery({ [type]: current })
            }
        },
        [search]
    )

    const sortCountries = useCallback(
        (type) => {
            let query
            switch (type) {
                case 'country': {
                    const nextSortingValue = countrySorting ? (countrySorting === ASC ? DESC : ASC) : ASC
                    setCountrySorting(nextSortingValue)
                    setPersonCountSorting('')
                    query = getNextQuery(type, nextSortingValue)
                    break
                }
                case 'count': {
                    const nextSortingValue = personCountSorting ? (personCountSorting === ASC ? DESC : ASC) : ASC
                    setPersonCountSorting(nextSortingValue)
                    setCountrySorting('')
                    query = getNextQuery(type, nextSortingValue)
                    break
                }
                default: {
                    break
                }
            }

            const { state } = history.location

            history.replace({
                state,
                pathname,
                search: query,
            })
        },
        [history, pathname, personCountSorting, countrySorting, getNextQuery]
    )

    return (
        <div className={styles.vertical_padding}>
            <header className={styles.horizontal_padding}>
                <Breadcrumbs />
                <h1>List of Nobel laureates</h1>
            </header>
            <div className={styles.filters}>
                <div className={styles.filter_item}>
                    <SortingControl label={'Country'} onSort={() => sortCountries('country')} value={countrySorting} />
                </div>
                <div className={styles.filter_item}>
                    <SortingControl
                        label={'Number of Nobel laureates'}
                        value={personCountSorting}
                        onSort={() => sortCountries('count')}
                    />
                </div>
            </div>
            {content}
        </div>
    )
}
