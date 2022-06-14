import React from "react";
import styled from "styled-components";

const CurrentWeather = ({
  currentConditions,
  location,
  temps: { min, max },
}) => {
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
  const { name: city, state } = location;
  return (
    <Wrapper>
      <p>
        {city}, {state}
      </p>
      <p>min: {min}&#176;F</p>
      <p>max: {max}&#176;F</p>
      <p>{temp_f}&#176;F</p>
      <img src={icon} alt={text} />
      <p>{text}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem;
  padding: 1rem;
  background-color: rgba(155, 155, 255, 0.5);
`;

export default CurrentWeather;
