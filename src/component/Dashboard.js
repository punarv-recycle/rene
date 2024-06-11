import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, message } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import supabase from "./utils"; // Adjust the import path as necessary

const Dashboard = () => {
  const [requestCount, setRequestCount] = useState(0);
  const [dailyUpdates, setDailyUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch request count
      const { count: requestCountData, error: requestCountError } = await supabase
        .from("Form1")
        .select("*", { count: "exact" });

      if (requestCountError) throw requestCountError;
      setRequestCount(requestCountData);

      // Fetch daily updates (for the graph)
      const { data: dailyUpdatesData, error: dailyUpdatesError } = await supabase
        .from("Form")
        .select("date, count")
        .group("date");

      if (dailyUpdatesError) throw dailyUpdatesError;
      setDailyUpdates(dailyUpdatesData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      message.error("Failed to fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card loading={loading}>
            <Statistic title="Total Requests" value={requestCount} />
          </Card>
        </Col>
        <Col span={8}>
          <Card loading={loading}>
            <Statistic title="Daily Updates" value={dailyUpdates.length} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card loading={loading} title="Requests Over Time">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={dailyUpdates}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
