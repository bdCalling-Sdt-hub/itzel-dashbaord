import React from "react";
import { Table } from "antd";

// Sample data
const eventsData = [
  {
    key: "1",
    eventName: "Annual Gala",
    name: "John Doe",
    category: "Charity",
    date: "2025-03-10",
    invoice: "INV-001",
    amount: "$500.00",
  },
  {
    key: "2",
    eventName: "Tech Conference",
    name: "Jane Smith",
    category: "Technology",
    date: "2025-03-15",
    invoice: "INV-002",
    amount: "$1,200.00",
  },
  {
    key: "3",
    eventName: "Art Exhibition",
    name: "Emily Johnson",
    category: "Art",
    date: "2025-03-20",
    invoice: "INV-003",
    amount: "$750.00",
  },
  {
    key: "4",
    eventName: "Music Festival",
    name: "Michael Brown",
    category: "Music",
    date: "2025-03-25",
    invoice: "INV-004",
    amount: "$300.00",
  },
  {
    key: "5",
    eventName: "Food Fair",
    name: "Olivia Miller",
    category: "Food",
    date: "2025-03-30",
    invoice: "INV-005",
    amount: "$450.00",
  },
];

const Events = () => {
  const columns = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  return (
    <div className="p-4 h-screen bg-white rounded shadow">
      <h1 className="font-bold text-xl my-5">Events</h1>
      <Table columns={columns} dataSource={eventsData} />
    </div>
  );
};

export default Events;
