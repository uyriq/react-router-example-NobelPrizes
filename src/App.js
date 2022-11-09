import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CountryPage, HomePage, LoginPage, PersonPage, ListPage, NotFound404 } from './pages'

import { ProvideAuth } from './services/auth'

export default function App() {
    return (
        <ProvideAuth>
            <Router>
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/" exact={true}>
                        <HomePage />
                    </Route>
                    <Route path="/list" exact={true}>
                        <ListPage />
                    </Route>
                    <Route path={`/list/:country`} exact={true}>
                        <CountryPage />
                    </Route>
                    <Route path={`/list/:country/:personId`} exact={true}>
                        <PersonPage />
                    </Route>
                    <Route>
                        <NotFound404 />
                    </Route>
                </Switch>
            </Router>
        </ProvideAuth>
    )
}
