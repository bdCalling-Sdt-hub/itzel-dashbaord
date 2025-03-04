import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdCancelPresentation,
  MdCategory,
  MdFeaturedPlayList,
  MdMiscellaneousServices,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { TbUserScreen } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { PiUserPlus } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from "js-cookie";
import logo from "../../assets/sidebarLogo.png";
import { DiGoogleAnalytics } from "react-icons/di";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMoneyBillTransfer, FaScissors } from "react-icons/fa6";
import { FaBorderStyle } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    Cookies.remove("refreshToken");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <LuLayoutDashboard size={24} />,
      label: (
        <Link to="/" className="">
          Dashboard
        </Link>
      ),
    },
    {
      key: "/users",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: "/creators",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/creators">Creators</Link>,
    },
    {
      key: "/subscriptions",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/subscriptions">Subscription</Link>,
    },
    {
      key: "/category",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/category">Category</Link>,
    },
    {
      key: "/events",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/events">Events</Link>,
    },
    {
      key: "/job-post",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/job-post">Job Post</Link>,
    },
    {
      key: "/personal-information",
      icon: <SlSettings size={24} />,
      label: (
        <Link
          to="/personal-information"
          className="text-white hover:text-white"
        >
          Personal Information
        </Link>
      ),
    },
    {
      key: "/change-password",
      icon: <SlSettings size={24} />,
      label: (
        <Link to="/change-password" className="text-white hover:text-white">
          Change Password
        </Link>
      ),
    },
    {
      key: "/terms-and-condition",
      icon: <SlSettings size={24} />,
      label: (
        <Link to="/terms-and-condition" className="text-white hover:text-white">
          Terms And Condition
        </Link>
      ),
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="mt-5 overflow-y-scroll">
      <div className="px-10">
        <Link
          to={"/"}
          className="mb-10 flex items-center flex-col gap-2 justify-center py-4"
        >
          <img src={logo} alt="" />
        </Link>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "transparent" }}
        items={menuItems}
      />
    </div>
  );
};

export default Sidebar;
