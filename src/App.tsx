import React, {useState} from 'react';
import './App.css';
import TweetGrid from './component/TweetGrid';
import Login from './component/Login';
import SignUp from './component/SignUp';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

const App: React.FC = () => {
  const [token, setToken] = useState('');

  const mainPage = () => {
    if(token === '') {
      return <Redirect to='/login' />
    }
    return (
    <>
      <TweetGrid />
    </>
    );
  }
  return (
    <Router>
      <Switch>
        <Route path="/login" render={() => <Login setToken={setToken}/>}/>
        <Route path="/signUp" component={SignUp}></Route>
        <Route path="/" exact>{mainPage}</Route>
      </Switch>
    </Router>
    
  );
}

export default App;
