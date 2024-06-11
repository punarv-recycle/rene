import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to={"/home"}>
        <button>Go to Home</button>
      </Link>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  h1 {
    color: black;
    font-size: 200px;
  }
  p {
    font-size: 50px;
  }
  button {
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    height: 40px;
    width: 150px;
    margin: 20px;
  }
  @media screen and (max-width: 568px) {
    h1 {
      font-size: 100px;
    }
    p {
      font-size: 30px;
    }
  }
`;
