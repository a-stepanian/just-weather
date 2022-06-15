import React from "react";
import styled from "styled-components";

const Navbar = ({
  handleChange,
  handleSubmit,
  isLightMode,
  setIsLightMode,
}) => {
  const toggleMode = () => {
    setIsLightMode((current) => !current);
  };
  return (
    <Wrapper>
      <h1>
        just the
        <br /> weather
      </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="location"></label>
        <input
          type="text"
          name="location"
          id="location"
          onChange={(e) => handleChange(e)}
        />
        <button className="search-btn" type="submit">
          &#128269;
        </button>
      </form>
      <button type="button" className="darkmode-btn" onClick={toggleMode}>
        <span>&#9728;&#65039;</span>
        <span>&#127769;</span>
        <div
          className={`${isLightMode ? "slider" : "slider slider-dark"}`}
        ></div>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  padding: 0.1rem 0.2rem;
  background-color: rgba(155, 155, 255, 0.5);

  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    padding-left: 0.5rem;
    font-size: 0.8rem;
    white-space: nowrap;
    line-height: 0.8rem;
  }
  form {
    position: relative;
    display: flex;
    align-items: center;
    input {
      width: 10rem;
      height: 2rem;
      background-color: transparent;
      border: none;
      border-bottom: 0.1rem solid var(--main);
    }
    .search-btn {
      position: absolute;
      right: 0.6rem;
      background-color: transparent;
      border: none;
    }
  }
  .darkmode-btn {
    position: relative;
    width: 2.7rem;
    height: 1.4rem;
    border-radius: 1rem;
    background-color: transparent;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    &:hover {
      cursor: pointer;
    }
    .slider {
      position: absolute;
      top: 0;
      left: 1.3rem;
      height: 1.2rem;
      width: 1.2rem;
      border-radius: 50%;
      background-color: var(--main);
      transition: 0.2s;
    }
    .slider-dark {
      left: 0rem;
    }
  }
`;

export default Navbar;
