import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import { PokemonCards } from "../components/pokemon-list/pokemon-cards";
import { PokemonDetails } from "../components/pokemon-details/pokemon-details";

function AppRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/pokemon" />
        </Route>
        <Route exact path="/pokemon">
          <PokemonCards />
        </Route>
        <Route path={`/pokemon-detail`} component={PokemonDetails} />
      </Switch>
    </Router>
  );
}

export default AppRoute;
