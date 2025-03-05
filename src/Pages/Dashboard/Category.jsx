import React, { useState } from "react";
import { Button, Input, Modal, Upload, message } from "antd";
import { FaPlus } from "react-icons/fa6";
import { UploadOutlined } from "@ant-design/icons";

const Category = () => {
  const [categories, setCategories] = useState([
    {
      image:
        "https://media.istockphoto.com/id/840610244/photo/business-people-negotiating-a-contract.jpg?s=612x612&w=0&k=20&c=wT5ATN3AAd7FO3vTHkZE32e7TRdzRexkHABVp7N5C0Y=",
      name: "Education",
    },
    {
      image:
        "https://media.istockphoto.com/id/840610244/photo/business-people-negotiating-a-contract.jpg?s=612x612&w=0&k=20&c=wT5ATN3AAd7FO3vTHkZE32e7TRdzRexkHABVp7N5C0Y=",
      name: "Health",
    },
    {
      image:
        "https://media.istockphoto.com/id/840610244/photo/business-people-negotiating-a-contract.jpg?s=612x612&w=0&k=20&c=wT5ATN3AAd7FO3vTHkZE32e7TRdzRexkHABVp7N5C0Y=",
      name: "Spa/Beauty",
    },
    {
      image:
        "https://media.istockphoto.com/id/840610244/photo/business-people-negotiating-a-contract.jpg?s=612x612&w=0&k=20&c=wT5ATN3AAd7FO3vTHkZE32e7TRdzRexkHABVp7N5C0Y=",
      name: "Travel",
    },
    {
      image:
        "https://media.istockphoto.com/id/840610244/photo/business-people-negotiating-a-contract.jpg?s=612x612&w=0&k=20&c=wT5ATN3AAd7FO3vTHkZE32e7TRdzRexkHABVp7N5C0Y=",
      name: "Technology",
    },
    {
      image:
        "https://media.istockphoto.com/id/840610244/photo/business-people-negotiating-a-contract.jpg?s=612x612&w=0&k=20&c=wT5ATN3AAd7FO3vTHkZE32e7TRdzRexkHABVp7N5C0Y=",
      name: "Community",
    },
    {
      image:
        "https://media.istockphoto.com/id/840610244/photo/business-people-negotiating-a-contract.jpg?s=612x612&w=0&k=20&c=wT5ATN3AAd7FO3vTHkZE32e7TRdzRexkHABVp7N5C0Y=",
      name: "Sports",
    },
    {
      image:
        "https://media.istockphoto.com/id/840610244/photo/business-people-negotiating-a-contract.jpg?s=612x612&w=0&k=20&c=wT5ATN3AAd7FO3vTHkZE32e7TRdzRexkHABVp7N5C0Y=",
      name: "Family & Kids",
    },
    {
      image:
        "https://media.istockphoto.com/id/840610244/photo/business-people-negotiating-a-contract.jpg?s=612x612&w=0&k=20&c=wT5ATN3AAd7FO3vTHkZE32e7TRdzRexkHABVp7N5C0Y=",
      name: "Events",
    },
    {
      image:
        "https://media.istockphoto.com/id/840610244/photo/business-people-negotiating-a-contract.jpg?s=612x612&w=0&k=20&c=wT5ATN3AAd7FO3vTHkZE32e7TRdzRexkHABVp7N5C0Y=",
      name: "Shopping",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });

  // Open modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategory({ name: "", image: "" }); // Reset form
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleUpload = (info) => {
    if (info.file.status === "done") {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setNewCategory((prev) => ({ ...prev, image: imageUrl }));
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Add new category
  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.image) {
      message.error("Please fill in all fields");
      return;
    }

    setCategories((prev) => [...prev, newCategory]);
    message.success("Category added successfully");
    handleCloseModal();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex items-center justify-between my-10">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Button
          className="bg-primary py-5 px-6 text-white"
          onClick={showModal}
        >
          <FaPlus /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {categories.map((item, index) => (
          <div
            key={index}
            className="flex flex-col cursor-pointer rounded-xl items-center gap-3 bg-white p-4"
          >
            <img
              className="w-[250px] h-[220px] rounded-xl object-cover"
              src={item.image}
              alt={item.name}
            />
            <p className="text-2xl font-semibold">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        title="Add Category"
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleAddCategory}
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Category Name"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
          />
          <Upload
            beforeUpload={() => false}
            onChange={handleUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {newCategory.image && (
            <img
              className="w-full h-[150px] object-cover rounded"
              src={newCategory.image}
              alt="Preview"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Category;