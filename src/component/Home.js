
import React from "react";
import banner from "../assets/images/banner2.jpg";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import Head from './Head';

const Home = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
    <Head/>
      <Herobanner>
        <div className="matter-div">
          <p className="hero-caption">PUNARV Charitable Trust</p>
          <h1 className="hero-heading">
            Clean, Green <br /> and Serene
          </h1>
          <p className="hero-para">
            Join us in making the city cleaner and greener by contributing to our waste collection and management program.
          </p>
          <Link to="/requestform">
            <button className="hero-btn">Raise A Request</button>
          </Link>
          <p className="hero-optimise">Sustainability</p>
        </div>
        <img src={banner} alt="banner" className="hero-banner-img" />
      </Herobanner>
      <Content>
        <Section>
          <h2>About Us</h2>
          <p>
            PUNARV Charitable Trust believes that all human needs are to be fulfilled with care and concern in line with nature.
          </p>
        </Section>
        <Section>
          <h2>Aims and Objectives</h2>
          <ul>
            <li>Establish Ecologically Resilient Economic Zones and Social Enterprises for sustainable economy.</li>
            <li>Promote clean and green villages, towns, and cities.</li>
            <li>Encourage Natural Farming.</li>
            <li>Provide Value-based Holistic Education.</li>
            <li>Ensure availability of modern health services alongside traditional medical practices.</li>
            <li>Make healthy, natural food and Neutraceutical products affordable.</li>
            <li>Promote good lifestyle for an ecologically resilient and spiritual society.</li>
            <li>Ensure ethical local governance and leadership.</li>
            <li>Guide future generations towards a natural, healthy, and spiritual life.</li>
            <li>Encourage rural industries and economic zones.</li>
            <li>Promote cost-effective and eco-friendly housing.</li>
            <li>Support economically disadvantaged, unorganized, and underprivileged sections.</li>
            <li>Collaborate with organizations having similar objectives.</li>
          </ul>
        </Section>
        <Section>
          <h2>Contact Us</h2>
          <p>Founders: Saravanan Rajagopalan / Padmaja V</p>
          <p>Jattu Ashramam, Rayagada Road, Parvathipuram, Vizianagaram (Dt), Andhra Pradesh-535502</p>
          <p>Phone: +91-86672 37345, +91-94408 99365</p>
        </Section>
      </Content>
    </>
  );
};

export default Home;

// const Herobanner = styled.div`
//   position: relative;
//   padding: 20px;
//   text-align: left; /* Aligning the top section to the left */

//   .matter-div {
//     margin-bottom: 20px;
//     margin-left: 20px; /* Adding left margin */
//   }

//   .hero-caption {
//     color: #228b22;
//     font-weight: 600;
//     font-size: 40px;
//   }

//   .hero-heading {
//     font-weight: 700;
//     margin-bottom: 23px;
//     margin-top: 30px;
//     font-size: 70px;
//   }

//   .hero-para {
//     font-size: 22px;
//     font-family: Alegreya;
//     line-height: 35px;
//     width: 500px;
//   }

//   .hero-btn {
//     margin-top: 45px;
//     text-decoration: none;
//     width: 300px;
//     text-align: center;
//     background: #228b22;
//     padding: 14px;
//     font-size: 22px;
//     text-transform: none;
//     color: white;
//     border-radius: 4px;
//     border: 0px;
//   }

//   .hero-optimise {
//     font-weight: 600;
//     color: #228b22;
//     font-size: 100px;
//     opacity: 0.1;
//     margin-right: 20px;
//   }

//   .hero-banner-img {
//     margin-top: 20px;
//     width: 100%;
//     max-width: 600px;
//   }

//   @media screen and (max-width: 1350px) {
//     .hero-banner-img {
//       width: 100%;
//       max-width: 500px;
//     }

//     .hero-optimise {
//       font-size: 150px;
//     }
//   }

//   @media screen and (max-width: 568px) {
//     .matter-div {
//       width: 80%;
//       margin: 0 auto;
//     }

//     .hero-caption {
//       font-size: 20px;
//     }

//     .hero-heading {
//       font-weight: 700;
//       margin-bottom: 23px;
//       margin-top: 30px;
//       font-size: 50px;
//     }

//     .hero-para {
//       font-size: 18px;
//       line-height: 28px;
//       width:350px;
//     }

//     .hero-btn {
//       width: 250px;
//     }

//     .hero-optimise {
//       display: none;
//     }
//   }
// `;

// const Content = styled.div`
//   padding: 20px;
//   max-width: 1200px;
//   margin: 0 auto;
//   text-align: left;

//   h2 {
//     color: #228b22;
//     font-size: 36px;
//     margin-bottom: 10px;
//   }

//   p, ul {
//     font-size: 18px;
//     line-height: 28px;
//     margin-bottom: 20px;
//   }

//   ul {
//     padding-left: 20px;
//   }

//   li {
//     margin-bottom: 10px;
//   }
// `;

// const Section = styled.section`
//   margin-bottom: 40px;
// `;
const Herobanner = styled.div`
  position: relative;
  padding: 20px;
  text-align: left;

  .matter-div {
    margin-bottom: 20px;
    margin-left: 20px;
  }

  .hero-caption {
    color: #228b22;
    font-weight: 600;
    font-size: 40px;
  }

  .hero-heading {
    font-weight: 700;
    margin-bottom: 23px;
    margin-top: 30px;
    font-size: 70px;
  }

  .hero-para {
    font-size: 22px;
    font-family: Alegreya;
    line-height: 35px;
    width: 500px;
  }

  .hero-btn {
    margin-top: 45px;
    text-decoration: none;
    width: 300px;
    text-align: center;
    background: #228b22;
    padding: 14px;
    font-size: 22px;
    text-transform: none;
    color: white;
    border-radius: 4px;
    border: 0px;
  }

  .hero-optimise {
    font-weight: 600;
    color: #228b22;
    font-size: 100px;
    opacity: 0.1;
    margin-right: 20px;
  }

  .hero-banner-img {
    margin-top: 20px;
    width: 100%;
    max-width: 600px;
    display: block; /* Ensure the image is displayed */
  }

  @media screen and (max-width: 1350px) {
    .hero-banner-img {
      max-width: 500px;
    }

    .hero-optimise {
      font-size: 150px;
    }
  }

  @media screen and (max-width: 1082px) {
    .hero-banner-img {
      display: none; /* Hide the image */
    }
  }

  @media screen and (max-width: 768px) {
    .matter-div {
      margin-left: 0;
      text-align: center;
    }

    .hero-caption {
      font-size: 30px;
    }

    .hero-heading {
      font-size: 50px;
    }

    .hero-para {
      width: 100%;
      padding: 0 20px;
    }

    .hero-btn {
      width: 250px;
    }

    .hero-optimise {
      display: none;
    }
  }

  @media screen and (max-width: 568px) {
    .hero-heading {
      font-size: 40px;
    }

    .hero-para {
      font-size: 18px;
      line-height: 28px;
    }

    .hero-btn {
      width: 200px;
    }

    .hero-banner-img {
      max-width: 350px;
    }
  }
`;


const Content = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;

  h2 {
    color: #228b22;
    font-size: 36px;
    margin-bottom: 10px;
  }

  p, ul {
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 20px;
  }

  ul {
    padding-left: 20px;
  }

  li {
    margin-bottom: 10px;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
`;
