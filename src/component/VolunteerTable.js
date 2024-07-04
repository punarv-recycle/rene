import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import supabase from './utils'; // Ensure the path is correct
import { Link } from 'react-router-dom';

const VolunteerTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: volunteerData, error } = await supabase.from('Volunteer').select('*');
        if (error) {
          throw error;
        }
        setData(volunteerData);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch volunteer data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      key: 'uuid',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'pin Code',
      dataIndex: 'pin_code',
      key: 'pin_code',
    },
  ];

  return (
    <>
      <div
        style={{
          border: '1px solid #d9d9d9',
          padding: '16px',
          borderRadius: '4px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          {/* <h2 style={{ marginBottom: '16px', marginTop: '0' }}>Volunteer Data</h2> */}
          <Link
            to="/volunteerform"
            style={{ color: 'black', textDecoration: 'none' }}
          >
            <Button type="primary" style={{ display: 'flex', alignItems: 'center' }}>
              New Volunteer
            </Button>
          </Link>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          bordered
          scroll={{ x: 'max-content' }} // Enable horizontal scrolling on small screens
          pagination={{
            pageSize: 20, // Set the number of items per page
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`, // Display total number of items
          }}
        />
      </div>
    </>
  );
};

export default VolunteerTable;
