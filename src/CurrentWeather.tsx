import styled from "styled-components";
import { Location, CurrentConditions } from "./interfaces";

interface Temps {
  max: number;
  min: number;
}

type Props = {
  location: Location;
  currentConditions: CurrentConditions;
  temps: Temps;
};

const CurrentWeather = ({
  location,
  currentConditions,
  temps,
}: Props): JSX.Element => {
  const { icon, temp_f, text } = currentConditions;
  const temp = temp_f.toFixed(0);
  const min = temps.min.toFixed(0);
  const max = temps.max.toFixed(0);

  return (
    <Wrapper>
      <header className="location-temp">
        <h2>
          {location.name}, {location.state}
        </h2>
        <p className="currently">
          <span className="current-temp">
            {temp}&#176;<span className="f">F</span>
          </span>
        </p>
      </header>

      <div className="conditions-wrapper">
        <div className="icon-and-description">
          <img src={icon} alt={text} />
          <p>{text}</p>
        </div>
        <div className="low-high-temps-wrapper">
          <div className="low-high-temp">
            <p className="hi">Hi:</p> <span>{max}&#176;F</span>
          </div>
          <div className="low-high-temp">
            <p className="lo">Lo:</p> <p>{min}&#176;F</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 18rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .location-temp {
    margin-top: 2rem;
    height: 6rem;
  }

  h2 {
    text-align: center;
    text-shadow: 1px 2px 1px var(--shadow);
  }

  .currently {
    display: flex;
    justify-content: center;
    .current-temp {
      position: relative;
      font-size: 4rem;
      font-weight: 700;
      text-shadow: 2px 4px 2px var(--shadow);
    }
  }

  .conditions-wrapper {
    margin-top: 2rem;
    width: 18rem;
    display: flex;
    justify-content: space-between;
  }

  .icon-and-description {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 11rem;
    height: 9rem;
    width: 9rem;
    border-radius: var(--tile-radius);
    background-color: var(--glass);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 11rem;
    transform: var(--transform-icon);
    box-shadow: var(--current-cond-shadow);
    transition: border-radius 0.6s, transform 0.6s, background-color 0.6s,
      box-shadow 0.6s;
    img {
      transform: scale(1.2);
      transition: filter 0.6s;
      filter: drop-shadow(1px 3px 1px var(--background));
    }
    p {
      font-size: 1.2rem;
      text-align: center;
      color: var(--background);
    }
  }

  .low-high-temps-wrapper {
    margin: 2rem 0 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .low-high-temp {
      padding: var(--padding);
      text-shadow: 1px 2px 2px var(--shadow);
      display: flex;
      justify-content: space-between;
      box-shadow: var(--current-temp-shadow);
      transition: background-color 1s, transform 1s, padding 1s, box-shadow 1s;
      transform: var(--transform-hi-lo);
      &:nth-of-type(1) {
        background-color: var(--hot);
        margin: 0.5rem 0;
      }
      &:nth-of-type(2) {
        background-color: var(--cold);
      }
      .lo,
      .hi {
        width: 2rem;
      }
    }
  }
`;

export default CurrentWeather;
