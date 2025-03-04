import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";
import { FaEye, FaTrash } from "react-icons/fa6";
import moment from "moment";

const Creators = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  // Dummy data for users
  const users = {
    data: {
      data: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phoneNumber: "+123456789",
          address: "123 Main St, Springfield",
          totalServices: 12,
          status: "VIP",
          role: "User",
          subscription: "Monthly",
          profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
          fine: 50,
          eventHosted: 3,
          jobPosted: 2,
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phoneNumber: "+987654321",
          address: "456 Elm St, Springfield",
          totalServices: 5,
          status: "Regular",
          role: "User",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
          eventHosted: 1,
          jobPosted: 1,
        },
        {
          id: "3",
          name: "Sam Wilson",
          email: "sam@example.com",
          phoneNumber: "+192837465",
          address: "789 Oak St, Springfield",
          totalServices: 3,
          status: "New",
          role: "User",
          subscription: "Monthly",
          profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
          fine: 30,
          eventHosted: 0,
          jobPosted: 0,
        },
        {
          id: "4",
          name: "Emily Johnson",
          email: "emily@example.com",
          phoneNumber: "+456789123",
          address: "321 Pine St, Springfield",
          totalServices: 8,
          status: "VIP",
          role: "User",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
          fine: 0,
          eventHosted: 2,
          jobPosted: 2,
        },
        {
          id: "5",
          name: "Michael Brown",
          email: "michael@example.com",
          phoneNumber: "+789456123",
          address: "654 Maple St, Springfield",
          totalServices: 6,
          status: "Regular",
          role: "User",
          subscription: "Monthly",
          profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
          eventHosted: 1,
          jobPosted: 1,
        },
        {
          id: "6",
          name: "Sophia Davis",
          email: "sophia@example.com",
          phoneNumber: "+123987654",
          address: "987 Birch St, Springfield",
          totalServices: 7,
          status: "New",
          role: "User",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
          fine: 40,
          eventHosted: 0,
          jobPosted: 0,
        },
        {
          id: "7",
          name: "David Wilson",
          email: "david@example.com",
          phoneNumber: "+456321789",
          address: "321 Cedar St, Springfield",
          totalServices: 10,
          status: "VIP",
          role: "User",
          subscription: "Monthly",
          profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
          eventHosted: 3,
          jobPosted: 2,
        },
        {
          id: "8",
          name: "Olivia Miller",
          email: "olivia@example.com",
          phoneNumber: "+789123456",
          address: "654 Walnut St, Springfield",
          totalServices: 9,
          status: "Regular",
          role: "User",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/women/8.jpg",
          eventHosted: 2,
          jobPosted: 2,
        },
        {
          id: "9",
          name: "Liam Martinez",
          email: "liam@example.com",
          phoneNumber: "+123456987",
          address: "987 Cedar St, Springfield",
          totalServices: 4,
          status: "New",
          role: "User",
          subscription: "Monthly",
          profileImg: "https://randomuser.me/api/portraits/men/9.jpg",
          fine: 25,
          eventHosted: 0,
          jobPosted: 0,
        },
        {
          id: "10",
          name: "Ava Hernandez",
          email: "ava@example.com",
          phoneNumber: "+456987123",
          address: "321 Birch St, Springfield",
          totalServices: 11,
          status: "VIP",
          role: "User",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/women/10.jpg",
          eventHosted: 3,
          jobPosted: 2,
        },
        {
          id: "11",
          name: "James Anderson",
          email: "james@example.com",
          phoneNumber: "+789123789",
          address: "654 Pine St, Springfield",
          totalServices: 5,
          status: "Regular",
          role: "User",
          subscription: "Monthly",
          profileImg: "https://randomuser.me/api/portraits/men/11.jpg",
          eventHosted: 1,
          jobPosted: 1,
        },
        {
          id: "12",
          name: "Isabella Garcia",
          email: "isabella@example.com",
          phoneNumber: "+123789456",
          address: "987 Maple St, Springfield",
          totalServices: 13,
          status: "New",
          role: "User",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/women/12.jpg",
          eventHosted: 0,
          jobPosted: 0,
        },
        {
          id: "13",
          name: "Lucas Martinez",
          email: "lucas@example.com",
          phoneNumber: "+456321654",
          address: "321 Walnut St, Springfield",
          totalServices: 6,
          status: "VIP",
          role: "User",
          subscription: "Monthly",
          profileImg: "https://randomuser.me/api/portraits/men/13.jpg",
          eventHosted: 3,
          jobPosted: 2,
        },
        {
          id: "14",
          name: "Emma Harris",
          email: "emma@example.com",
          phoneNumber: "+789654321",
          address: "654 Cedar St, Springfield",
          totalServices: 7,
          status: "Regular",
          role: "User",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/women/14.jpg",
          fine: 35,
          eventHosted: 2,
          jobPosted: 2,
        },
        {
          id: "15",
          name: "Ethan Thompson",
          email: "ethan@example.com",
          phoneNumber: "+123321456",
          address: "987 Pine St, Springfield",
          totalServices: 8,
          status: "New",
          role: "User",
          subscription: "Monthly",
          profileImg: "https://randomuser.me/api/portraits/men/15.jpg",
          eventHosted: 0,
          jobPosted: 0,
        },
      ],
    },
  };

  const data = users?.data?.data;

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const name = record.name || "Unknown";
        const imgUrl = record.profileImg || randomImg;
        const fullImgUrl = imgUrl.startsWith("http")
          ? imgUrl
          : `${import.meta.env.VITE_BASE_URL}${imgUrl}`;

        return (
          <Space>
            <Avatar src={fullImgUrl} alt={name} size="large" />
            <span>{name}</span>
          </Space>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Job Posted",
      dataIndex: "jobPosted",
      align: "center",
      key: "jobPosted",
    },
    {
      title: "Event Hosted",
      dataIndex: "eventHosted",
      align: "center",
      key: "eventHosted",
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
      key: "role",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (status) => {
        let color;
        switch (status) {
          case "active":
            color = "green";
            break;
          case "inactive":
            color = "red";
            break;
          default:
            color = "gray";
        }

        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/user/profile/${record.id}`}>
            <Button className="bg-[#FFF4E3] text-[#F3B806] border-none">
              <FaEye />
            </Button>
          </Link>
          <Button
            className="border border-red-600 text-red-700"
            onClick={() => onDelete(record.id)}
          >
            <FaTrash />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold  my-5">Creators</h1>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize, onChange: () => setPageSize() }}
        scroll={{ x: 1000 }}
      />
    </>
  );
};

export default Creators;
