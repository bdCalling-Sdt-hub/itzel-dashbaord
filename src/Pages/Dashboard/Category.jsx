import React, { useState } from "react";
import { Button, Input, Modal, Skeleton, Upload, message } from "antd";
import { FaPlus } from "react-icons/fa6";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../redux/api/baseApi";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });

  const { data: categories, isLoading, refetch } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();

  const categoryData = categories?.data || [];
  console.log(categoryData);

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
      setNewCategory((prev) => ({ ...prev, image: info.file.originFileObj })); // Store the file object
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.image) {
      message.error("Please fill in all fields");
      return;
    }

    try {
      // Create a FormData object to send the file and name
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("image", newCategory.image); // Append the file object

      // Call the createCategory mutation
      await createCategory(formData).unwrap();

      message.success("Category added successfully");

      // Refetch categories to update the list
      refetch();

      // Close the modal and reset the form
      handleCloseModal();
    } catch (error) {
      console.error("Error adding category:", error);
      message.error("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex items-center justify-between my-10">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Button className="bg-primary py-5 px-6 text-white" onClick={showModal}>
          <FaPlus /> Add Category
        </Button>
      </div>

      {isLoading ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {categoryData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col cursor-pointer rounded-xl items-center gap-3 bg-white p-4"
            >
              <img
                className="w-[250px] h-[220px] rounded-xl object-cover"
                src={
                  item?.image?.startsWith("http")
                    ? item?.image
                    : `${imageUrl}${item?.image}`
                }
                alt={item.name}
              />
              <p className="text-xl text-center font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      )}

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
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={handleUpload}
          >
            {newCategory.image ? (
              <img
                src={URL.createObjectURL(newCategory.image)}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
