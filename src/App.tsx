import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import TweetGrid from './component/TweetGrid';
import Chart from './component/Chart';
import Login from './component/Login';
import SignUp from './component/SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signUp">Sign Up</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/">
          <div className="App">
            <header>
              <Typography variant="h2" className='Tweety'>Tweety</Typography>
            </header>
            <div className='tweetGrid'>
              <TweetGrid/>
            </div>
            <Chart />
          </div>
        </Route>
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
