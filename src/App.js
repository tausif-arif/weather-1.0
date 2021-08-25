import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [search, setSearch] = useState("mumbai");
  var [datas, setDatas] = useState({});
  const [icon, setWeatherIcon] = useState({});

  const key = "db7fb671792799070fb619f9435bf2ad";

  const loadData = async () => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${key}`
    );
    let data = res.data;

    const { name: city } = data;
    const { temp, humidity, temp_max, temp_min } = data.main;
    const { main: weathermode, id} = data.weather[0];
    const { country, sunrise, sunset } = data.sys;
    const { speed } = data.wind;

    // console.log(data);

    const weatherInfo = {
      city,
      temp,
      humidity,
      speed,
      temp_max,
      temp_min,
      weathermode,
      id,
      country,
      sunrise,
      sunset,
    };
    setDatas(weatherInfo);
  };
  const weatherIcon = {
    drizzle: "wi-sleet",
    rain: "wi-rain",
    clouds: "wi-cloudy",
    thunderstorm: "wi-thunderstorm",
    snow: "wi-snow",
    atmosphere: "wi-fog",
    clear: "wi-day-sunny",
  };
  
  /*eslint-disable */

  useEffect(() => {
    if (datas.weathermode) {
      switch (true) {
        case datas.id >= 200 && datas.id <= 232:
          setWeatherIcon(weatherIcon.thunderstorm);
          break;
        case datas.id >= 300 && datas.id <= 314:
          setWeatherIcon(weatherIcon.drizzle);
          break;
        case datas.id >= 500 && datas.id <= 531:
          setWeatherIcon(weatherIcon.rain);
          break;
        case datas.id >= 600 && datas.id <= 622:
          setWeatherIcon(weatherIcon.snow);
          break;
        case datas.id >= 701 && datas.id <= 781:
          setWeatherIcon(weatherIcon.atmosphere);
          break;
        case datas.id === 800:
          setWeatherIcon(weatherIcon.clear);
          break;
        case datas.id >= 801 && datas.id <= 804:
          setWeatherIcon(weatherIcon.clouds);
          break;
        default:
          setWeatherIcon("wi-na");
          break;
      }
    }
  }, [datas.id]);


  useEffect(() => {
    loadData();
  }, []);   /*eslint-disable */


  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <h1 className="text1">Weather 1.0 ⛅ </h1>
      <div className="search">
        <input
          type="text"
          className="input_field"
          placeholder="search"
          name="search"
          value={search}
          onChange={handleChange}
        ></input>
        <button onClick={loadData} id="btn" className="btn">
          Search
        </button>
      </div>
      <div className="main">
        <div className="content">
          <div className="part1">
            <div className="display-1 text-center">
              <i className={`wi ${icon}`}></i>
            </div>
          </div>
          <div className="city_info">
            {datas.city}
            {`,${datas.country}`}
          </div>
          <div className="temp_widget">
            <div className="temp_info temps">
              <span>
                {datas.temp}&deg;{"c"}
              </span>
            </div>
            <div className="temps weather_mode">
              <span className="display-6"> {datas.weathermode}</span>
            </div>
          </div>
          
          <div className="extra">
            <div className="extraInner">
              <p className="extra_icon">
                <i className="wi wi-sunrise"></i>
              </p>
              <p className="sunrise">
                {new Date(datas.sunrise * 1000).getHours()}
                {":"}
                {new Date(datas.sunrise * 1000).getMinutes()}
              </p>
            </div>
            <div className="extraInner">
              <p className="extra_icon">
                <i className="wi wi-sunset"></i>
              </p>
              <p className="sunset">
                {new Date(datas.sunset * 1000).getHours()}
                {":"}
                {new Date(datas.sunset * 1000).getMinutes()}
              </p>
            </div>
            <div className="extraInner">
              <p className="extra_icon">
                <i className="wi wi-humidity"></i>
              </p>
              <p className="humidity">{datas.humidity}</p>
            </div>
            <div className="extraInner">
              <p className="extra_icon">
                <i className="wi wi-windy"></i>
              </p>
              <p className="speed">{datas.speed}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
