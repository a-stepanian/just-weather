import React from "react";
import styled from "styled-components";

const HourlyForecast = ({ weatherForecast }) => {
  const currentTime = new Date().getHours();

  const formatTime = (time) => {
    // Make formattedTime variable 12hr am/pm format
    if (time > 0 && time < 12) {
      return time.toString() + "am";
    } else if (time > 12 && time < 25) {
      return (time - 12).toString() + "pm";
    } else if (time === 12) {
      return "12pm";
    } else {
      return "12am";
    }
  };

  const hourlyWeather = [];
  for (let i = 0; i < weatherForecast.length; i++) {
    for (let j = 0; j < weatherForecast[i].hourlyTemp.length; j++) {
      // Start hourlyWeather array at current time
      if (i > 0 || (i === 0 && j >= currentTime)) {
        // parse time to 2 digit integer
        const time = parseInt(
          weatherForecast[i].hourlyTemp[j].time.slice(0, 3),
          10
        );
        let formattedTime = formatTime(time);

        // remove decimal from temperatures
        const formattedTemp =
          weatherForecast[i].hourlyTemp[j].temp_f.toFixed(0);

        hourlyWeather.push({
          ...weatherForecast[i].hourlyTemp[j],
          formattedTime,
          formattedTemp,
        });
      }
    }
  }

  return (
    <Wrapper>
      {hourlyWeather.map((hour, index) => {
        const { formattedTime, chance_of_rain, icon, text, formattedTemp } =
          hour;
        return (
          <article key={index}>
            <p>{formattedTime}</p>
            <p>{formattedTemp}&#176;F</p>
            <p>{chance_of_rain}%</p>
            <div className="img-wrapper">
              <img src={icon} alt={text} />
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  article {
    margin: 1.4rem 0;
    background-color: var(--hourly);
    width: 18rem;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      width: 3.8rem;
      text-align: end;
    }
    .img-wrapper {
      width: 3.8rem;
      height: 200%;
      text-align: end;
      img {
        height: 100%;
      }
    }
  }
`;

export default HourlyForecast;
