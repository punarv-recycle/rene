import React, { useEffect, useState } from "react";
import { Table, Button, message, Grid, Tabs, DatePicker } from "antd";
import supabase from "./utils"; // Make sure the path is correct
import Head from "./Head";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterRange, setFilterRange] = useState([]);
  const screens = useBreakpoint();

  useEffect(() => {
    fetchRequests("PENDING");
  }, []);

  const fetchRequests = async (status = null, startDate = null, endDate = null) => {
    setLoading(true);
    try {
      let query = supabase.from("Form1").select("*");

      if (status) {
        query = query.eq("status", status);
      }

      if (startDate && endDate) {
        query = query.gte("pickup_date", startDate).lte("pickup_date", endDate);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setRequests(data);
    } catch (error) {
      console.error(`Error fetching ${status ? status.toLowerCase() : "all"} requests:`, error);
      message.error(`Failed to fetch ${status ? status.toLowerCase() : "all"} requests.`);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id, status) => {
    try {
      const { error } = await supabase.from("Form1").update({ status }).eq("id", id);

      if (error) {
        throw error;
      }

      message.success("Status updated successfully!");
      fetchRequests("PENDING"); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status.");
    }
  };

  const handleTabChange = (key) => {
    switch (key) {
      case "1":
        fetchRequests("PENDING");
        break;
      case "2":
        fetchRequests("APPROVED");
        break;
      case "3":
        fetchRequests(null, filterRange[0], filterRange[1]);
        break;
      default:
        break;
    }
  };

  const handleDateChange = (dates) => {
    if (dates) {
      const [startDate, endDate] = dates;
      setFilterRange([startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")]);
      fetchRequests(null, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"));
    } else {
      setFilterRange([]);
      fetchRequests();
    }
  };

  const commonColumns = [
    { title: "UUID", dataIndex: "uuid", key: "uuid", ellipsis: true },
    { title: "User id", dataIndex: "user_id", key: "user_id", ellipsis: true },
    { title: "Full Name", dataIndex: "full_name", key: "full_name", ellipsis: true },
    { title: "Pickup Timings", dataIndex: "pickup_timings", key: "pickup_timings", ellipsis: true },
    { title: "Pickup Date", dataIndex: "pickup_date", key: "pickup_date", ellipsis: true },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span>{text}</span>,
    },
  ];

  const pendingColumns = [
    ...commonColumns,
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          size={screens.xs ? "small" : "middle"}
          onClick={() => updateRequestStatus(record.id, "APPROVED")}
        >
          Mark as Completed
        </Button>
      ),
    },
  ];

  return (
    <>
      <Head />
      <div style={{ border: "1px solid #d9d9d9", padding: "16px", borderRadius: "4px", marginBottom: "16px" }}>
        <div style={{display:"Flex",flexDirection:"row",justifyContent:"space-between"}}>
      <h2 style={{ marginBottom: "16px", marginTop: "0" }}>Requests</h2>
      <Link to="/requestform" style={{color:'black',textDecoration:"none"}}>
      <Button type='primary' style={{ display: "flex", alignItems: "center" }}>
        
        New Request
      </Button>
      </Link>
    </div>
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab="Pending" key="1">
            <Table
              columns={pendingColumns}
              dataSource={requests}
              rowKey="id"
              loading={loading}
              scroll={{ x: screens.xs ? 800 : undefined }} // Enable horizontal scroll on small screens
            />
          </TabPane>
          <TabPane tab="Completed" key="2">
            <Table
              columns={commonColumns}
              dataSource={requests}
              rowKey="id"
              loading={loading}
              scroll={{ x: screens.xs ? 800 : undefined }} // Enable horizontal scroll on small screens
            />
          </TabPane>
          <TabPane tab="All" key="3">
            <RangePicker onChange={handleDateChange} />
            <Table
              columns={commonColumns}
              dataSource={requests}
              rowKey="id"
              loading={loading}
              scroll={{ x: screens.xs ? 800 : undefined }} // Enable horizontal scroll on small screens
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default PendingRequests;
