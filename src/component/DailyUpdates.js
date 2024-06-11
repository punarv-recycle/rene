import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import supabase from "./utils"; // Make sure the path is correct
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import Head from "./Head";

const DailyUpdates = () => {
  const [dailyUpdates, setDailyUpdates] = useState([]);

  useEffect(() => {
    fetchDailyUpdates();
  }, []);

  const fetchDailyUpdates = async () => {
    try {
      // Fetch data from the "Form" table
      const { data, error } = await supabase.from("Form").select("*");

      if (error) {
        throw error;
      }

      // Set the fetched data to state
      setDailyUpdates(data);
    } catch (error) {
      console.error("Error fetching daily updates:", error.message);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Broken Glass (kgs)",
      dataIndex: "broken_glass",
      key: "broken_glass",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Glass Bottles (kgs)",
      dataIndex: "glass_bottles",
      key: "glass_bottles",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Footwear (kgs)",
      dataIndex: "footwear",
      key: "footwear",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Old Clothes (kgs)",
      dataIndex: "old_clothes",
      key: "old_clothes",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Thermocol (kgs)",
      dataIndex: "thermocol",
      key: "thermocol",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Sponge (kgs)",
      dataIndex: "sponge",
      key: "sponge",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "E-Waste (kgs)",
      dataIndex: "e_waste",
      key: "e_waste",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Iron (kgs)",
      dataIndex: "iron",
      key: "iron",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Steel (kgs)",
      dataIndex: "steel",
      key: "steel",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Aluminium (kgs)",
      dataIndex: "aluminium",
      key: "aluminium",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "BB (kgs)",
      dataIndex: "bb",
      key: "bb",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "OCC (kgs)",
      dataIndex: "occ",
      key: "occ",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Old Books (kgs)",
      dataIndex: "old_books",
      key: "old_books",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Bakelite (kgs)",
      dataIndex: "bakelite",
      key: "bakelite",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "PET (kgs)",
      dataIndex: "pet",
      key: "pet",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "PPE (kgs)",
      dataIndex: "ppe",
      key: "ppe",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "HDPE (kgs)",
      dataIndex: "hdpe",
      key: "hdpe",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "LDPE (kgs)",
      dataIndex: "ldpe",
      key: "ldpe",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "PVC (kgs)",
      dataIndex: "pvc",
      key: "pvc",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Old Toys (kgs)",
      dataIndex: "old_toys",
      key: "old_toys",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Raffia (kgs)",
      dataIndex: "raffia",
      key: "raffia",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Debris (kgs)",
      dataIndex: "debris",
      key: "debris",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Wood (kgs)",
      dataIndex: "wood",
      key: "wood",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Pipes (kgs)",
      dataIndex: "pipes",
      key: "pipes",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Tender Coconut (kgs)",
      dataIndex: "tender_coconut",
      key: "tender_coconut",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Dry Coconut Fiber (kgs)",
      dataIndex: "dry_coconut_fiber",
      key: "dry_coconut_fiber",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Banana Handles (kgs)",
      dataIndex: "banana_handles",
      key: "banana_handles",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Temple Waste (kgs)",
      dataIndex: "temple_waste",
      key: "temple_waste",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Bagasse (kgs)",
      dataIndex: "bagasse",
      key: "bagasse",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Agri Waste (kgs)",
      dataIndex: "agri_waste",
      key: "agri_waste",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Twigs (kgs)",
      dataIndex: "twigs",
      key: "twigs",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Leaves (kgs)",
      dataIndex: "leaves",
      key: "leaves",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Fruits (kgs)",
      dataIndex: "fruits",
      key: "fruits",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Vegetables (kgs)",
      dataIndex: "vegetables",
      key: "vegetables",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Cow Dung (kgs)",
      dataIndex: "cow_dung",
      key: "cow_dung",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Food (kgs)",
      dataIndex: "food",
      key: "food",
      render: (text) => (text ? text : "-"),
    },
  ];

  return (
    <>
      <Head />
      <div
        style={{
          border: "1px solid #d9d9d9",
          padding: "16px",
          borderRadius: "4px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "Flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ marginBottom: "16px", marginTop: "0" }}>
            Daily Updates
          </h2>
          <Link
            to="/dailyUpdatesform"
            style={{ color: "black", textDecoration: "none" }}
          >
            <Button style={{ display: "flex", alignItems: "center" }}>
              <RiAddLine style={{ marginRight: "8px" }} />
              New Update
            </Button>
          </Link>
        </div>
        <Table
          dataSource={dailyUpdates}
          columns={columns}
          scroll={{ x: true }} // Enable horizontal scrolling on small screens
          pagination={{
            pageSize: 20, // Set the number of items per page // Options for page size selection
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`, // Display total number of items
          }}
        />
      </div>
    </>
  );
};

export default DailyUpdates;
