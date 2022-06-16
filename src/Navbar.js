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
    font-size: 0.6rem;
    white-space: nowrap;
    line-height: 0.8rem;
  }
  form {
    position: relative;
    display: flex;
    align-items: center;
    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 10rem;
      height: 2rem;
      background-color: transparent;
      border: none;
      border-radius: 0;
      border-bottom: 0.1rem solid var(--text);
      background-color: transparent;
    }
    .search-btn {
      position: absolute;
      right: 0rem;
      background-color: transparent;
      border: none;
    }
  }
  .darkmode-btn {
    padding-rightt: 0.5rem;
    position: relative;
    width: 3.4rem;
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
`;

export default Navbar;
