import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import supabase from './utils'; // Ensure the path is correct
import { Link } from 'react-router-dom';
import Head from './Head';

const wasteTypes = [
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
  "pet",
  "ppe",
  "hdpe",
  "ldpe",
  "old_toys",
  "raffia",
  "compost",
  "cocopeat",
];

const SalesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: salesData, error } = await supabase.from('Form2').select('*');
        if (error) {
          throw error;
        }
        setData(salesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch sales data.');
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Buyer Name',
      dataIndex: 'buyer_name',
      key: 'buyer_name',
    },
    {
      title: 'Organisation Name',
      dataIndex: 'organisation_name',
      key: 'organisation_name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile_number',
      key: 'mobile_number',
    },
    {
      title: 'Total Sale Amount',
      dataIndex: 'total_sale_amount',
      key: 'total_sale_amount',
      render: (amount) => `₹${amount.toFixed(2)}`,
    },
    ...wasteTypes.map(type => ({
      title: type.replace(/_/g, ' ').toUpperCase(),
      children: [
        {
          title: 'Weight (kg)',
          dataIndex: [type, 'weight'],
          key: `${type}_weight`,
        },
        {
          title: 'Price/KG (₹)',
          dataIndex: [type, 'price_per_kg'],
          key: `${type}_price`,
        },
      ],
    })),
  ];

  return (
    <>
      <Head />
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
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ marginBottom: '16px', marginTop: '0' }}>Sales Data</h2>
          <Link
            to="/salesform"
            style={{ color: 'black', textDecoration: 'none' }}
          >
            <Button type="primary" style={{ display: 'flex', alignItems: 'center' }}>
              New Sale
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

export default SalesTable;
