import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";
import {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/apiSlices/termsAndConditionSlice";
import toast from "react-hot-toast";
import rentMeLogo from "../../assets/navLogo.png";
import { Spin } from "antd";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("USER");

  useEffect(() => {
    setContent(content);
  }, [selectedTab]);

  const {
    data: termsAndCondition,
    isLoading,
    refetch,
  } = useTermsAndConditionQuery(selectedTab);

  const [updateTermsAndConditions] = useUpdateTermsAndConditionsMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const termsAndConditionData = termsAndCondition[0]?.description;
  console.log(termsAndConditionData);

  const termsDataSave = async () => {
    const data = {
      description: content,
    };

    try {
      const res = await updateTermsAndConditions({
        id: termsAndCondition[0]?._id,
        data,
      }).unwrap();
      if (res.success) {
        toast.success("Terms and Conditions updated successfully");
        setContent(res?.data?.description);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      throw new Error("Something Is wrong at try");
    }
  };

  return (
    <div>
      <Title className="mb-4">Terms and Conditions</Title>

      <JoditEditor
        ref={editor}
        value={termsAndConditionData}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={termsDataSave}
          type="submit"
          className="bg-primary text-white w-[160px] h-[42px] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
