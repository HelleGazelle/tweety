import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import TweetGrid from './component/TweetGrid';
import Chart from './component/Chart';
import Login from './component/Login';
import SignUp from './component/SignUp';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <Typography variant="h2" className='Tweety'>Tweety</Typography>
      </header>
      <div className='tweetGrid'>
        <TweetGrid/>
      </div>
      <Chart />
      <div>
        <Login/>
      </div>
      <div>
        <SignUp/>
      </div>
    </div>
    
  );
}

export default App;
