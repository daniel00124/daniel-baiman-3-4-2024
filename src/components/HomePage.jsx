import React,{useState, useEffect } from 'react'
import redhearts from '../images/heart.svg'
import heart from '../images/redheart.svg'
export default function HomePage(props) {

    function fahrenheitToCelsius(val){
  return (val - 32) / 1.8;
}

  return (
    <div id='homepage'>
        <div id='citySerch'>
        <input id="serchCity" type="text" placeholder='serch'  onChange={(e)=>{props.setCitySearch(e.target.value)}}/>
        <button onClick={()=>props.handleSearch(props.citySearch)}>serch</button>
        </div>
        <div id='cityTitle'>
            <h2>{props.cityData && props.cityData.LocalizedName}</h2>
            <button onClick={props.hendelFavorits}>{props.inFavotites ? <img src={redhearts}/> : <img src={heart}/>}</button>
        </div>
        <div id='mainTemperature'>
            <p>{ props.weatherData && Math.floor(props.weatherData.Temperature.Metric.Value)} { props.weatherData && props.weatherData.Temperature.Metric.Unit}</p>
            <p><img src={props.icon}/></p>
            {props.weatherData &&<p>{props.weatherData.WeatherText}</p>}
        </div>
        <div id='forcastWrap'>
        {props.forecastData && (
                <div id='allForcasts'>
                        {props.forecastData.map((day, index) => (
                            <div id='dayForcast' key={index}>
                                <p>{props.days[new Date(day.Date).getDay()]}</p>
                                <p>{Math.floor(fahrenheitToCelsius(day.Temperature.Maximum.Value))} C   -   {Math.floor(fahrenheitToCelsius(day.Temperature.Minimum.Value))} C</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    </div>
  )
}
