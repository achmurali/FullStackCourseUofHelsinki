import React, { useState,useEffect,useRef } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

const Country = ({country,disable}) => {

  const _isMounted = useRef(true);
  const [ weather, setWeather ] = useState({
    current: {
      temperature : '0',
      wind_degree : '0',
      wind_speed : '0',
      wind_dir : '-',
      weather_icons : '#'
    }
  })

  useEffect(() => {
      axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_KEY}&query=${country.name}`)
            .then((response) => {
            if(_isMounted.current)
              setWeather(response.data)
            })
    return () => {
      _isMounted.current = false
    }
  },[country])

  return (
    <>
    {
    (!disable) ?
    <div>
      <h1> {country.name} </h1>
      <div> {country.capital} </div>
      <div> {country.population} </div>
      <h3>language</h3>
      <ul>
        {country.languages.map((language) => <li key = {language.name}>{language.name}</li>)}
      </ul>
      <img src = {country.flag} height = "100" width = "100"/>
      <h3>Weather in {country.name}</h3>
      <div><strong>temperature : </strong>{weather.current.temperature} Celcius</div>
      <div><img src = {weather.current.weather_icons}/></div>
      <div><strong>wind : </strong>{`${weather.current.wind_speed} ${weather.current.wind_degree} ${weather.current.wind_dir}`}</div>
    </div>
    : <div></div> 
    }
    </>
  )
}

const Countries = ({countries}) => {
  const count = countries.length;
  const [ lists, setLists ] = useState(() => {
    return []
  })

  useEffect( () => {
    setLists(Array(countries.length).fill(true))
  },[countries])

  const handleClick = (index) => {
    let temp = [...lists]
    temp[index] = !temp[index];
    setLists(temp)
  }
  return(
    <>
    { 
      count === 1 ? <Country country = {countries[0]} disable = {false} /> : 
      count > 10 ? "Too many matches, specify another filter" : 
      countries.map((country,index) => <li key = {country.name} > {country.name} 
      <button onClick = {(e) => handleClick(index)}> show </button>
      <Country country = {country} disable = {lists[index]} />
      </li>)
    }
    </>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ input, setInput ] = useState('')
  const [ list,setList ] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => 
      {
      setCountries(response.data)
      }
    )
  },[])

  const handleInput = (event) => {
    setInput(event.target.value)
    setList(countries.filter((country) => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      find countries : <input value = {input} onChange = {handleInput}/>
      <br/>
      <Countries countries = {list}/>
    </div>
  )

}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

