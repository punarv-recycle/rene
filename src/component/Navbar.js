import React from "react";
import { styled } from "styled-components";
import Logo from "../assets/images/Logo-black-small.png";
import { Link } from "react-router-dom";
import { IoIosFitness, IoIosHome, IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  return (
    <Nav>
      <Link to="/">
        <img src={Logo} alt="Workout Trainer" />
      </Link>
      <ul>
        <Link to="/home" style={{ textDecoration: "none", color: "Black" }}>
          <li className="listitem">Home</li>
        </Link>
        <Link to="/home" style={{ textDecoration: "none", color: "Black" }}>
          <IoIosHome size={25} className="icons" />
        </Link>
        <Link
          to="/exercises"
          style={{ textDecoration: "none", color: "Black" }}
        >
          <li className="listitem">Exercises</li>
        </Link>
        <Link
          to="/exercises"
          style={{ textDecoration: "none", color: "Black" }}
        >
          <IoIosFitness size={25} className="icons" />
        </Link>
        <Link
          to="/login"
          onClick={() => localStorage.removeItem("token")}
          style={{ color: "#000", textDecoration: "none" }}
        >
          <li className="listitem">Logout</li>
        </Link>
        <Link
          to="/login"
          onClick={() => localStorage.removeItem("token")}
          style={{ textDecoration: "none", color: "Black" }}
        >
          <IoIosLogOut size={25} className="icons" />
        </Link>
      </ul>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.div`
  height: 70px;
  background-color: #fffafb;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 30px;
  margin-top: 20px;
  img {
    height: 40px;
  }
  ul {
    display: flex;
    list-style-type: none;
    width: 300px;
    align-items: center;
    justify-content: space-around;
    margin-left: 100px;
    font-weight: bold;
    font-size: 20px;
  }
  .icons {
    display: none;
    size: 100px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 5px;
    img {
      height: 35px;
    }
  }
  @media screen and (max-width: 992px) {
    ul {
      margin-left: 50px;
    }
  }
  @media screen and (max-width: 568px) {
    margin-left: 10px;
    .listitem {
      display: none;
    }
    .icons {
      display: inline;
    }
  }
`;
