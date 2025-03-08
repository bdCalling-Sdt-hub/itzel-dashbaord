import { Spin } from "antd";
import { useGeneralStatsQuery } from "../../../redux/apiSlices/dashboardSlice";

const GeneralStateSection = () => {
  const { data: generalStateData, isLoading } = useGeneralStatsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const state = generalStateData?.data;

  // console.log(state);

  return (
    <div className="grid md:grid-cols-5 gap-6 md:h-[110px]">
      <div className="bg-white border rounded-md py-0 px-6 flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl text-base">Total User</h2>
          <h3 className="text-center text-4xl font-semibold">
            {state?.totalUsers}
          </h3>
        </div>
      </div>
      <div className="bg-white border rounded-md py-0 px-6 flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl text-base">Total Creator</h2>
          <h3 className="text-center text-4xl font-semibold">
            {state?.totalCreator}
          </h3>
        </div>
      </div>
      <div className="bg-white  border rounded-md py-0 px-6 flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl text-base">Total Event</h2>
          <h3 className="text-center text-4xl font-semibold">
            {state?.totalEvent}
          </h3>
        </div>
      </div>
      <div className="bg-white border rounded-md py-0 px-6 flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl text-base">Total Job Post</h2>
          <h3 className="text-center text-4xl font-semibold">
            {state?.totalJobs}
          </h3>
        </div>
      </div>
      <div className="bg-white border rounded-md py-0 px-6 flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl text-base">Total Earning</h2>
          <h3 className="text-center text-4xl font-semibold">
            ${state?.totalEarning}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GeneralStateSection;
