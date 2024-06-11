import React, { useEffect, useState } from 'react';
import { Form as AntdForm, Input, Button, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import Head from './Head';
import supabase from "./utils"; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';

const { Item } = AntdForm;

const VolunteerForm = () => {
  const [form] = AntdForm.useForm();
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, []);

  const handleSubmit = () => {
    form.validateFields().then(async values => {
      const formattedData = {
        uuid: uuidv4(),
        user_id: userId,
        ...values
      };

      try {
        const { data, error } = await supabase
          .from('Volunteer')
          .insert([formatToSnakeCase(formattedData)]);

        if (error) {
          throw error;
        }

        console.log('Inserted Data:', data);
        form.resetFields();
        message.success('Form submitted successfully!');
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 1000);
      } catch (error) {
        console.error('Error inserting data:', error);
        message.error('Failed to submit form.');
      }
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
      message.error('Please fill in all the required fields.');
    });
  };

  const formatToSnakeCase = (obj) => {
    const snakeCaseObj = {};
    for (const key in obj) {
      snakeCaseObj[key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)] = obj[key];
    }
    return snakeCaseObj;
  };

  return (
    <>
      <Head/>

      <AntdForm form={form} layout="vertical">
        <div style={{ border: '1px solid #d9d9d9', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
          <h2 style={{ marginBottom: '16px' }}>Become a Volunteer</h2>
          <Item label="Full name" name="fullName" rules={[{ required: true, message: 'Please enter your full name' }]}>
            <Input placeholder="Enter Your Full Name" />
          </Item>
          <Item label="Email" name="email" rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
            <Input placeholder="Enter Your Email" />
          </Item>
          <Item label="Phone number" name="phoneNumber" rules={[
            { 
              required: true,
              pattern: /^[6-9]\d{9}$/,
              message: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9",
            },
          ]}>
            <Input placeholder="Enter Phone Number" />
          </Item>
          <Item label="Address" name="address" rules={[{ required: true, message: 'Please enter your address' }]}>
            <Input placeholder="Enter Your Address" />
          </Item>
          <Item label="City" name="city" rules={[{ required: true, message: 'Please enter your city' }]}>
            <Input placeholder="Enter City" />
          </Item>
          <Item label="State" name="state" rules={[{ required: true, message: 'Please enter your state' }]}>
            <Input placeholder="Enter State" />
          </Item>
          <Item label="Pin Code" name="pinCode" rules={[{ required: true, message: 'Please enter your pin code' }]}>
            <Input placeholder="Enter Pin Code" />
          </Item>
          <Item>
            <Button type="primary" onClick={handleSubmit}>Submit</Button>
          </Item>
        </div>
      </AntdForm>
    </>
  );
};

export default VolunteerForm;
