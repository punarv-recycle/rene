import React from 'react';
import { Tabs } from 'antd';
import DailyUpdates from './DailyUpdates';
import SalesTable from './SalesTable';
import PendingRequests from './PendingRequests';
import VolunteerTable from './VolunteerTable';
import 'antd/dist/reset.css';
import Head from './Head';
import './Admin.css';  // Import the custom CSS


const { TabPane } = Tabs;

const Admin = () => {
  return (
    <div className="container mt-4">
      <Head/>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Daily Updates" key="1">
          <DailyUpdates />
        </TabPane>
        <TabPane tab="Sales Table" key="2">
          <SalesTable />
        </TabPane>
        <TabPane tab="Requests" key="3">
          <PendingRequests />
        </TabPane>
        <TabPane tab="Volunteers" key="4">
          <VolunteerTable />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;
