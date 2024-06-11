// import React, { useEffect, useState } from "react";
// import { styled } from "styled-components";
// import Logo from "../assets/images/Logo-black-small.png";
// import { Link, useNavigate } from "react-router-dom";
// import { IoIosFitness, IoIosHome, IoIosLogOut } from "react-icons/io";
// import { createClient } from "@supabase/supabase-js";
// import { BiLogoDailymotion } from "react-icons/bi";
// import { CiSquarePlus } from "react-icons/ci";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabasePublicKey = process.env.REACT_APP_SUPABASE_PUBLIC_KEY;
// const supabase = createClient(supabaseUrl, supabasePublicKey);

// const Head = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase.auth.getSession();
//       if (error) {
//         console.error("Error fetching session:", error);
//       } else {
//         setUser(data.session?.user ?? null);
//       }
//     };

//     fetchUser();
//   }, []);

//   const logout = async () => {
//     localStorage.removeItem("token")
//     await supabase.auth.signOut();
//     navigate("/login");
//   };

//   return (
//     <Nav>
//       <Link to="/">
//         <LogoImg src={Logo} alt="Workout Trainer" />
//       </Link>
//       <NavLinks>
//                   <NavItem to="/home">
//               <IoIosHome size={25} className="icons" />
//               <span className="text">Home</span>
//             </NavItem>
//             <NavItem to="/request">
//               <CiSquarePlus size={25} className="icons" />
//               <span className="text">Request</span>
//             </NavItem>
//             {user && user.email === "punarv.recycle@gmail.com" ? (
//           <>
//           <NavItem to="/dailyUpdates">
//           <BiLogoDailymotion size={25} className="icons" />
//           <span className="text">Daily update</span>
//         </NavItem>
//         <NavItem to="/sale">
//           <IoIosFitness size={25} className="icons" />
//           <span className="text">Sale </span>
//         </NavItem>
//           </>
//         ) : (
//           null
//         )}
//             <NavItem onClick={logout}>
//               <IoIosLogOut size={25} className="icons" />
//               <span className="text">Logout</span>
//             </NavItem>
        
//       </NavLinks>
//     </Nav>
//   );
// };

// export default Head;

// const Nav = styled.nav`
//   height: 70px;
//   background-color: #fffafb;
//   padding: 10px 30px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 20px;
//   @media screen and (max-width: 768px) {
//     padding: 10px 15px;
//     margin-top: 5px;
//   }
// `;

// const LogoImg = styled.img`
//   height: 40px;
//   @media screen and (max-width: 768px) {
//     height: 35px;
//   }
// `;

// const NavLinks = styled.ul`
//   display: flex;
//   list-style-type: none;
//   align-items: center;
//   gap: 30px;
//   font-weight: bold;
//   font-size: 20px;
//   @media screen and (max-width: 768px) {
//     gap: 20px;
//   }
//   @media screen and (max-width: 568px) {
//     gap: 10px;
//   }
// `;

// const NavItem = styled(Link)`
//   text-decoration: none;
//   color: black;
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   .icons {
//     display: none;
//   }
//   .text {
//     display: inline;
//   }
//   @media screen and (max-width: 568px) {
//     .text {
//       display: none;
//       font-size: 14px;
//     }
//     .icons {
//       display:  inline;
//     }
//   }
// `;

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Logo from "../assets/images/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import {  IoIosHome, IoIosLogOut } from "react-icons/io";
import supabase from "./utils"; // Make sure the path is correct
import { BiLogoDailymotion } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { TbCoinRupee } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaHistory } from "react-icons/fa";


const Head = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setUser(data.session?.user ?? null);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    localStorage.removeItem("token");
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <Nav>
      <Link to="/">
        <LogoImg src={Logo} alt="Workout Trainer" />
      </Link>
      <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </Hamburger>
      <NavLinks menuOpen={menuOpen}>
        <NavItem to="/home" onClick={() => setMenuOpen(false)}>
          <IoIosHome size={25} className="icons" />
          <span className="text">Home</span>
        </NavItem>
        {user && user.email !== "punarv.recycle@gmail.com" ? (
        <NavItem to="/request" onClick={() => setMenuOpen(false)}>
          <CiSquarePlus size={25} className="icons" />
          <span className="text">Request</span>
        </NavItem>):null}
        {user && user.email === "punarv.recycle@gmail.com" ? (
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
              <span className="text">Pending requests</span>
            </NavItem>
          </>
        ) : <NavItem to="/history" onClick={() => setMenuOpen(false)}>
        <FaHistory size={25} className="icons" />
        <span className="text">History</span>
      </NavItem>
      }
        <NavItem onClick={logout}>
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
  height: 50px;
  @media screen and (max-width: 768px) {
    height: 35px;
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
    z-index:10;
    top: 70px;
    left: 0;
    right: 0;
    gap: 10px;
    padding: 20px 0;
    transition: all 0.3s ease;
    transform: ${({ menuOpen }) => (menuOpen ? "translateY(0)" : "translateY(-200%)")};
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
