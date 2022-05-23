import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user} = useContext(AuthContext)
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home/> : <Login/>}
        </Route>
        <Route path="/login">
          {user ? <a href="/"/> : <Login/>}
        </Route>
        <Route path="/register">
        {user ? <a href="/"/> : <Register/>}
        </Route>
        <Route path="/profile/:username">
          <Profile/>
        </Route>
      </Switch>
    </Router>
  )
    
}

export default App;
