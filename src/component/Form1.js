import React, { useEffect, useState } from 'react';
import { Form as AntdForm, Input, Button, Checkbox, Radio, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import Head from './Head';
import supabase from "./utils"; // Make sure the path is correct

const { Item } = AntdForm;

const wasteTypes = {
  'Dry Waste': [
    'Broken glass', 'Glass bottles', 'Footwear', 'Old clothes', 'Thermocol', 'Sponge', 'E-waste', 'Iron', 'Steel', 'Aluminium',
    'Paper waste', 'Paper juice glasses', 'Bakelite', 'PET', 'PPE', 'HDPE', 'LDPE', 'PVC', 'Old toys', 'Raffia', 'Debris',
    'Wood', 'Pipes'
  ],
  'Wet Waste': [
    'Tender coconut', 'Dry coconut fiber', 'Banana handles', 'Temple waste', 'Bagasse', 'Agri waste',
    'Twigs', 'Leaves', 'Fruits', 'Vegetables', 'Cow dung'
  ]
};

const Form1 = () => {
  const [form] = AntdForm.useForm();
  const [checkedItems, setCheckedItems] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, []);

  const handleSubmit = () => {
    form.validateFields().then(async values => {
      const formattedData = {
        uuid: uuidv4(),
        user_id: userId,
        dry_waste: [],
        wet_waste: [],
        ...values
      };
  
      // Populate dry_waste and wet_waste arrays based on checkedItems
      for (const type of Object.keys(checkedItems)) {
        if (checkedItems[type]) {
          const category = Object.entries(wasteTypes).find(([_, types]) => types.includes(type))[0];
          formattedData[category.toLowerCase().replace(' ', '_')].push(type);
        }
      }
  
      try {
        // Insert the formatted data into the Supabase Form1 table
        const { data, error } = await supabase
          .from('Form1')
          .insert([formatToSnakeCase(formattedData)]);
  
        if (error) {
          throw error;
        }
  
        console.log('Inserted Data:', data);
        form.resetFields();
        setCheckedItems({});
        message.success('Form submitted successfully!');
      } catch (error) {
        console.error('Error inserting data:', error);
        message.error('Failed to submit form.');
      }
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
      message.error('Please fill in all the required fields.');
    });
  };

  

  const handleCheckboxChange = (type, e) => {
    setCheckedItems({
      ...checkedItems,
      [type]: e.target.checked
    });
  };

  // Function to format object keys to snake_case
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
        <h2 style={{ marginBottom: '16px' }}>Waste collection Request Form</h2>
        <Item label="Full name (పూర్తి పేరు)" name="fullName" rules={[{ required: true, message: 'Please enter your full name' }]}>
          <Input placeholder="Enter Your Full Name" />
        </Item>
        <Item label="Email (ఇమెయిల్)" name="email" rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
          <Input placeholder="Enter Your Email" />
        </Item>
        <Item label="Type of Organisation (సంస్థ రకం)" name="organisationType" rules={[{ required: true, message: 'Please select the type of organisation' }]}>
          <Radio.Group>
            <Radio value="shop">Shop</Radio>
            <Radio value="office">Office</Radio>
            <Radio value="house">House</Radio>
            <Radio value="hospital">Hospital</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Item>
        <Item label="House/ Flat No (ఇల్లు/ ఫ్లాట్ నెం)" name="houseNo" rules={[{ required: true, message: 'Please enter your house or flat number' }]}>
          <Input placeholder="Enter House/Flat No" />
        </Item>
        <Item label="Street/Area Name (వీధి/ప్రాంతం పేరు)" name="streetName" rules={[{ required: true, message: 'Please enter your street or area name' }]}>
          <Input placeholder="Enter Street/Area Name" />
        </Item>
        <Item label="City/Town Name (నగరం/పట్టణం పేరు)" name="cityName" rules={[{ required: true, message: 'Please enter your city or town name' }]}>
          <Input placeholder="Enter City/Town Name" />
        </Item>
        <Item label="Mandal (మండలం)" name="mandal" rules={[{ required: true, message: 'Please enter your mandal' }]}>
          <Input placeholder="Enter Mandal" />
        </Item>
        <Item label="District (జిల్లా)" name="district" rules={[{ required: true, message: 'Please enter your district' }]}>
          <Input placeholder="Enter District" />
        </Item>
        <Item label="Pin code (పిన్ కోడ్)" name="pinCode" rules={[{ required: true, message: 'Please enter your pin code' }]}>
          <Input placeholder="Enter Pin Code" />
        </Item>
        <Item label="Mobile number (మొబైల్ నంబర్)" name="mobileNumber" rules={[{ required: true, message: 'Please enter your mobile number' }]}>
          <Input placeholder="Enter Mobile Number" />
        </Item>
        <Item label="Pickup timings (చెత్త సేకరించుకోవలసిన సమయం)" name="pickupTimings" rules={[{ required: true, message: 'Please select pickup timings' }]}>
          <Radio.Group>
            <Radio value="09am-12pm">09am - 12pm</Radio>
            <Radio value="12pm-04pm">12pm - 04pm</Radio>
            <Radio value="04pm-08pm">04pm - 08pm</Radio>
          </Radio.Group>
        </Item>
        <Item label="Pickup Date (చెత్త సేకరించుకోవలసిన తేదీ)" name="pickupDate" rules={[{ required: true, message: 'Please select a date' }]}>
          <Input type="date" />
        </Item>        <h3>Select waste type (ఏ రకమైన వ్యర్థం?)</h3>
        {Object.entries(wasteTypes).map(([category, types]) => (
          <div key={category}>
            <h4>{category}</h4>
            {types.map(type => (
              <div key={type} style={{ marginBottom: '10px' }}>
                <Checkbox checked={checkedItems[type]} onChange={(e) => handleCheckboxChange(type, e)}>
                  {type}
                </Checkbox>
              </div>
            ))}
          </div>
        ))}
        <Item>
          <Button type="primary" onClick={handleSubmit}>Submit</Button>
        </Item>
      </div>
    </AntdForm>
    </>
  );
};

export default Form1;
