import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SettingOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
// import { Radio } from "antd";
// import { CiSearch } from "react-icons/ci";
import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const { SubMenu } = Menu;

const SideBar = ({ userRole }) => {
  const [collapsed, setCollapsed] = useState(true);
  // const [role, setRole] = useState();
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (key) => {
    if (key === "1") {
      navigate("/");
    } else if (key === "3") {
      navigate("/userCheck");
    }
  };

  useEffect(() => {
    // const userRole = localStorage.getItem("role");
    // setRole(userRole);
  }, []);

  const items = [
    <Menu.Item key="1" icon={<HomeOutlined />}>
      Нүүр хуудас
    </Menu.Item>,
    <Menu.Item key="2" icon={<SettingOutlined />}>
      Тохиргоо
    </Menu.Item>,
    <Menu.Item key="3" icon={<UserOutlined />}>
      Хүсэлт шалгах
    </Menu.Item>,
    <SubMenu key="sub1" title="Хайлт" icon={<SearchOutlined />}>
      <Menu.Item key="5" icon={<VscCallIncoming />}>
        Орсон дуудлага
      </Menu.Item>
      <Menu.Item key="6" icon={<VscCallOutgoing />}>
        Гарсан дуудлага
      </Menu.Item>

      {/* <Menu.Item key="7">Option 7</Menu.Item>
      <Menu.Item key="8">Option 8</Menu.Item> */}
    </SubMenu>,
    // <SubMenu key="sub2" title="Navigation Two">
    //   <Menu.Item key="9">Option 9</Menu.Item>
    //   <Menu.Item key="10">Option 10</Menu.Item>
    //   <SubMenu key="sub3" title="Submenu">
    //     <Menu.Item key="11">Option 11</Menu.Item>
    //     <Menu.Item key="12">Option 12</Menu.Item>
    //   </SubMenu>
    // </SubMenu>,
  ];

  return (
    <div
      style={{
        hover: { width: 200 },
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginTop: 15,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onClick={({ key }) => handleMenuClick(key)}
      >
        {items}
      </Menu>
    </div>
  );
};

export default SideBar;
