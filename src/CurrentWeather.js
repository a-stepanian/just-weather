import React from "react";
import styled from "styled-components";

const CurrentWeather = ({ currentConditions, temps: { min, max } }) => {
  const {
    icon,
    temp_f,
    text,
    // cloud,
    // feelslike_f,
    // humidity,
    // precip_in,
    // pressure_in,
    // wind_degree,
    // wind_dir,
    // wind_mph,
  } = currentConditions;
  return (
    <Wrapper>
      <h2>Current Conditions</h2>
      <p className="currently">
        <span className="current-temp">
          {temp_f}&#176;<span className="f">F</span>
        </span>
      </p>
      <img src={icon} alt={text} />
      <p>{text}</p>
      <p>Low: {min}&#176;F</p>
      <p>High: {max}&#176;F</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 18rem;
  height: 18rem;
  padding: 1rem;
  background-color: rgba(155, 155, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  .currently {
    .current-temp {
      position: relative;
      font-size: 3rem;
      font-weight: 700;
      .f {
        position: absolute;
        bottom: 0.5rem;
        right: 0.2rem;
        font-size: 1.4rem;
        font-weight: 700;
      }
    }
  }
`;

export default CurrentWeather;
