import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdEvent,
  MdOutlineCategory,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from "js-cookie";
import logo from "../../assets/sidebarLogo.png";
import { FaRegRectangleList, FaRegUser, FaUserTie } from "react-icons/fa6";
import { SlSettings } from "react-icons/sl";
import { BsFillAwardFill } from "react-icons/bs";

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
      icon: <FaRegUser size={24} />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: "/creators",
      icon: <FaUserTie size={24} />,
      label: <Link to="/creators">Creators</Link>,
    },
    {
      key: "/subscriptions",
      icon: <MdOutlineSubscriptions size={24} />,
      label: <Link to="/subscriptions">Subscription</Link>,
    },
    {
      key: "/category",
      icon: <MdOutlineCategory size={24} />,
      label: <Link to="/category">Category</Link>,
    },
    {
      key: "/events",
      icon: <MdEvent size={24} />,
      label: <Link to="/events">Events</Link>,
    },
    {
      key: "/job-post",
      icon: <FaRegRectangleList size={24} />,
      label: <Link to="/job-post">Job Post</Link>,
    },
    {
      key: "/personal-information",
      icon: <CgProfile size={24} />,
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
      icon: <BsFillAwardFill size={24} />,
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
