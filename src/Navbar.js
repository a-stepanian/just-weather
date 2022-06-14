import React from "react";
import styled from "styled-components";

const Navbar = ({ handleChange, handleSubmit }) => {
  return (
    <Wrapper>
      <h1>just weather</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="location"></label>
        <input
          type="text"
          name="location"
          id="location"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">&#128269;</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 18rem;
  margin-top: 0.5rem;
  padding: 0.1rem 0.2rem;
  border-radius: 1rem;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    padding-left: 0.5rem;
    font-size: 0.8rem;
    white-space: nowrap;
    font-family: "Baloo 2", cursive;
  }
  form {
    position: relative;
    display: flex;
    align-items: center;
    input {
      padding: 0.1rem 0.5rem;
      border-radius: 1rem;
      border: 0.1rem solid rgba(0, 0, 0, 0.1);
    }
    button {
      position: absolute;
      right: 0.5rem;
      background-color: transparent;
      border: none;
    }
  }
`;

export default Navbar;
