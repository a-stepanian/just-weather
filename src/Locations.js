import React from "react";
import styled from "styled-components";

const Locations = () => {
  return (
    <Wrapper>
      <div className="result-container">
        result1 <br />
        result1 <br />
        result1 <br />
        result1
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 3rem;
  width: 99%;
  display: flex;
  justify-content: center;
  .result-container {
    z-index: 1;
    width: calc(100vw - 160px);
    background-color: white;
  }

  @media (min-width: 480px) {
    .result-container {
      width: 18rem;
    }
  }
`;

export default Locations;
