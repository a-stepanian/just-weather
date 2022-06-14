import { useEffect, useState } from "react";

function App() {
  const [cityInput, setCityInput] = useState("Atlanta");
  const [stateInput, setStateInput] = useState("GA");
  const [location, setLocation] = useState({
    lat: 33.75,
    lon: -84.39,
    name: "Atlanta",
    state: "Georgia",
  });
  const [currentConditions, setCurrentConditions] = useState({});
  const [weatherForecast, setWeatherForecast] = useState([]);

  //-------------------------------------//
  // API ENDPOINTS                       //
  //-------------------------------------//

  // Endpoint for getting location
  const locationNameUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${stateInput},US&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER}`;

  // Endpoint for getting current weather
  const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER}&q=${location.lat},${location.lon}&aqi=no`;

  // Endpoint for getting forecast
  const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER}&q=${location.lat},${location.lon}&days=3&aqi=no&alerts=no`;

  //-------------------------------------//
  // FORM INPUT CHANGE HANDLER           //
  //-------------------------------------//

  // Set the stateInput and cityInput state values from the single input element.
  const handleChange = (e) => {
    if (e.target.value.includes(",")) {
      const index = e.target.value.indexOf(",");
      setStateInput(
        e.target.value.slice(index + 1, e.target.value.length).trim()
      );
      setCityInput(e.target.value.slice(0, index));
    } else {
      setCityInput(e.target.value);
    }
  };

  //-------------------------------------//
  // Functions to fetch data from APIs   //
  //-------------------------------------//

  const fetchLocation = async () => {
    try {
      const response = await fetch(locationNameUrl);
      const data = await response.json();
      // if no location is found throw error, otherwise, set the location from the first element in the data array (sometimes there is more than one element matching the specific city/state but with slightly different latitude and longitude coordinates, so just using the first one).
      if (!data[0]) {
        throw new Error(
          `Error with location.  Did not find locations matching ${cityInput}${
            stateInput && `, ${stateInput}`
          }`
        );
      } else {
        const { lat, lon, name, state } = data[0];
        await setLocation({ lat, lon, name, state });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(forecastUrl);
      const data = await response.json();
      if (!data.location.name) {
        throw new Error("Error with current weather.");
      } else {
        // set the currentConditions state
        const {
          temp_f,
          wind_mph,
          wind_degree,
          wind_dir,
          pressure_in,
          precip_in,
          humidity,
          cloud,
          feelslike_f,
          uv,
        } = data.current;
        const { text, icon } = data.current.condition;
        setCurrentConditions({
          temp_f,
          wind_mph,
          wind_degree,
          wind_dir,
          pressure_in,
          precip_in,
          humidity,
          cloud,
          feelslike_f,
          uv,
          text,
          icon,
        });

        // set the forecast state
        const forecast = [];
        for (let day of data.forecast.forecastday) {
          const { date } = day;
          const { sunrise, sunset } = day.astro;
          const {
            avghumidity,
            avgtemp_f,
            daily_chance_of_rain,
            daily_chance_of_snow,
            daily_will_it_rain,
            daily_will_it_snow,
            maxtemp_f,
            maxwind_mph,
            mintemp_f,
            totalprecip_in,
          } = day.day;
          const { text, icon } = day.day.condition;
          const hourlyTemp = [];
          for (let hour of day.hour) {
            const { time, temp_f } = hour;
            hourlyTemp.push({ time, temp_f });
          }
          forecast.push({
            date,
            sunrise,
            sunset,
            avghumidity,
            avgtemp_f,
            daily_chance_of_rain,
            daily_chance_of_snow,
            daily_will_it_rain,
            daily_will_it_snow,
            maxtemp_f,
            maxwind_mph,
            mintemp_f,
            totalprecip_in,
            text,
            icon,
            hourlyTemp,
          });
        }
        setWeatherForecast(forecast);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //--------------------------------------//
  // FORM SUBMISSION HANDLER TO           //
  // TRIGGER LOCATION FETCH               //
  //--------------------------------------//

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLocation();
    // after fetching the location and updating the location state, the useEffect below will be triggered to fetch the weather data.
  };

  //--------------------------------------//
  // TRIGGER WEATHER FETCH INITIALLY/WHEN //
  // LOCATION HAS BEEN UPDATED            //
  //--------------------------------------//

  useEffect(() => {
    console.log("fetching weather data!");
    fetchWeatherData();
  }, [location.lat]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          name="location"
          id="location"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Go</button>
      </form>
      <p>example: Austin, TX</p>
    </>
  );
}

export default App;
