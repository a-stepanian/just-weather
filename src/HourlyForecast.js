import React from "react";
import styled from "styled-components";

const HourlyForecast = ({ weatherForecast }) => {
  const currentTime = new Date().getHours();

  const hourlyWeather = [];
  for (let i = 0; i < weatherForecast.length; i++) {
    for (let j = 0; j < weatherForecast[i].hourlyTemp.length; j++) {
      // Start hourlyWeather array at current time
      if (i > 0 || (i === 0 && j >= currentTime)) {
        const time = parseInt(
          weatherForecast[i].hourlyTemp[j].time.slice(0, 3),
          10
        );
        // Make formattedTime variable 12hr am/pm format
        let formattedTime = "";
        if (time > 0 && time < 12) {
          formattedTime = time.toString() + "AM";
        } else if (time > 12 && time < 25) {
          formattedTime = (time - 12).toString() + "PM";
        } else if (time === 12) {
          formattedTime = "12PM";
        } else {
          formattedTime = "12AM";
        }
        console.log(time);
        console.log(formattedTime);

        hourlyWeather.push({
          ...weatherForecast[i].hourlyTemp[j],
          formattedTime,
        });
      }
    }
  }

  return (
    <Wrapper>
      {hourlyWeather.map((hour) => {
        const {
          formattedTime,
          temp_f,
          chance_of_rain,
          chance_of_snow,
          icon,
          text,
        } = hour;
        return (
          <article>
            <p>{formattedTime}</p>
            <p>{temp_f}</p>
            <p>{chance_of_rain}%</p>
            <p>{chance_of_snow}%</p>
            <img src={icon} alt={text} />
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  article {
    width: 18rem;
    height: 1rem;
    display: flex;
    justify-content: space-between;
  }
`;

export default HourlyForecast;
