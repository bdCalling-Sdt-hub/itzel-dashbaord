import React, { useState } from "react";
import { Button, Card, Skeleton, Modal, Input, Form, message } from "antd";
import {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useGetPackagesQuery,
  useUpdatePackageMutation,
} from "../../redux/apiSlices/subscribeSlice";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";

const PricingCard = () => {
  const { data: packages, isLoading, refetch } = useGetPackagesQuery();
  const [addPackage] = useCreatePackageMutation();
  const [updatePack] = useUpdatePackageMutation();
  const [deletePack] = useDeletePackageMutation();

  const packageList = packages?.data || [];

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [form] = Form.useForm();

  // Open modal for add/edit
  const openModal = (pkg = null) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
    form.setFieldsValue(
      pkg || {
        name: "",
        price: "",
        allowedJobPost: "",
        allowedEventPost: "",
        features: "",
      }
    );
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
    form.resetFields();
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        price: Number(values.price),
        allowedJobPost: Number(values.allowedJobPost),
        allowedEventPost: Number(values.allowedEventPost),
        features: values.features
          ? values.features.split(",").map((f) => f.trim())
          : [],
      };

      if (editingPackage) {
        console.log("Updating package with data:", formattedValues);

        const response = await updatePack({
          id: editingPackage._id, // Ensure `_id` exists
          ...formattedValues,
        }).unwrap();

        console.log("Update success:", response);
        message.success("Package updated successfully!");
      } else {
        const response = await addPackage(formattedValues).unwrap();
        console.log("Add success:", response);
        message.success("New package added successfully!");
      }

      refetch();
      closeModal();
    } catch (error) {
      console.error("Error updating package:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-100 p-5">
        <h1 className="text-3xl font-bold">Subscription Packages</h1>
        <Button
          className="bg-primary text-white py-2 px-5 rounded-md"
          onClick={() => openModal()}
        >
          Add Package
        </Button>
      </div>

      <div className="flex justify-center items-center bg-gray-100 p-5">
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packageList.map((pkg) => (
              <Card
                key={pkg._id}
                className="w-80 p-6 shadow-lg rounded-2xl border border-gray-200 bg-white relative"
              >
                <button
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
                  onClick={() => {
                    Modal.confirm({
                      title: "Are you sure to delete this package?",
                      okText: "Yes",
                      cancelText: "No",
                      onOk: async () => {
                        await deletePack(pkg._id).unwrap();
                        toast.success("Package deleted successfully");
                        refetch();
                      },
                    });
                  }}
                >
                  <MdClose />
                </button>
                <h2 className="text-lg font-semibold text-gray-800 text-center">
                  {pkg.name}
                </h2>
                <h3 className="text-3xl font-bold text-blue-500 text-center mt-2">
                  ${pkg.price}
                </h3>
                <div className="text-gray-600 text-center mt-4 space-y-1">
                  <p className="text-lg">
                    Allowed Job Post:{" "}
                    <span className="text-blue-500 font-bold">
                      {pkg.allowedJobPost}
                    </span>
                  </p>
                  <p className="text-lg">
                    Allowed Event Post:{" "}
                    <span className="text-blue-500 font-bold">
                      {pkg.allowedEventPost}
                    </span>
                  </p>
                </div>
                <h1 className="text-lg font-semibold text-gray-800 text-center mt-4">
                  Features:
                </h1>
                <ul className="text-gray-600 text-center mt-4 space-y-1">
                  {pkg.features.length > 0 ? (
                    pkg.features.map((feature, i) => <li key={i}>{feature}</li>)
                  ) : (
                    <li>No features listed</li>
                  )}
                </ul>
                <button
                  className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg mt-5 hover:bg-blue-600 transition"
                  onClick={() => openModal(pkg)}
                >
                  Edit Package
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Package Modal */}
      <Modal
        title={editingPackage ? "Edit Package" : "Add Package"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Package Name"
            name="name"
            rules={[{ required: true, message: "Please enter package name" }]}
          >
            <Input placeholder="Enter package name" />
          </Form.Item>

          <Form.Item
            label="Price ($)"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input type="number" placeholder="Enter price" />
          </Form.Item>

          <Form.Item
            label="Allowed Job Posts"
            name="allowedJobPost"
            rules={[{ required: true, message: "Please enter job post limit" }]}
          >
            <Input type="number" placeholder="Enter job post limit" />
          </Form.Item>

          <Form.Item
            label="Allowed Event Posts"
            name="allowedEventPost"
            rules={[
              { required: true, message: "Please enter event post limit" },
            ]}
          >
            <Input type="number" placeholder="Enter event post limit" />
          </Form.Item>

          <Form.Item label="Features (comma separated)" name="features">
            <Input placeholder="Enter features (e.g. Unlimited Access, Support)" />
          </Form.Item>

          <div className="flex justify-end gap-3">
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingPackage ? "Update Package" : "Add Package"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PricingCard;
