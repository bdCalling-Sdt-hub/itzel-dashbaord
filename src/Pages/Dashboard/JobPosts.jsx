import React from "react";
import { Table } from "antd";

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
  const columns = [
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
    },
    {
      title: "Applied",
      dataIndex: "applied",
      key: "applied",
    },
    {
      title: "Job Post",
      dataIndex: "jobPost",
      key: "jobPost",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
      key: "jobType",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
  ];

  return (
    <div className="p-4 h-screen bg-white rounded shadow">
      <h1 className="font-bold text-xl my-5">Job Posts</h1>
      <Table columns={columns} dataSource={jobPostsData} />
    </div>
  );
};

export default JobPosts;
