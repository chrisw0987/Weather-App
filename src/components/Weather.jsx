import React, {useState,useEffect,useRef} from 'react';
import './Weather.css';
import searchIcon from '../assets/search.png';
import clearIcon from '../assets/clear.png';
import cloudyIcon from '../assets/cloudy.png';
import drizzleIcon from '../assets/drizzle.png';
import humidityIcon from '../assets/humidity.png';
import rainIcon from '../assets/rain.png';
import snowIcon from '../assets/snow.png';
import windIcon from '../assets/wind.png';
import cloudPic from '../assets/cloudPic.webp';
import nightStars from '../assets/nightStars.png';
import astronaut from '../assets/astronaut.webp';
import airplane from '../assets/airplane.png';

function Weather() {
    const [color, setColor] = useState('linear-gradient(45deg, rgb(255, 204, 102), rgb(70, 130, 180))');
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudyIcon,
        "02n": cloudyIcon,
        "03d": cloudyIcon,
        "03n": cloudyIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,
    }
    const backgroundColors = {
        "01d": "rgb(250, 216, 122)", // Clear (day)
        "01n": "rgb(60, 60, 171)", // Clear (night)
        "02d": "rgb(201, 198, 198)", // Cloudy (day)
        "02n": "rgb(60, 60, 171)", // Cloudy (night)
        "03d": "rgb(201, 198, 198)", // Cloudy (day)
        "03n": "rgb(60, 60, 171)", // Cloudy (night)
        "04d": "rgb(84, 79, 79)", // Drizzle (day)
        "04n": "rgb(60, 60, 171)", // Drizzle (night)
        "09d": "rgb(52, 48, 48)", // Rain (day)
        "09n": "rgb(60, 60, 171)", //Rain (night)
        "10d": "rgb(52, 48, 48)", // Rain (day)
        "10n": "rgb(60, 60, 171)", //Rain (night)
        "13d": "rgb(206, 206, 210)", // Snow (day)
        "13n": "rgb(60, 60, 171)" // Snow (night)
    };
    

    const search = async (city)=>{
        if(city === ""){
            alert("Please Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const iconCode = data.weather[0].icon;
            const icon = allIcons[iconCode] || clearIcon; 
            const newColor = backgroundColors[iconCode] || "linear-gradient(45deg, rgb(255, 204, 102), rgb(70, 130, 180))";

            setColor(newColor);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
            
        } catch(error){
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }

    useEffect(()=>{
        search("New York");
    }, [])
    useEffect(()=>{
    document.body.style.background = color;
    }, [])
  return (
    <>
    <h1 className="weather-title">Weather App Project</h1>

    <img className="cloud-pic1" src={cloudPic}/>
    <img className="cloud-pic2" src={cloudPic}/>
    <img className="airplane" src={airplane}/>
    <img className="night-stars" src={nightStars}/>
    <img className="astronaut" src={astronaut}/>

    <div className="weather" style={{background:color}}>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Search"/>
            <img className="search-icon" src={searchIcon} alt="Search" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
        <img className="weather-icon" src={weatherData.icon} alt="weather-icon"></img>
        <p className="temperature">{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidityIcon} alt=""></img>
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col">
                <img src={windIcon} alt=""></img>
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div></>:<></>}
    </div>
    </>
  )
}

export default Weather