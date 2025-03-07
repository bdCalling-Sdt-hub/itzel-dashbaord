import React from "react";
import { Spin, Table, Tag } from "antd";
import { useGetAllEventsQuery } from "../../redux/apiSlices/categorySlice";
import moment from "moment/moment";
import { imageUrl } from "../../redux/api/baseApi";

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
  const { data: events, isLoading } = useGetAllEventsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const eventsData = events?.data || [];
  console.log(eventsData);

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text, record) => (
        <img
          src={
            record?.thumbnailImage?.startsWith("http")
              ? record?.thumbnailImage
              : `${imageUrl}/${record?.thumbnailImage}`
          }
          alt={record.eventName}
          className="rounded w-32 h-20 object-cover"
        />
      ),
    },
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Creator Name",
      dataIndex: ["creator", "name"],
      key: "name",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (text, record) => (
        <span>
          {record?.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </span>
      ),
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => <span>${text}</span>,
    },
    {
      title: "Time & Date",
      dataIndex: "time",
      key: "time",
      render: (text, record) => (
        <span>{moment(text).format("MMM Do YYYY, h:mm A")}</span>
      ),
    },
  ];

  return (
    <div className="p-4 h-screen bg-white rounded shadow">
      <h1 className="font-bold text-xl my-5">Events</h1>
      <Table columns={columns} rowKey="_id" dataSource={eventsData} />
    </div>
  );
};

export default Events;
