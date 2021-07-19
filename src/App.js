import Header from "./components/Header";
import ListFriends from "./components/ListFriends";
import Settings from "./components/Settings";
import Loading from "./components/Loading";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isLoading } = useAuth0();

  return (
    <div className="py-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <Toaster position="top-right" />
      <div className="lg:text-center">
        <Header user={user} />
        {isLoading && <Loading />}
        {user && (
          <BrowserRouter>
            <ul className="flex w-32 justify-between items-center mx-auto mt-3">
              <li>
                <NavLink exact={true} activeClassName="text-blue-500" to="/">
                  Friends
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="text-pink-500" to="/settings">
                  Settings
                </NavLink>
              </li>
            </ul>
            <div className="border-b-2 border-gray-300 py-1 my-3 inline-flex w-1/4"></div>
            <Switch>
              <Route exact path="/">
                <ListFriends />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
