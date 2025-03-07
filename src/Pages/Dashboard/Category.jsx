import React, { useState } from "react";
import { Button, Input, Modal, Skeleton, Upload, message } from "antd";
import { FaCross, FaPlus, FaTrash } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../redux/api/baseApi";
import { MdCancel, MdOutlineAddPhotoAlternate } from "react-icons/md";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: null,
    previewImage: null, // To store the preview URL of the uploaded image
  });
  const [imgURL, setImgURL] = useState("");
  const [file, setFile] = useState(null);

  const { data: categories, isLoading, refetch } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categoryData = categories?.data || [];

  // Open modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategory({ name: "", image: null, previewImage: null }); // Reset form
    setImgURL(""); // Reset image preview
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload and preview
  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
      setNewCategory((prev) => ({
        ...prev,
        image: selectedFile,
        previewImage: imgUrl,
      }));
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

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      message.success("Category deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Failed to delete category. Please try again.");
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
              className="flex flex-col cursor-pointer rounded-xl items-center gap-3 bg-white p-4 relative"
            >
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full"
                onClick={() => handleDelete(item._id)}
              >
                <MdCancel size={24} />
              </button>
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

      {/* Add Category Modal */}
      <Modal
        title="Add Category"
        open={isModalOpen}
        onOk={handleAddCategory}
        onCancel={handleCloseModal}
        okText="Add"
        cancelText="Cancel"
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Category Name"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
          />
          <div className="flex items-center gap-4">
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center gap-2"
            >
              <MdOutlineAddPhotoAlternate className="text-2xl" />
              <span>Upload Image</span>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onChangeImage}
            />
            {newCategory.previewImage && (
              <img
                src={newCategory.previewImage}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
