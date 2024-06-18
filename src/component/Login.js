import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Alert, Spin } from "antd";
import styled from "styled-components";
import supabase from "./utils"; // Make sure the path is correct

const { Title, Paragraph } = Typography;

const Login = () => {
  // const [showLoader, setShowLoader] = useState(false);
  const [spinning, setSpinning] = React.useState(false);
  const [percent, setPercent] = React.useState(0);

  const [errorMsg, setErrorMsg] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const submithandler = async (values) => {

    const fetchUserRole = async (userId) => {
      const { data: profileData, error: profileError } = await supabase
        .from("Profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Error fetching user role:", profileError);
      } else {
        // console.log(profileData.role);
        return profileData.role
      }
    };

    const { email, password } = values; // Destructure email and password from form values
    // setShowLoader(true);
    
    try {
      const { data:user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        throw error;
      }
      showLoader()
      // console.log(user)
      const role = await fetchUserRole(user?.user?.id)
      localStorage.setItem("token", user?.session?.access_token);
      localStorage.setItem("user_id", user?.user?.id);
      localStorage.setItem("role", role);
      navigate("/home", { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      // setShowLoader(false);
    }
  };

  const showLoader = () => {
    setSpinning(true);
    let ptg = -10;

    const interval = setInterval(() => {
      ptg += 5;
      setPercent(ptg);

      if (ptg > 120) {
        clearInterval(interval);
        setSpinning(false);
        setPercent(0);
      }
    }, 100);
  };

  return (
    <Container>
      {/* {showLoader && <Spin tip="Loading..." size="large" />} */}
      <Spin spinning={spinning} percent={percent} fullscreen />
      <Form
        form={form}
        onFinish={submithandler}
        className="form-container"
        layout="vertical"
      >
        <Title level={1} style={{color:"#228b22"}}>Sign In</Title>
        <Paragraph>Sign into Your Account</Paragraph>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        {errorMsg && <Alert message={errorMsg} type="error" />}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Login
          </Button>
        </Form.Item>
        <Paragraph>
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            <span className="sign-up-link">Sign Up</span>
          </Link>
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

  .form-container {
    padding: 30px;
    border-radius: 10px;
    box-shadow: 1px 2px 3px 3px rgba(20, 20, 20, 0.3);
    width: 350px;
    text-align: center;
  }

  .submit-button {
    border-radius: 5rem;
    background-color: #228b22;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    height: 40px;
    width: 100%;
  }

  .sign-up-link {
    color: #0a4857;
    font-weight: bold;
  }
};`

export default Login;
