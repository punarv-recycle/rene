import React, { useState } from "react";
import { styled } from "styled-components";
import Logo from "../assets/images/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosHome, IoIosLogOut } from "react-icons/io";
import { BiLogoDailymotion } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { TbCoinRupee } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { useAuth } from "./AuthContext"; // Ensure the path is correct
import supabase from "./utils";

const Head = () => {
  const { role } = useAuth();
  // console.log(role)
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <Nav>
      <Link to="/">
        <LogoImg src={Logo} alt="Workout Trainer" />
      </Link>
      <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </Hamburger>
      <NavLinks menuopen={menuOpen}>
        <NavItem to="/home" onClick={() => setMenuOpen(false)}>
          <IoIosHome size={25} className="icons" />
          <span className="text">Home</span>
        </NavItem>
        {role ? (
          role === "OWNER" ? (
            <>
              <NavItem to="/dailyUpdates" onClick={() => setMenuOpen(false)}>
                <BiLogoDailymotion size={25} className="icons" />
                <span className="text">Daily update</span>
              </NavItem>
              <NavItem to="/sale" onClick={() => setMenuOpen(false)}>
                <TbCoinRupee size={25} className="icons" />
                <span className="text">Sale</span>
              </NavItem>
              <NavItem to="/pending-requests" onClick={() => setMenuOpen(false)}>
                <MdOutlinePendingActions size={25} className="icons" />
                <span className="text">Request</span>
              </NavItem>
              <NavItem to="/volunteer" onClick={() => setMenuOpen(false)}>
                <MdOutlinePendingActions size={25} className="icons" />
                <span className="text">Volunteer</span>
              </NavItem>
            </>
          ) : (
            <>
             <NavItem to="/requestform" onClick={() => setMenuOpen(false)}>
                <CiSquarePlus size={25} className="icons" />
                <span className="text">Request</span>
              </NavItem>
              <NavItem to="/history" onClick={() => setMenuOpen(false)}>
                <FaHistory size={25} className="icons" />
                <span className="text">History</span>
              </NavItem>
              <NavItem to="/volunteerform" onClick={() => setMenuOpen(false)}>
                <FaHistory size={25} className="icons" />
                <span className="text">Volunteer</span>
              </NavItem>
            </>
          )
        ) : null}
        <NavItem onClick={handleLogout}>
          <IoIosLogOut size={25} className="icons" />
          <span className="text">Logout</span>
        </NavItem>
      </NavLinks>
    </Nav>
  );
};

export default Head;

const Nav = styled.nav`
  height: 70px;
  background-color: #fffafb;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 10px 15px;
    margin-top: 5px;
  }
`;

const LogoImg = styled.img`
  height: 60px;
  @media screen and (max-width: 768px) {
    height: 50px;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;


const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
  align-items: center;
  gap: 30px;
  font-weight: bold;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    background-color: #fff;
    position: absolute;
    z-index: 10;
    top: 70px;
    left: 0;
    right: 0;
    gap: 10px;
    padding: 20px 0;
    transition: all 0.3s ease;
    transform: ${({ menuopen }) =>
      menuopen ? "translateY(0)" : "translateY(-200%)"}; // Use menuopen instead of menuOpen
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  gap: 5px;
  .icons {
    display: none;
  }
  .text {
    display: inline;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    .icons {
      display: inline;
    }
    .text {
      display: inline;
    }
  }
  @media screen and (max-width: 568px) {
    .icons {
      display: inline;
    }
    .text {
      display: inline;
    }
  }
`;
