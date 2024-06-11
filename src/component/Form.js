import React, { useEffect, useState } from "react";
import {
  Collapse,
  Checkbox,
  Input,
  Button,
  message,
  Form as AntdForm,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import Head from "./Head";
import supabase from "./utils"; // Make sure the path is correct
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;
const { Item } = AntdForm;


const wasteTypes = {
  "Dry Waste": [
    "broken_glass",
    "glass_bottles",
    "footwear",
    "old_clothes",
    "thermocol",
    "sponge",
    "e_waste",
    "iron",
    "steel",
    "aluminium",
    "bb",
    "occ",
    "old_books",
    "bakelite",
    "pet",
    "ppe",
    "hdpe",
    "ldpe",
    "pvc",
    "old_toys",
    "raffia",
    "debris",
    "wood",
    "pipes",
  ],
  "Wet Waste": [
    "tender_coconut",
    "dry_coconut_fiber",
    "banana_handles",
    "temple_waste",
    "bagasse",
    "agri_waste",
    "twigs",
    "leaves",
    "fruits",
    "vegetables",
    "cow_dung",
    "food",
  ],
};

const Form = () => {
  const [form] = AntdForm.useForm();
  const [checkedItems, setCheckedItems] = useState({});
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, []);

  const handleCheckboxChange = (type, e) => {
    setCheckedItems({
      ...checkedItems,
      [type]: e.target.checked,
    });

    if (!e.target.checked) {
      form.setFieldsValue({ [type + "Weight"]: undefined });
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        let missingWeights = [];
        Object.entries(checkedItems).forEach(([type, isChecked]) => {
          if (isChecked && !values[`${type}Weight`]) {
            missingWeights.push(type);
          }
        });

        if (missingWeights.length > 0) {
          message.warning(
            `Please provide weights for: ${missingWeights.join(", ")}`
          );
          return;
        }

        // Wait for userId to be set
        if (userId) {
          // Create an empty object to store the formatted data
          const formattedData = {
            uuid: uuidv4(),
            date: values.date,
            time: values.time,
            name: values.name,
            user_id: userId,
          };

          // Iterate over the received values
          Object.entries(wasteTypes).forEach(([category, types]) => {
            types.forEach((type) => {
              const weightKey = `${type}Weight`;
              formattedData[type] = values[weightKey] || null;
            });
          });

          try {
            // Send the formatted data to Supabase
            const { error } = await supabase
              .from("Form")
              .insert([formattedData]);

            if (error) {
              throw error;
            }

            // Log or use the returned data as needed

            // Reset the form fields
            form.resetFields();
            setCheckedItems({});
            message.success("Form submitted successfully!");
            setTimeout(() => {
              navigate("/dailyUpdates", { replace: true });
            }, 1000);
          } catch (error) {
            console.error("Error inserting data:", error);
          }
        } else {
          console.error("User ID is null");
          message.error("Failed to submit form.");
        }
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
        message.error("Please fill in all the required fields.");
      });
  };

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
          <h2 style={{ marginBottom: "16px" }}>Daily updates</h2>
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
            label="Your full name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter Your Full Name" />
          </Item>
          <Collapse accordion expandIconPosition="end">
            {Object.entries(wasteTypes).map(([category, types]) => (
              <Panel header={category} key={category}>
                {types.map((type) => (
                  <div key={type} style={{ marginBottom: "10px" }}>
                    <Checkbox
                      checked={checkedItems[type]}
                      onChange={(e) => handleCheckboxChange(type, e)}
                    >
                      {type.replace("_", " ")} (in kgs)
                    </Checkbox>
                    {checkedItems[type] && (
                      <Item name={`${type}Weight`} noStyle>
                        <Input
                          type="number"
                          min={1}
                          placeholder={`Enter weight for ${type.replace(
                            "_",
                            " "
                          )}`}
                          style={{ marginLeft: "20px", width: "100px" }}
                        />
                      </Item>
                    )}
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>
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

export default Form;
