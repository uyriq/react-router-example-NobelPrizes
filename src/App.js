import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CountryPage, HomePage, ListPage, PersonPage } from './pages';

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
        <Route path={`/list/:country/:personId`} >
          <PersonPage />
        </Route>
        
      </Switch>
    </Router>
  );
}