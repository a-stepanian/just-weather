import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CurrentWeather from "./CurrentWeather";
import Navbar from "./Navbar";
import HourlyForecast from "./HourlyForecast";
import { SingleDayForecast, Location, CurrentConditions } from "./interfaces";

export const App = () => {
  // used to prevent first weather fetching useEffect from running on first render
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cityInput, setCityInput] = useState<string>("Port Angeles");
  const [stateInput, setStateInput] = useState<string>("WA");
  // const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState<Location>({
    lat: 0,
    lon: 0,
    name: "",
    state: "",
    stateCode: "",
  });
  const [currentConditions, setCurrentConditions] = useState<CurrentConditions>(
    {
      temp_f: 0,
      wind_mph: 0,
      wind_degree: 0,
      wind_dir: "",
      pressure_in: 0,
      precip_in: 0,
      humidity: 0,
      cloud: 0,
      feelslike_f: 0,
      uv: 0,
      text: "",
      icon: "",
    }
  );
  const [weatherForecast, setWeatherForecast] = useState<SingleDayForecast[]>(
    []
  );

  const fetchLocation = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${stateInput},US&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER}`
      );
      const data = await response.json();
      if (!data[0]) {
        throw new Error(
          `Error with location.  Did not find locations matching ${cityInput}${
            stateInput && `, ${stateInput}`
          }`
        );
      } else {
        // setLocations(data);
        const { lat, lon, name, state } = data[0];
        const stateCode = stateInput.toUpperCase();
        setLocation({ lat, lon, name, state, stateCode });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER}&q=${location.lat},${location.lon}&days=3&aqi=no&alerts=no`
      );
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
            const { time, temp_f, chance_of_rain, chance_of_snow } = hour;
            const { icon, text } = hour.condition;
            const index = time.indexOf(" ");
            const justTime = time.slice(index, time.length);
            hourlyTemp.push({
              time: justTime,
              temp_f,
              chance_of_rain,
              chance_of_snow,
              icon,
              text,
            });
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
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // handle form input change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // handle form submission event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchLocation();
    await fetchWeatherData();
  };

  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      fetchWeatherData();
    } else {
      setIsFirstRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.name, location.state]);

  return (
    <Wrapper className={`${isLightMode ? "light-mode" : "dark-mode"}`}>
      <Navbar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
      />
      {isLoading && <h1>LOADING.....................</h1>}

      {!isLoading && (
        <>
          <CurrentWeather
            currentConditions={currentConditions}
            location={location}
            temps={{
              max: weatherForecast[0].maxtemp_f,
              min: weatherForecast[0].mintemp_f,
            }}
          />
          <HourlyForecast weatherForecast={weatherForecast} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background);
  transition: background-color 1s;
`;
