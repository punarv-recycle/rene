import React, { useEffect, useState } from "react";
import { Table, message, Grid } from "antd";
import supabase from "./utils"; // Make sure the path is correct
import Head from "./Head";

const { useBreakpoint } = Grid;

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const screens = useBreakpoint();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Form1")
        .select("*")
        .eq("user_id", userId)

      if (error) {
        throw error;
      }

      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
      message.error("Failed to fetch history.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "UUID", dataIndex: "uuid", key: "uuid", ellipsis: true },
    {
      title: "Pickup Timings",
      dataIndex: "pickup_timings",
      key: "pickup_timings",
      ellipsis: true,
    },
    {
      title: "Pickup Date",
      dataIndex: "pickup_date",
      key: "pickup_date",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span>{text}</span>,
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
        <h2 style={{ marginBottom: "16px" }}>Request History</h2>
        <Table
          columns={columns}
          dataSource={history}
          rowKey="id"
          loading={loading}
          scroll={{ x: screens.xs ? 800 : undefined }} // Enable horizontal scroll on small screens
        />
      </div>
    </>
  );
};

export default History;
