import React, { useEffect, useState } from "react";
import { Checkbox, Input, Button, message, Form as AntdForm } from "antd";
import { v4 as uuidv4 } from "uuid";
import Head from "./Head";
import supabase from "./utils"; // Make sure the path is correct

const { Item } = AntdForm;

const wasteTypes = {
  "Waste": [
    "Broken glass",
    "Glass bottles",
    "Footwear",
    "Old clothes",
    "Thermocol",
    "Sponge",
    "E_waste",
    "Iron",
    "Steel",
    "Aluminium",
    "BB",
    "OCC",
    "PET",
    "PPE",
    "HDPE",
    "LDPE",
    "Old toys",
    "Raffia",
    "Compost",
    "Cocopeat",
  ],
};

const Form2 = () => {
  const [form] = AntdForm.useForm();
  const [checkedItems, setCheckedItems] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, []);

  const handleCheckboxChange = (type, e) => {
    setCheckedItems({
      ...checkedItems,
      [type]: e.target.checked,
    });

    if (!e.target.checked) {
      form.setFieldsValue({
        [`${type}Weight`]: undefined,
        [`${type}Price`]: undefined,
      });
    }

    // Update total sale amount
  };
  const handleSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        // Create an empty object to store the formatted data
        const formattedData = {
          uuid: uuidv4(),
          user_id: userId,
          date: values.date,
          time: values.time,
          buyer_name: values.buyerName,
          organisation_name: values.organisationName,
          address: values.address,
          gst: values.gst,
          aadhar_card_number: values.aadharCardNumber,
          pan_card_number: values.panCardNumber,
          email: values.email,
          mobile_number: values.mobileNumber,
        };
  
        // Iterate over the received values
        Object.entries(wasteTypes).forEach(([category, types]) => {
          types.forEach((type) => {
            const weightKey = `${type}Weight`;
            const priceKey = `${type}Price`;
            const key = type.replace(/ /g, "_").toLowerCase();
            if (values[weightKey] && values[priceKey]) {
              formattedData[key] = {
                weight: parseFloat(values[weightKey]),
                price_per_kg: parseFloat(values[priceKey]),
              };
            } else {
              formattedData[key] = null;
            }
          });
        });
  
        // Calculate total sale amount
        let totalSaleAmount = 0;
        Object.entries(values).forEach(([key, value]) => {
          if (key.endsWith("Weight")) {
            const type = key.slice(0, -6);
            const weight = parseFloat(value || 0);
            const pricePerKg = parseFloat(values[`${type}Price`] || 0);
            totalSaleAmount += weight * pricePerKg;
          }
        });
  
        formattedData.total_sale_amount = totalSaleAmount;
  
        // Log or use the formatted data as needed
        console.log("Formatted Data:", formattedData);
  
        try {
          // Insert the formatted data into the Supabase Form2 table
          const { data, error } = await supabase
            .from("Form2")
            .insert([formattedData]);
  
          if (error) {
            throw error;
          }
  
          console.log("Inserted Data:", data);
          form.resetFields();
          setCheckedItems({})
          message.success(
            `Form submitted successfully! Total Sale Amount: ₹${totalSaleAmount.toFixed(
              2
            )}`
          );
        } catch (error) {
          console.error("Error inserting data:", error);
          message.error("Failed to submit form.");
        }
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
        message.error("Please fill in all the required fields.");
      });
  };
  
  // const handleSubmit = async () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       // Create an empty object to store the formatted data
  //       const formattedData = {
  //         uuid: uuidv4(),
  //         date: values.date,
  //         time: values.time,
  //         buyer_name: values.buyerName,
  //         organisation_name: values.organisationName,
  //         address: values.address,
  //         gst: values.gst,
  //         aadhar_card_number: values.aadharCardNumber,
  //         pan_card_number: values.panCardNumber,
  //         email: values.email,
  //         mobile_number: values.mobileNumber,
  //       };

  //       // Iterate over the received values
  //       Object.entries(wasteTypes).forEach(([category, types]) => {
  //         types.forEach((type) => {
  //           const weightKey = `${type}Weight`;
  //           const priceKey = `${type}Price`;
  //           if (values[weightKey] && values[priceKey]) {
  //             formattedData[type.replace(/ /g, "_").toLowerCase()] = {
  //               weight: parseFloat(values[weightKey]),
  //               price_per_kg: parseFloat(values[priceKey]),
  //             };
  //           } else {
  //             formattedData[type.replace(/ /g, "_").toLowerCase()] = null;
  //           }
  //         });
  //       });

  //       // Calculate total sale amount
  //       let totalSaleAmount = 0;
  //       Object.entries(values).forEach(([key, value]) => {
  //         if (key.endsWith("Weight")) {
  //           const type = key.slice(0, -6);
  //           const weight = parseFloat(value || 0);
  //           const pricePerKg = parseFloat(values[`${type}Price`] || 0);
  //           totalSaleAmount += weight * pricePerKg;
  //         }
  //       });

  //       formattedData.total_sale_amount = totalSaleAmount;

  //       // Log or use the formatted data as needed
  //       console.log("Formatted Data:", formattedData);

  //       // Reset the form fields
  //       form.resetFields();
  //       message.success(
  //         `Form submitted successfully! Total Sale Amount: ₹${totalSaleAmount.toFixed(
  //           2
  //         )}`
  //       );
  //     })
  //     .catch((errorInfo) => {
  //       console.log("Validation failed:", errorInfo);
  //       message.error("Please fill in all the required fields.");
  //     });
  // };

  return (
    <>
      <Head />

      <AntdForm form={form} layout="vertical">
        <div
          style={{
            border: "1px solid #d9d9d9",
            padding: "16px",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ marginBottom: "16px" }}>Sale Form</h2>
          <Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <Input type="date" />
          </Item>
          <Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <Input type="time" />
          </Item>
          <Item
            label="Buyer Name"
            name="buyerName"
            rules={[{ required: true, message: "Please enter the buyer name" }]}
          >
            <Input placeholder="Enter Buyer Name" />
          </Item>
          <Item
            label="Organisation Name"
            name="organisationName"
            rules={[
              { required: true, message: "Please enter the organisation name" },
            ]}
          >
            <Input placeholder="Enter Organisation Name" />
          </Item>
          <Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input.TextArea placeholder="Enter Address (separate with comma)" />
          </Item>
          <Item
            label="GST"
            name="gst"
            rules={[
              { required: false, message: "Please enter the GST number" },
            ]}
          >
            <Input placeholder="Enter GST" />
          </Item>
          <Item
            label="Aadhar Card Number"
            name="aadharCardNumber"
            rules={[
              {
                required: false,
                message: "Please enter the Aadhar card number",
              },
            ]}
          >
            <Input placeholder="Enter Aadhar Card Number" />
          </Item>
          <Item
            label="Pan Card Number"
            name="panCardNumber"
            rules={[
              { required: false, message: "Please enter the PAN card number" },
            ]}
          >
            <Input placeholder="Enter PAN Card Number" />
          </Item>
          <Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input placeholder="Enter Email" />
          </Item>
          <Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[
              { required: true, message: "Please enter the mobile number" },
            ]}
          >
            <Input placeholder="Enter Mobile Number" />
          </Item>
          {Object.entries(wasteTypes).map(([category, types]) => (
            <div key={category}>
              <h3>{category}</h3>
              {types.map((type) => (
                <div key={type} style={{ marginBottom: "10px" }}>
                  <Checkbox
                    checked={checkedItems[type]}
                    onChange={(e) => handleCheckboxChange(type, e)}
                  >
                    {type} (in kgs)
                  </Checkbox>
                  {checkedItems[type] && (
                    <>
                      <Item
                        name={`${type}Weight`}
                        label="Weight"
                        rules={[
                          {
                            required: true,
                            message: `Please enter weight for ${type}`,
                          },
                        ]}
                      >
                        <Input
                          type="number"
                          min={1}
                          placeholder={`Enter weight for ${type}`}
                          style={{ marginLeft: "20px", width: "100px" }}
                        />
                      </Item>
                      <Item
                        name={`${type}Price`}
                        label="Price/KG"
                        rules={[
                          {
                            required: true,
                            message: `Please enter price per kg for ${type}`,
                          },
                        ]}
                      >
                        <Input
                          type="number"
                          min={0.01}
                          step={0.01}
                          placeholder={`Enter price per kg for ${type}`}
                          style={{ marginLeft: "20px", width: "100px" }}
                        />
                      </Item>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div></div>
          <Item>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Item>
        </div>
      </AntdForm>
    </>
  );
};

export default Form2;
