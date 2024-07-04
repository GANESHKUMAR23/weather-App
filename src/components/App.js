
import '../css/App.css';
import '../css/weather.css';
import '../css/mediaquery.css';
import { WeatherApp } from './WeatherApp';
import { useState } from 'react';

function App() {

  const [windIcon,setWindIcon] = useState(false);
  const [humidityIcon,setHumidityIcon] = useState(false);
  const [visibilityIcon,setVisibilityIcon] = useState(false);
  const [pressureIcon,setPressureIcon] = useState(false);

  const containerClick = () => {

    console.log(windIcon);

    if(windIcon || pressureIcon || humidityIcon || visibilityIcon){
    setWindIcon(false);
    setHumidityIcon(false);
    setPressureIcon(false);
    setVisibilityIcon(false);
    }
}




  return (
    <div className="App" onClick={containerClick}>
       <WeatherApp
        containerClick = {containerClick}
        windIcon = {windIcon} setWindIcon = {setWindIcon}
        humidityIcon = {humidityIcon} setHumidityIcon = {setHumidityIcon}
        pressureIcon = {pressureIcon} setPressureIcon = {setPressureIcon}
        visibilityIcon = {visibilityIcon} setVisibilityIcon = {setVisibilityIcon}
       />
    </div>
  );
}

export default App;
