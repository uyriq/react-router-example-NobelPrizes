import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage, ListPage } from "./pages";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/list" exact={true}>
          <ListPage />
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}
