import React from "react";
import styled from "styled-components";
// import Locations from "./Locations";

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
          <div className="magnifying-glass-circle"></div>
          <div className="magnifying-glass-handle"></div>
        </button>
      </form>
      <button type="button" className="darkmode-btn" onClick={toggleMode}>
        <span
          className={`${isLightMode ? "btn-text" : "btn-text btn-text-light"}`}
        >
          dark mode &#127769;
        </span>
        <span
          className={`${isLightMode ? "btn-text" : "btn-text btn-text-light"}`}
        >
          light mode &#9728;&#65039;
        </span>
      </button>
      {/* <Locations /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  padding: 0.1rem 0.2rem;
  background-color: var(--navbar);

  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    padding-left: 0.5rem;
    font-size: 0.6rem;
    white-space: nowrap;
    line-height: 0.8rem;
  }
  form {
    position: relative;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      padding-left: 0.2rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: calc(100vw - 160px);
      height: 2rem;
      border: none;
      border-radius: 0;
      border-bottom: 3px solid var(--text);
      background-color: transparent;
      &:focus {
        outline: none;
      }
    }
    .search-btn {
      position: absolute;
      right: 0rem;
      background-color: transparent;
      border: none;
      width: 1.8rem;
      height: 1.8rem;
      &:hover {
        cursor: pointer;
      }
      .magnifying-glass-circle {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        width: 1rem;
        height: 1rem;
        border: 3px solid var(--text);
        border-radius: 50%;
      }
      .magnifying-glass-handle {
        position: absolute;
        top: 1.1rem;
        right: 0.9rem;
        width: 0.6rem;
        border-bottom: 3px solid var(--text);
        transform: rotate(-45deg);
      }
    }
  }
  .darkmode-btn {
    padding-right: 0.5rem;
    position: relative;
    width: 3.3rem;
    height: 2.6rem;
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .btn-text {
      font-family: "Goldman", cursive;
      font-size: 0.6rem;
      padding: 0.45rem 0;
      transition: 0.4s;
      font-weight: 700;
    }
    .btn-text-light {
      transform: translateY(-2.4rem);
      font-family: "Goldman", cursive;
    }
    &:hover {
      cursor: pointer;
    }
  }

  @media (min-width: 480px) {
    form > input {
      width: 18rem;
    }
  }
`;

export default Navbar;
