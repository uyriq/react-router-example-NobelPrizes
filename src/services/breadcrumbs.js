/*
 * state -- history state of app
 * route -- url of a new breadcrumb  */
export const isContainRoute = (state, route) => state.some(({ url }) => url === route)

/*
 * state -- history state of app
 * url -- url of current breadcrumb */
export const removeRemainingCrumbs = (state, url) => {
    const index = state.findIndex(({ url: route }) => route === url)
    return state.slice(0, index)
}

export const HOME_CRUMB = { path: '/', url: '/', title: 'Home' }
