import React from "react";
import { Spin, Table } from "antd";
import { useGetAllJobsQuery } from "../../redux/apiSlices/categorySlice";

// Sample data
const jobPostsData = [
  {
    key: "1",
    applicantName: "John Doe",
    applied: "2025-02-15",
    jobPost: "Software Engineer",
    companyName: "Tech Solutions",
    date: "2025-03-01",
    jobType: "Full-time",
    salary: "$80,000",
    details: "Develop and maintain software applications.",
  },
  {
    key: "2",
    applicantName: "Jane Smith",
    applied: "2025-02-20",
    jobPost: "Product Manager",
    companyName: "Innovate Corp",
    date: "2025-03-05",
    jobType: "Full-time",
    salary: "$95,000",
    details: "Lead product development and strategy.",
  },
  {
    key: "3",
    applicantName: "Emily Johnson",
    applied: "2025-02-25",
    jobPost: "UX Designer",
    companyName: "Creative Agency",
    date: "2025-03-10",
    jobType: "Part-time",
    salary: "$60,000",
    details: "Design user-friendly interfaces and experiences.",
  },
  {
    key: "4",
    applicantName: "Michael Brown",
    applied: "2025-02-28",
    jobPost: "Data Analyst",
    companyName: "Data Insights",
    date: "2025-03-15",
    jobType: "Contract",
    salary: "$70,000",
    details: "Analyze data and provide insights.",
  },
  {
    key: "5",
    applicantName: "Olivia Miller",
    applied: "2025-03-01",
    jobPost: "Marketing Specialist",
    companyName: "Marketing Pros",
    date: "2025-03-20",
    jobType: "Full-time",
    salary: "$65,000",
    details: "Develop marketing strategies and campaigns.",
  },
];

const JobPosts = () => {
  const { data: allJobs, isLoading } = useGetAllJobsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const jobPosts = allJobs?.data || [];
  console.log(jobPosts);

  const columns = [
    {
      title: "Job Post",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Type",
      dataIndex: "jobType",
      key: "jobType",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => new Date(text).toLocaleDateString(),
    },

    {
      title: "Details",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <div className="line-clamp-1">{text?.slice(0, 30)}...</div>
      ),
    },
  ];

  return (
    <div className="p-4 h-screen bg-white rounded shadow">
      <h1 className="font-bold text-xl my-5">Job Posts</h1>
      <Table columns={columns} dataSource={jobPosts} rowKey="_id" />
    </div>
  );
};

export default JobPosts;
