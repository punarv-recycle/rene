// import React, { useState } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [message, setMessage] = useState({});
//   const [errorwarning, setErrorwarning] = useState("");
//   const [showLoader, setShowLoader] = useState("");
//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmpassword: "",
//   });
//   const navigate = useNavigate();

//   const changehandler = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//     setErrorwarning("");
//   };

//   const submithandler = async (e) => {
//     e.preventDefault();
//     setShowLoader("loading");
//     await axios
//       .post("http://localhost:5440/register", data)
//       .then((response) => {
//         alert(response.data.msg);
//         setMessage(response.data);
//       })
//       .catch((err) => setErrorwarning(err.response.data.msg));
//     setShowLoader("");
//   };

//   if (message.status === "ok") {
//     return navigate("/login", { replace: true });
//   }
//   const clickonHandler = () => {
//     if (localStorage.getItem("token")) {
//       navigate("/home", { replace: true });
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <Container>
//       <div className={showLoader}></div>
//       <form onSubmit={submithandler} className="form-container">
//         <h1>Sign Up</h1>
//         <p>Create Your Account</p>
//         <input
//           type="text"
//           name="username"
//           onChange={changehandler}
//           placeholder="Name"
//           className="input-box"
//         />
//         <br />
//         <input
//           type="email"
//           name="email"
//           onChange={changehandler}
//           placeholder="Email Address"
//           className="input-box"
//         />
//         <br />
//         <input
//           type="text"
//           name="mobile"
//           onChange={changehandler}
//           placeholder="Mobile Number"
//           className="input-box"
//         />
//         <br />
//         <input
//           type="password"
//           name="password"
//           onChange={changehandler}
//           placeholder="Password"
//           className="input-box"
//         />
//         <br />
//         <input
//           type="password"
//           name="confirmpassword"
//           onChange={changehandler}
//           placeholder="Confirm Password"
//           className="input-box"
//         />
//         <br />
//         <p className="warning">{errorwarning ? errorwarning : null}</p>
//         <button type="submit">Register</button>
//         <p>
//           Already have an account?
//           <span onClick={clickonHandler}> Sign In</span>
//         </p>
//       </form>
//     </Container>
//   );
// };

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   width: 100vw;
//   background-color: #fffafb;
//   text-align: center;
//   button {
//     border-radius: 5rem;
//     border: none;
//     background-color: black;
//     color: #fff;
//     font-size: 15px;
//     cursor: pointer;
//     height: 40px;
//     width: 150px;
//     margin: 10px 20px 20px 0px;
//     text-align: center;
//   }
//   .form-container {
//     padding: 30px;
//     border-radius: 10px;
//     box-shadow: 1px 2px 3px 3px rgba(20, 20, 20, 0.3);
//     width: 350px;
//   }
//   h1 {
//     font-size: 50px;
//     margin-bottom: 15px;
//   }
//   span {
//     color: #0a4857;
//     font-weight: bold;
//     cursor: pointer;
//   }
//   label {
//     font-size: 10px;
//   }
//   p {
//     margin-bottom: 10px;
//   }
//   .msg-red {
//     color: red;
//     margin: 5px;
//   }
//   .msg-green {
//     color: green;
//     margin: 5px;
//   }
//   .warning {
//     color: red;
//   }
//   .input-box {
//     height: 40px;
//     margin: 5px;
//     width: 280px;
//     border-radius: 5px;
//     padding-left: 10px;
//     border: 1px solid gray;
//     background-color: #fffafb;
//   }
//   .loading {
//     border-top: 3px black solid;
//     width: 100%;
//     height: 3px;
//     position: absolute;
//     top: 0;
//     background: #04acec;
//     animation: loading 3s linear infinite;
//   }
//   @keyframes loading {
//     from {
//       left: 0%;
//       width: 0;
//       z-index: 100;
//     }
//     to {
//       left: 0;
//       width: 100%;
//     }
//   }
// `;

// export default Register;
// import React, { useState } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabasePublicKey = process.env.REACT_APP_SUPABASE_PUBLIC_KEY;
// const supabase = createClient(supabaseUrl, supabasePublicKey);

// const Register = () => {
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmpassword: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { user, error } = await supabase.auth.signUp({
//         email: data.email,
//         password: data.password,
//       });
//       if (error) {
//         throw error;
//       }
//       // Registration successful, redirect to login page
//       navigate("/login");
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   return (
//     <Container>
//       <form onSubmit={handleSubmit} className="form-container">
//         <h1>Sign Up</h1>
//         <p>Create Your Account</p>
//         <input
//           type="text"
//           name="username"
//           value={data.username}
//           onChange={handleChange}
//           placeholder="Name"
//           className="input-box"
//         />
//         <br />
//         <input
//           type="email"
//           name="email"
//           value={data.email}
//           onChange={handleChange}
//           placeholder="Email Address"
//           className="input-box"
//         />
//         <br />
//         <input
//           type="text"
//           name="mobile"
//           value={data.mobile}
//           onChange={handleChange}
//           placeholder="Mobile Number"
//           className="input-box"
//         />
//         <br />
//         <input
//           type="password"
//           name="password"
//           value={data.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="input-box"
//         />
//         <br />
//         <input
//           type="password"
//           name="confirmpassword"
//           value={data.confirmpassword}
//           onChange={handleChange}
//           placeholder="Confirm Password"
//           className="input-box"
//         />
//         <br />
//         {error && <p className="error">{error}</p>}
//         <button type="submit" disabled={loading}>
//           {loading ? "Loading..." : "Register"}
//         </button>
//         <p>
//           Already have an account?{" "}
//           <span onClick={handleLoginClick}>Sign In</span>
//         </p>
//       </form>
//     </Container>
//   );
// };

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   width: 100vw;
//   background-color: #fffafb;
//   text-align: center;
//   button {
//     border-radius: 5rem;
//     border: none;
//     background-color: black;
//     color: #fff;
//     font-size: 15px;
//     cursor: pointer;
//     height: 40px;
//     width: 150px;
//     margin: 10px 20px 20px 0px;
//     text-align: center;
//   }
//   .form-container {
//     padding: 30px;
//     border-radius: 10px;
//     box-shadow: 1px 2px 3px 3px rgba(20, 20, 20, 0.3);
//     width: 350px;
//   }
//   h1 {
//     font-size: 50px;
//     margin-bottom: 15px;
//   }
//   span {
//     color: #0a4857;
//     font-weight: bold;
//     cursor: pointer;
//   }
//   label {
//     font-size: 10px;
//   }
//   p {
//     margin-bottom: 10px;
//   }
//   .msg-red {
//     color: red;
//     margin: 5px;
//   }
//   .msg-green {
//     color: green;
//     margin: 5px;
//   }
//   .warning {
//     color: red;
//   }
//   .input-box {
//     height: 40px;
//     margin: 5px;
//     width: 280px;
//     border-radius: 5px;
//     padding-left: 10px;
//     border: 1px solid gray;
//     background-color: #fffafb;
//   }
//   .loading {
//     border-top: 3px black solid;
//     width: 100%;
//     height: 3px;
//     position: absolute;
//     top: 0;
//     background: #04acec;
//     animation: loading 3s linear infinite;
//   }
//   @keyframes loading {
//     from {
//       left: 0%;
//       width: 0;
//       z-index: 100;
//     }
//     to {
//       left: 0;
//       width: 100%;
//     }
//   }
// `;

// export default Register;
import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import supabase from "./utils"; // Make sure the path is correct


const { Title, Paragraph } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const { email,  password } = values;
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      console.log('reguser',user)
      message.success("Registration successful. Please log in.");
      navigate("/login");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="form-container"
      >
        <Title level={2}>Sign Up</Title>
        <Paragraph>Create Your Account</Paragraph>
        <Form.Item
          label="Name"
          name="username"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>
        <Form.Item
          label="Mobile Number"
          name="mobile"
          rules={[{ required: true, message: "Please input your mobile number!" }]}
        >
          <Input placeholder="Mobile Number" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
        <Paragraph>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign In</span>
        </Paragraph>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #fffafb;
  text-align: center;
  button {
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    height: 40px;
    width: 150px;
    margin: 10px 20px 20px 0px;
    text-align: center;
  }
  .form-container {
    padding: 30px;
    border-radius: 10px;
    box-shadow: 1px 2px 3px 3px rgba(20, 20, 20, 0.3);
    width: 350px;
  }
  h1 {
    font-size: 50px;
    margin-bottom: 15px;
  }
  span {
    color: #0a4857;
    font-weight: bold;
    cursor: pointer;
  }
  label {
    font-size: 10px;
  }
  p {
    margin-bottom: 10px;
  }
  .msg-red {
    color: red;
    margin: 5px;
  }
  .msg-green {
    color: green;
    margin: 5px;
  }
  .warning {
    color: red;
  }
  .input-box {
    height: 40px;
    margin: 5px;
    width: 280px;
    border-radius: 5px;
    padding-left: 10px;
    border: 1px solid gray;
    background-color: #fffafb;
  }
  .loading {
    border-top: 3px black solid;
    width: 100%;
    height: 3px;
    position: absolute;
    top: 0;
    background: #04acec;
    animation: loading 3s linear infinite;
  }
  @keyframes loading {
    from {
      left: 0%;
      width: 0;
      z-index: 100;
    }
    to {
      left: 0;
      width: 100%;
    }
  }
`;

export default Register;
