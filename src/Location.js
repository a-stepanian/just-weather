import React from "react";
import styled from "styled-components";

const Location = ({ location, temp, icon, text }) => {
  const { name: city, stateCode } = location;

  return (
    <Wrapper>
      <div className="header-location">
        <p>{city}</p>
        <p>{stateCode}</p>
      </div>
      <div className="header-weather">
        <p className="header-temp">{temp}&#176;F</p>
        <img src={icon} alt={text} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .header-location {
    display: flex;
    align-items: flex-end;
    padding-left: 0.5rem;
    p:nth-of-type(1) {
      font-size: 1rem;
      font-weight: 700;
    }
    p:nth-of-type(2) {
      font-size: 0.6rem;
      padding-left: 0.3rem;
      transform: translateY(-0.1rem);
    }
  }

  .header-weather {
    display: flex;
    align-items: center;
    transform: translateX(1.5rem);
    .header-temp {
      font-size: 0.9rem;
      font-weight: 700;
    }
    img {
      transform: scale(0.5) translate(-1.5rem, 0.05rem);
    }
  }
`;

export default Location;
