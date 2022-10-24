import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomePage } from "./pages";
export default function App() {
  return (
    <Router>
      <Route path="/" exact={true}>
        <HomePage />
      </Route>
    </Router>
  );
}
