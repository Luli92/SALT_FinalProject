import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import ReactAnimatedWeather from 'react-animated-weather';
import moment from 'moment';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  
  const defaults = {
    icon: 'PARTLY_CLOUDY_DAY',
    color: 'white',
    size: 200,
    animate: true
  };

  const getClass = () => {
    const currentTime = moment().format('HH');

    switch (true) {
      case (currentTime >= 22 && currentTime < 4): 
        return 'App App__night'
      case (currentTime >= 4 && currentTime < 10):
        return 'App App__morning'
      case (currentTime >= 10 && currentTime < 16):
        return 'App App__day'
      case (currentTime >= 16 && currentTime < 22):
        return 'App App__evening'
    }
    return 'App'
  }

  return (
    <div className={getClass()}>
     {!isLogin && <ReactAnimatedWeather
      className="App__animatedweather"
      icon={defaults.icon}
      color={defaults.color}
      size={defaults.size}
      animate={defaults.animate}
     />}
      {!isLogin && <Login setIsLogin={setIsLogin} />}
      {isLogin && <Home isLogin={isLogin}/>}
    </div>
  );
}

export default App;
