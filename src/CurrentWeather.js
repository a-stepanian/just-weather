import React from "react";
import styled from "styled-components";

const CurrentWeather = ({ location, currentConditions, temps }) => {
  const { icon, temp_f, text } = currentConditions;
  const temp = temp_f.toFixed(0);
  const min = temps.min.toFixed(0);
  const max = temps.max.toFixed(0);
  return (
    <Wrapper>
      <h2>{location.name}</h2>
      <p className="currently">
        <span className="current-temp">
          {temp}&#176;<span className="f">F</span>
        </span>
      </p>
      <div className="conditions-wrapper">
        <div className="icon-and-description">
          <img src={icon} alt={text} />
          <p>{text}</p>
        </div>
        <div className="low-high-temps-wrapper">
          <div className="low-high-temp">
            <p className="lo">Lo:</p> <p>{min}&#176;F</p>
          </div>
          <div className="low-high-temp">
            <p className="hi">Hi:</p> <span>{max}&#176;F</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 18rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    text-shadow: 1px 2px 1px var(--shadow);
  }

  .currently {
    .current-temp {
      position: relative;
      font-size: 4rem;
      font-weight: 700;
      text-shadow: 1px 3px 1px var(--shadow);
    }
  }

  .conditions-wrapper {
    margin-top: 2rem;
    width: 18rem;
    display: flex;
    justify-content: space-between;
  }

  .icon-and-description {
    padding: 1.5rem 0.5rem;
    border-radius: 0.3rem;
    background-color: var(--glass);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 11rem;
    box-shadow: 1px 2px 2px var(--shadow);

    img {
      transform: scale(1.2);
      filter: drop-shadow(1px 3px 1px var(--shadow));
    }
    p {
      font-size: 1.2rem;
      text-align: center;
    }
  }

  .low-high-temps-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .low-high-temp {
      padding: 0.5rem 0;
      text-shadow: 1px 2px 2px var(--shadow);
      width: 6rem;
      display: flex;
      justify-content: space-between;
      .lo,
      .hi {
        width: 2rem;
      }
    }
  }
`;

export default CurrentWeather;
