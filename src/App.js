import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CountryPage, HomePage, PersonPage, ListPage } from './pages'

export default function App() {
    return (
        <Router>
            <Switch>
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
            </Switch>
        </Router>
    )
}
