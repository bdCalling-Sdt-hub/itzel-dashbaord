import React from "react";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import RunningOrdersTable from "../../components/ui/Home/RunningOrdersTable";
import rentMeLogo from "../../assets/navLogo.png";

import GeneralStateSection from "../../components/ui/Home/GeneralStateSection";
import Professionals from "../../components/ui/Home/Professionals";
import UserEngagement from "../../components/ui/Home/UserEngagement";

const Home = () => {
  const orderSummary = {
    doneByProfessionals: 65,
    doneByFreelancers: 35,
  };

  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  return (
    <div>
      <GeneralStateSection />
      <div className="md:flex w-full items-center gap-4 mt-4">
        <div className="md:w-full bg-white border rounded-lg py-3 flex flex-col justify-center">
          <SalesTrackingChart />
        </div>
      </div>
      <div className="w-full md:flex gap-6">
        <div className="md:w-full rounded-lg my-6 ">
          <UserEngagement />
        </div>
      </div>
    </div>
  );
};

export default Home;
