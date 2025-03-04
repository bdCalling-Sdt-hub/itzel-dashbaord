import React, { useState } from "react";
import { Card, Modal, Input, Button } from "antd";
import { FaPlus } from "react-icons/fa6";

const PricingCards = () => {
  const [pricingPlans, setPricingPlans] = useState([
    {
      id: 1,
      title: "Premium",
      price: "$89.99",
      features: ["Free Setup", "Bandwidth Limit 10 GB", "20 User Connection"],
    },
    {
      id: 2,
      title: "Premium",
      price: "$89.99",
      features: ["Free Setup", "Bandwidth Limit 10 GB", "20 User Connection"],
    },
    {
      id: 3,
      title: "Premium",
      price: "$89.99",
      features: ["Free Setup", "Bandwidth Limit 10 GB", "20 User Connection"],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: "",
    price: "",
    features: "",
  });

  const handleAddPlan = () => {
    setPricingPlans([
      ...pricingPlans,
      {
        ...newPlan,
        id: pricingPlans.length + 1,
        features: newPlan.features.split(","),
      },
    ]);
    setIsModalOpen(false);
    setNewPlan({ title: "", price: "", features: "" });
  };

  return (
    <div className="flex flex-col h-screen items-center gap-6 p-6 bg-white">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold"> Subscription</h1>
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
            <h2 className="text-xl font-semibold">{plan.title}</h2>
            <p className="text-gray-500">Monthly Charge</p>
            <h3 className="text-3xl font-bold text-blue-600">{plan.price}</h3>
            <div className="my-4 text-gray-600">
              {plan.features.map((feature, index) => (
                <p key={index}>{feature}</p>
              ))}
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
          placeholder="Title"
          value={newPlan.title}
          onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
          className="mb-2"
        />
        <Input
          placeholder="Price"
          value={newPlan.price}
          onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
          className="mb-2"
        />
        <Input
          placeholder="Features (comma separated)"
          value={newPlan.features}
          onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
        />
      </Modal>
    </div>
  );
};

export default PricingCards;
