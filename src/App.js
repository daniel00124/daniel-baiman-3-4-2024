import './App.css';
import {HashRouter as BrowserRouter,Routes,Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Favorites from './components/Favorites';
import one from './images/01-s.png'
import two from './images/06-s.png'
import tree from './images/07-s.png'
import four from './images/18-s.png'
import five from './images/22-s.png'
import six from './images/33-s.png'
import seven from './images/38-s.png'
import eight from './images/40-s.png'
function App() {
  const [citySearch,setCitySearch] = useState("")
  const [cityData,setCityData] = useState(null)
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const api_key = "6nnnkfwjYiUOJAoJQnkZdbwx1kJz8A3V"
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [favoritesList,setFavoritesList] = useState([])
  const [inFavotites, setInFavotites] = useState(false);
  const [icon,setIcon] = useState(one)
  useEffect(() => {
    handleSearch('tel aviv');
  }, []);

  const addFavorite = (id,name,currentWrather)=>{
    setFavoritesList([...favoritesList,{id,name,currentWrather}]);
  }
  const removeFavorite=(id)=>{
    const filtered = favoritesList.filter(val=>val.id!==id)
    setFavoritesList(filtered)
  }
  const checkIfInFavorites=(id)=>{
    const filtered = favoritesList.filter(val=>val.id===id).length
    if(filtered===1){
      setInFavotites(true)
    }else{
      setInFavotites(false)
    }
  }



  const handleSearch = async (name) => {
    try {
        const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${api_key}&q=${name}`);
        const data = await response.json();
        if (data && data.length > 0) {
            const cityKey = data[0].Key;
            setCityData(data[0]);
            fetchWeather(cityKey);
            fetchForecast(cityKey)
            checkIfInFavorites(cityKey)
            setCitySearch('')
        } else {
            console.log("No city found");
            alert("type valid city")
        }
    } catch (error) {
        console.error("Error fetching city data:", error);
    }
};

const fetchWeather = async (cityKey) => {
    try {
        const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${api_key}`);
        const data = await response.json();
        if (data && data.length > 0) {
            setWeatherData(data[0]);
            hendelIcon(data[0].WeatherIcon)
        } else {
            console.log("No weather data found");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};
const fetchForecast = async (cityKey) => {
    try {
        const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${api_key}`);
        const data = await response.json();
        if (data && data.DailyForecasts) {
            setForecastData(data.DailyForecasts);
            console.log(data)
        } else {
            console.log("No Forecast data found");
        }
    } catch (error) {
        console.error("Error fetching Forecast data:", error);
    }
};
const hendelFavorits = ()=>{
  checkIfInFavorites(cityData.Key)
    if(inFavotites){
        removeFavorite(cityData.Key)
        setInFavotites(false)
    }else{
        addFavorite(cityData.Key,cityData.LocalizedName,weatherData.Temperature.Metric.Value)
        setInFavotites(true)
    }
}
const hendelIcon = (WeatherIcon)=>{
  if(WeatherIcon<=3 && WeatherIcon>0){
    setIcon(one)
  }else if(WeatherIcon<=6 && WeatherIcon>3){
    setIcon(two)
  }else if(WeatherIcon<=11 && WeatherIcon>6){
    setIcon(tree)
  }else if(WeatherIcon<=21 && WeatherIcon>11){
    setIcon(four)
  }else if(WeatherIcon<=29 && WeatherIcon>21){
    setIcon(five)
  }else if(WeatherIcon<=35 && WeatherIcon>32){
    setIcon(six)
  }else if(WeatherIcon<=38 && WeatherIcon>35){
    setIcon(seven)
  }else if(WeatherIcon<=44 && WeatherIcon>38){
    setIcon(eight)
  }
}
  return (
    <div className="App">
     <BrowserRouter>
     <Header/>
      <Routes>
        <Route path='/' element={<HomePage
         addFavorite={addFavorite} 
         inFavotites={inFavotites} 
         checkIfInFavorites={checkIfInFavorites} 
         removeFavorite={removeFavorite}
         forecastData={forecastData}
         days={days}
         setCitySearch={setCitySearch}
         handleSearch={handleSearch}
         hendelFavorits={hendelFavorits}
         cityData={cityData}
         weatherData={weatherData}
         citySearch={citySearch}
         icon={icon}
         />}/>
        <Route path='/favorites' element={<Favorites favoritesList={favoritesList} handleSearch={handleSearch} setCitySearch={setCitySearch} icon={icon}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
