
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Weather from './components/Weather'

function App() {
  
  const[response, setResponse] = useState({})

  // the way to access to the appi 
  const apikey = "37a42d3c0b5b4771f315e29c4618ee63" 

  
  useEffect ( () => {
    navigator.geolocation.getCurrentPosition( (position) => {
      console.log(position)

      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}`)
      .then ( (resp)  => setResponse(resp.data))
      .catch ( error => console.error(error))
    })

  }, []
  )

  // this section is accessing to another Appi through a city name
  const[city, setCity] = useState ("")
  const searchByCity = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
      .then ( (resp)  => setResponse(resp.data))
      .catch ( error => console.error(error))
  }
  return (

   <div className="App"> 
      <div id='find'>
        <input type="text" className='input'
        value={city} 
        onChange={ (e) => setCity(e.target.value)}
        />
        <button className='buttonFind' onClick={searchByCity} > Find</button>
      </div>
      <div id='card'>
      <img id='image' src={`https://openweathermap.org/img/wn/${response.weather?.[0].icon}@2x.png`} alt="" />
          <div className='upCard'>
          <h1 id='degree'>{(response.main?.temp - 273.15).toFixed(0)}°C</h1>
          
          </div>
          <div className='middleCard'>
          <p id='descrption'><span>Wind:</span> {response.wind?.speed}</p>
          <p id='descrption1'><span>Clouds:</span> {response.clouds?.all} </p>
          <p id='descrption2'><span>Pressure:</span> {response.main?.pressure} </p>
          </div>
          <div className='downCard'>
          <h2 id='city' >{response.name}, {response.sys?.country} </h2>
          <h3 id='weather' >{response.weather?.[0].description}</h3>
          </div>
        </div>
    </div>
    
  )
}

export default App
