import React, { useState, useEffect } from 'react';
import { getData, getHistory } from './db-connection-functions';
import './Home.css';
import ReactAnimatedWeather from 'react-animated-weather';
import Charts from './Charts';
import clearDay from '../img/weather/clearDay.svg'
import clearNight from '../img/weather/clearNight.svg'
import cloudy from '../img/weather/cloudy.svg'
import fog from '../img/weather/fog.svg'
import partlyCloudyDay from '../img/weather/partlyCloudyDay.svg'
import partlyCloudyNight from '../img/weather/partlyCloudyNight.svg'
import rain from '../img/weather/rain.svg'
import sleet from '../img/weather/sleet.svg'
import snow from '../img/weather/snow.svg'
import wind from '../img/weather/wind.svg'
import precip from '../img/climate-icons/precipitation.svg'
import aq from '../img/climate-icons/aq.svg'
import co2emission from '../img/climate-icons/co2emission.svg'
import humidity from '../img/climate-icons/humidity.svg'
import visibility from '../img/climate-icons/visibility.svg'
import windspeed from '../img/climate-icons/windspeed.svg'
import pressure from '../img/climate-icons/pressure.svg'
import apparent from '../img/climate-icons/apparent.svg'

function Home({ isLogin }) {
  const [geolocation, setGeolocation] = useState();
  const [data, setData] = useState();
  const [history, setHistory] = useState();


  useEffect(() => {
    console.log('this effect runs only on mount');
    getGeolocation();
  }, []);

  useEffect(() => {
    if (geolocation) getData(geolocation, isLogin, setData); 
  }, [geolocation]);


  useEffect(() => {
    if (data) {
      getHistory(isLogin, setHistory);
      console.log('fffffffffffffffff', data)
    }
  }, [data]);

  useEffect(() => {
  }, [history]);

  
  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // setGeolocation({ lat: position.coords.latitude, long: position.coords.longitude })
      setGeolocation({ lat: position.coords.latitude, long: position.coords.longitude })

    });
  }

  const getWeatherIcon = (weather) => {
    switch(weather) {
      case "partly-cloudy-day" :
        return (<img className="summary__weathericon--size" src={partlyCloudyDay} />)
      case "partly-cloudy-night" :
        return (<img className="summary__weathericon--size" src={partlyCloudyNight} />)
      case "clear-day" :
        return (<img className="summary__weathericon--size" src={clearDay} />)
      case "clear-night" :
        return (<img className="summary__weathericon--size" src={clearNight} />)
      case "cloudy" :
        return (<img className="summary__weathericon--size" src={cloudy} />)
      case "fog" :
        return (<img className="summary__weathericon--size" src={fog} />)
      case "rain" :
        return (<img className="summary__weathericon--size" src={rain} />)
      case "sleet" :
        return (<img className="summary__weathericon--size" src={sleet} />)
      case "snow" :
        return (<img className="summary__weathericon--size" src={snow} />)
      case "wind" :
        return (<img className="summary__weathericon--size" src={wind} />)
    }
  }

  const defaults = {
    icon: 'WIND',
    color: 'white',
    size: 350,
    animate: true
  };

  return (

    <div className="Home">
      <div className="Home__body">
        {!data ?
          <div className="Home__spinner">
            <ReactAnimatedWeather
              className="App__animatedweather"
              icon={defaults.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}/>
          </div> :
          
          <div className="Home__summary">

            <div className="Home__summary_location">
              <h1>{data.location.city}</h1>
              <h6>{data.location.district}</h6>
            </div>

            <div className="Home__summary__temp">
              <p>{Math.round(data.weather.currently.temperature)}°</p>
            </div>

            <div className="Home__summary__weathericon">
              {getWeatherIcon(data.weather.currently.icon)}
            </div>

            <div className="Home__summary__apparentPrecipitation">
              <div className="Home__summary__apparent">   
                <img className="Home__summary__icon" src={apparent} /> 
                <p>{Math.round(data.weather.currently.apparentTemperature)} °C</p>
              </div>

              <div className="Home__summary__precipitation">
                <img className="Home__summary__icon" src={precip} />
                <p>{data.weather.currently.precipProbability}%</p>
              </div>
            </div>

            <div className="Home__summary__summary">
              <p><b>{data.weather.summary}</b></p>
            </div>
            
            <div className="Home__summary__chart summary__item--full">
              <Charts data={data} history={history}/>
            </div>

            <div className="Home__summary__humidity">
              <img className="Home__summary__icon" src={humidity} />
              <p>{data.weather.currently.humidity*100} %</p>
            </div>
            
            <div className="Home__summary__pressure">
              <img className="Home__summary__icon" src={pressure} />
              <p>{Math.round(data.weather.currently.pressure)} hPa</p>
            </div>
            
            <div className="Home__summary__windspeed">
            <img className="Home__summary__icon" src={windspeed} />
            <p>{data.weather.currently.windSpeed} m/s</p>
            </div>
            
            <div className="Home__summary__visibility">
            <img className="Home__summary__icon" src={visibility} />
            <p>{Math.round(data.weather.currently.visibility)} km</p>
            </div>

            <div className="Home__summary__emission">
              <img className="Home__summary__icon" src={co2emission} />
              <p>{Math.round(data.co2.data.carbonIntensity)} gCO2/kWh</p>
            </div>
            
            <div className="Home__summary__aq">
              <img className="Home__summary__icon" src={aq} />
              <p>{data.aq.aqius} AQI</p>
            </div>
  
          </div>
        }
      </div>

    </div>
  );

  // <p>Humidity: {weather.humidity} %</p>
  // <p>Pressure: {weather.pressure} Pa</p>


}
export default Home;