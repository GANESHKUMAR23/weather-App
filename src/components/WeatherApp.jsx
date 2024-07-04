import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import { WiHumidity } from "react-icons/wi";
import { BsWind } from "react-icons/bs";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { GiTiredEye } from "react-icons/gi";
import { PiInfo } from "react-icons/pi";
import { FcSearch } from "react-icons/fc";

import d01 from '../assets/weather/01d.svg';
import d02 from '../assets/weather/02d.svg';
import d03 from '../assets/weather/03d.svg';
import d04 from '../assets/weather/04d.svg';
import d09 from '../assets/weather/09d.svg';
import d10 from '../assets/weather/10d.svg';
import d11 from '../assets/weather/11d.svg';
import d13 from '../assets/weather/13d.svg';
import d50 from '../assets/weather/50d.svg';

import n01 from '../assets/weather/01n.svg';
import n02 from '../assets/weather/02n.svg';
import n03 from '../assets/weather/03n.svg';
import n04 from '../assets/weather/04n.svg';
import n09 from '../assets/weather/09n.svg';
import n10 from '../assets/weather/10n.svg';
import n11 from '../assets/weather/11n.svg';
import n13 from '../assets/weather/13n.svg';
import n50 from '../assets/weather/50n.svg';

import cloudyv3 from '../assets/CloudyV3.svg';

const weatherIcon = {
  "01d": d01, "01n": n01,
  "02d": d02, "02n": n02,
  "03d": d03, "03n": n03,
  "04d": d04, "04n": n04,
  "09d": d09, "09n": n09,
  "10d": d10, "10n": n10,
  "11d": d11, "11n": n11,
  "13d": d13, "13n": n13,
  "50d": d50, "50n": n50
}

console.log(weatherIcon['01n']);




export const WeatherApp = ({humidityIcon,setHumidityIcon,visibilityIcon,setVisibilityIcon,pressureIcon,setPressureIcon,windIcon,setWindIcon,containerClick}) => {

  const ref = useRef(null);

  const [text,setText] = useState("salem");
  const [city,setCity] = useState("");
  const [country,setCountry] = useState("In");
  const [celsius,setCelsius] = useState(28);
  const [lon,setLon] = useState(0);
  const [lat,setLat] = useState(0);
  const [humidity,setHumidity] = useState(0);
  const [windSpeed,setWindSpeed] = useState(0);
  const [pressure,setPressure] = useState(0);
  const [Visibility,setVisibility] = useState(0);
  const [feelsLike,setFeelsLike] = useState(0);
  const [description,setDescription] = useState("");
  const [icon,setIcon] = useState("");

  // const [windIcon,setWindIcon] = useState(false);
  // const [humidityIcon,setHumidityIcon] = useState(false);
  // const [visibilityIcon,setVisibilityIcon] = useState(false);
  // const [pressureIcon,setPressureIcon] = useState(false);


  const pressureInfo = `Pressure is the weight of air in the atmosphere. It is normalized to the standard atmospheric pressure of ${pressure} mb. Higher pressure is usually associated with sunny weather, lower pressure with stormy weather.`;

  const humidityInfo = `Amount of moisture present in the air relative to the maximum amount of moisture the air can contain at its current temperature.`;

  let visibilityInfo="";
  if(Visibility >= 0.5 && Visibility <= 1){
      visibilityInfo="Mist or Thin (0.5 - 1 km)";
  }
  else if(Visibility >= 2 && Visibility <= 5){
      visibilityInfo="Moderate visibility (2 - 5 km)";
  }
  else if(Visibility >= 6 && Visibility <= 10){
      visibilityInfo="Good visibility (5 - 10 km)";
  }
  else if(Visibility >= 11 && Visibility <= 30){
    visibilityInfo="Very good visibility (10 - 30 km)";
  }
  else{
    visibilityInfo = "Wait a few seconds data is fetching...";
  }

  let windInfo="";
  let windTitle="";
  if(windSpeed >= 0.5 && windSpeed <= 1){
      windInfo="Mist or Thin (0.5 - 1 km)";
  }
  else if(windSpeed >= 2 && windSpeed <= 5){
      windTitle = "Light air (2 - 5 km/h)";
      windInfo=` Direction shown by smoke drift but not by wind vanes.`;
  }
  else if(windSpeed >= 6 && windSpeed <= 11){
      windTitle="Light breeze (6 - 11 km/h)";
      windInfo=" wind felt on face; leaves rustle; wind vane moved by wind.";
  }
  else if(windSpeed >= 12 && windSpeed <= 19){
    windTitle="Gentle breeze (12 - 39 km/h) "
    windInfo="Leaves and small twigs in constant motion.";
  }
  else{
    windInfo = "Wait a few seconds data is fetching...";
  }
  
  function handleCity(e){
    setText(e.target.value);
    ref.current.focus();

  }

  function handleKeyDown(e){
    if(e.key === "Enter"){
      searchAPI();
      document.getElementById("search").value = "";
      ref.current.focus();
    }
  }

  useEffect(()=>{
    ref.current.focus();
    searchAPI();
  },[])



  const searchAPI = async () => {

    const api_key = '15b88ad2932536a9ced73d357124012d';

    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

      let response = await fetch(url);
      let data = await response.json();
      console.log("-----------------------------------",data);

      if(data.cod === "404"){
        
        alert("Please Enter The Correct City");
        return;
      }

      setCity(data.name)
      setCelsius(()=>Math.floor(data.main.temp));
      setHumidity(()=>data.main.humidity);
      setWindSpeed(()=>data.wind.speed);
      setCountry(()=>data.sys.country);
      setLat(()=>data.coord.lat);
      setLon(()=>data.coord.lon);
      setPressure(data.main.pressure);
      setVisibility(data.visibility/1000);
      setFeelsLike(data.main.feels_like);
      setDescription(()=>data.weather[0].description);
      setIcon(data.weather[0].icon);

      

      
      console.log(data.weather[0].icon);

    }
    catch(err){
      alert("Error...............");
    }
    finally{
      document.getElementById("search").value = "";
      ref.current.focus();

    }

  }

  const infoShowIcon = (info) => {
    // alert(typeof info);

      if(info === "windIcon"){
        setWindIcon(true);
      }
      else if(info === "humidityIcon")
        setHumidityIcon(true);
      else if(info === "pressureIcon")
        setPressureIcon(true);
      else
        setVisibilityIcon(true);

  }

  // const containerClick = () => {
  //     if(windIcon || pressureIcon || humidityIcon || visibilityIcon){
  //     setWindIcon(false);
  //     setHumidityIcon(false);
  //     setPressureIcon(false);
  //     setVisibilityIcon(false);
  //     }
  // }
 


  return (
    <>
      <div className="container" onClick={containerClick}>

        <motion.div className="search-box" >
          <input type="text" ref={ref} name="search" id="search"  placeholder='search' onChange={handleCity} onKeyDown={handleKeyDown}/>
          <i onClick={searchAPI} className='search-icon' ><FcSearch /></i>
        </motion.div>

        <div className="content-box">
          <div className='weather-row' >
          <AnimatePresence mode='wait'>
            <motion.div className="weather-icon">
              
                <motion.img src={weatherIcon[icon] || cloudyv3} alt="error on image"
                  initial={{
                    opacity:0,
                    y:10
                  }}
                  animate={{
                    opacity:1,
                    y:0
                  }}
                  exit={{
                    opacity:0,
                    y:-10
                  }}
                  transition={{
                    duration:3,delay:0.8
                  }}
                />
              
            </motion.div>
            </AnimatePresence>
            <div className='weather-desc'>
                <motion.p className='descprition'
                  initial={{
                    opacity:0,
                    w:600
                  }}
                  animate={{
                    opacity:1,
                    w:0
                  }}
                  transition={{
                    duration:1,
                    delay:0.5
                  }}
                >{description || "Mostly Cloud"}</motion.p>
                <p className='feelsLike'>Feels Like {Math.floor(feelsLike)} °<span className='degree'>c</span></p>
            </div>
          </div>
          <div className="weather-temp">
                <h4>{celsius}°<span className='degreeTemp'>c</span></h4>
            </div>
          <div className="weather-details">
                <p className='city'>{city}</p>
                <h2>,</h2>
                <p className='country'>{country}</p>
              
            </div>
          <div className="angles">
            <div className="lon">
              <p>longitude</p><span>{lon}</span>
            </div>
            <div className="lat">
            <p>latitude</p><span>{lat}</span>
            </div>
          </div>
        </div>

        <div className="content-box2">
         
          <div className="element">
            <span><i><LiaTemperatureHighSolid /></i> {pressure} mb</span>
            <span>Pressure <motion.i className='info info-pressure' 
              onClick={()=>infoShowIcon("pressureIcon")}
              onHoverStart={() => setPressureIcon(!pressureIcon)}
              onHoverEnd={() => setPressureIcon(!pressureIcon)}
             
            ><PiInfo /></motion.i></span>
            {pressureIcon && <p className='i-icon pressure-icon'>{pressureInfo}</p>}

            
          </div>
          <div className="element">
            <span><i><GiTiredEye /></i> {Visibility} km</span>
            <span>Visibility <motion.i className='info info-visibility'
              onClick={()=>infoShowIcon("visibilityIcon")}
              onHoverStart={()=>setVisibilityIcon(!visibilityIcon)}
              onHoverEnd={()=>setVisibilityIcon(!visibilityIcon)}
            ><PiInfo /></motion.i></span>
            {visibilityIcon && <p className='i-icon visibility-icon'>{visibilityInfo}</p>}

            
          </div>

          <div className="element">
            <span><i><WiHumidity /></i> {humidity} %</span>
            <span>Humidity <motion.i className='info ' 
                onClick={()=>infoShowIcon("humidityIcon")}
              onHoverStart={()=>setHumidityIcon(!humidityIcon)}
              onHoverEnd={() => setHumidityIcon(!humidityIcon)}
            ><PiInfo /></motion.i></span>
            {humidityIcon && <p className='i-icon humidity-icon'>{humidityInfo}</p>}
            
          </div>
          <div className="element">
            <span><i><BsWind/></i> {windSpeed} km/h</span>

            <motion.span>wind speed <motion.i className='info'
                onClick={()=>infoShowIcon("windIcon")}
                onHoverStart={()=>setWindIcon(!windIcon)}
                onHoverEnd={() => setWindIcon(!windIcon)}
            >
            <PiInfo />
            </motion.i></motion.span>
              {windIcon && <div className='i-icon wind-info'>
                                <p className='windTitle'>{windTitle}</p>
                                {windInfo}
                          </div>}
            

          </div>
          

        </div>

        <p className='footer'>
          created by 
          <motion.span
            initial={{
              opacity:0,x:-100
            }}
            animate={{
              opacity:1,x:0
            }}
            whileHover={{
              color:"red"
             
            }}
          > @Ganesh kumar T </motion.span>
        </p>

      </div>
    </>
  )
}
