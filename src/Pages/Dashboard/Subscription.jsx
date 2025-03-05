import React, { useState } from "react";
import { Card, Modal, Input, Button } from "antd";
import { FaPlus } from "react-icons/fa6";

const PricingCards = () => {
  const [pricingPlans, setPricingPlans] = useState([
    {
      id: 1,
      name: "Basic",
      allowedJobPost: 37,
      allowedEventPost: 90,
      features: ["Nothing"],
      price: 10,
    },
    {
      id: 2,
      name: "Standard",
      allowedJobPost: 50,
      allowedEventPost: 120,
      features: ["Free Setup", "Bandwidth Limit 10 GB"],
      price: 20,
    },
    {
      id: 3,
      name: "Premium",
      allowedJobPost: 100,
      allowedEventPost: 200,
      features: ["Free Setup", "Unlimited Bandwidth", "Priority Support"],
      price: 50,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    allowedJobPost: "",
    allowedEventPost: "",
    features: "",
    price: "",
  });

  // Handle adding a new plan
  const handleAddPlan = () => {
    // Validate inputs
    if (
      !newPlan.name ||
      !newPlan.allowedJobPost ||
      !newPlan.allowedEventPost ||
      !newPlan.features ||
      !newPlan.price
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Add the new plan to the list
    setPricingPlans([
      ...pricingPlans,
      {
        ...newPlan,
        id: pricingPlans.length + 1,
        allowedJobPost: parseInt(newPlan.allowedJobPost, 10),
        allowedEventPost: parseInt(newPlan.allowedEventPost, 10),
        price: parseFloat(newPlan.price),
        features: newPlan.features.split(",").map((feature) => feature.trim()),
      },
    ]);

    // Close the modal and reset the form
    setIsModalOpen(false);
    setNewPlan({
      name: "",
      allowedJobPost: "",
      allowedEventPost: "",
      features: "",
      price: "",
    });
  };

  return (
    <div className="flex flex-col h-screen items-center gap-6 p-6 bg-white">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subscription</h1>
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          className="mb-4 py-5 px-6 rounded-lg"
        >
          <FaPlus /> Add Package
        </Button>
      </div>
      <div className="flex justify-center gap-6 flex-wrap">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className="w-80 p-6 text-center shadow-lg rounded-xl bg-white"
          >
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-500">Monthly Charge</p>
            <h3 className="text-3xl font-bold text-blue-600">${plan.price}</h3>
            <div className="my-4 text-gray-600">
              <p>Allowed Job Posts: {plan.allowedJobPost}</p>
              <p>Allowed Event Posts: {plan.allowedEventPost}</p>
              <p>Features:</p>
              <ul className="list-disc pl-6">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Edit Details
            </button>
          </Card>
        ))}
      </div>
      <Modal
        title="Add New Package"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddPlan}
      >
        <Input
          placeholder="Name"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
          className="mb-2"
        />
        <Input
          placeholder="Allowed Job Posts"
          value={newPlan.allowedJobPost}
          onChange={(e) =>
            setNewPlan({ ...newPlan, allowedJobPost: e.target.value })
          }
          className="mb-2"
        />
        <Input
          placeholder="Allowed Event Posts"
          value={newPlan.allowedEventPost}
          onChange={(e) =>
            setNewPlan({ ...newPlan, allowedEventPost: e.target.value })
          }
          className="mb-2"
        />
        <Input
          placeholder="Features (comma separated)"
          value={newPlan.features}
          onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
          className="mb-2"
        />
        <Input
          placeholder="Price"
          value={newPlan.price}
          onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
        />
      </Modal>
    </div>
  );
};

export default PricingCards;
