import React, { useState } from "react";
import { Table, Button, Space, Avatar, Spin } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";
import { FaEye, FaTrash } from "react-icons/fa6";
import moment from "moment";
import { useUsersQuery } from "../../redux/apiSlices/userSlice";
import { imageUrl } from "../../redux/api/baseApi";

const Users = () => {
  const { data: users, isLoading } = useUsersQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const usersData = users?.data;

  console.log(usersData);

  const columns = [
    {
      title: "Serial No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const name = record.name || "Unknown";
        const imgUrl = record.profile || randomImg;
        const fullImgUrl = imgUrl.startsWith("http")
          ? imgUrl
          : `${imageUrl}${imgUrl}`;

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
      title: "Job Applied",
      dataIndex: "totalAppliedJobs",
      align: "center",
      key: "totalAppliedJobs",
    },
    {
      title: "Event Participated",
      dataIndex: "totalEvent",
      align: "center",
      key: "totalEvent",
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/user/profile/${record._id}`}>
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
      <h1 className="text-2xl font-semibold  my-5">Users</h1>
      <Table
        columns={columns}
        dataSource={usersData}
        rowKey="id"
        scroll={{ x: 1000 }}
      />
    </>
  );
};

export default Users;
