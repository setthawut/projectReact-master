import { Layout, Menu, Dropdown, Avatar, Typography } from "antd";
import { Route, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { SettingOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import Pages from "../../pages/route";

import "./CssLayout.css";
import {
  FileTextOutlined,
  UserAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  CarOutlined,
  CreditCardOutlined,
  InsuranceOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  let getUsername = localStorage.getItem("userProfile");
  let UserProfile = JSON.parse(getUsername);
  let history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const iconList = [
    {
      name: "หน้าแรก",
      icon: <DashboardOutlined />,
      key: "1",
      to: "/dashbord",
      permission: ["user", "superAdmin", "manage"],
    },
    {
      name: "ผู้ใช้ระบบ",
      icon: <UserAddOutlined />,
      key: "2",
      to: "/master/user",
      permission: ["user", "superAdmin", "manage"],
    },
    // {
    //   name: "เปลี่ยนรหัสผ่าน",
    //   icon: <SettingOutlined />,
    //   key: "3",
    //   to: `/resetpassword/${UserProfile.id}`,
    //   permission: ["user", "superAdmin", "manage"],
    // },
    {
      name: "ข้อมูลรถ",
      icon: <CarOutlined />,
      key: "3",
      to: "/car/carInfomation",
      permission: ["user", "superAdmin", "manage"],
    },

    {
      name: "พนักงานขับรถ",
      icon: <UserOutlined />,
      key: "4",
      to: "/car/driver",
      permission: ["user", "superAdmin", "manage"],
    },
    {
      name: "ข้อมูลทางการเงิน",
      icon: <FileTextOutlined />,
      key: "5",
      to: "/car/clash",
      permission: ["user", "superAdmin", "manage"],
    },
    {
      name: "ข้อมูลประกัน พรบ. ภาษี",
      icon: <InsuranceOutlined />,
      key: "6",
      to: "/car/insurance",
      permission: ["user", "superAdmin", "manage"],
    },
    {
      name: "บัตรน้ำมัน",
      icon: <CreditCardOutlined />,
      key: "7",
      to: "/car/oilcard",
      permission: ["user", "superAdmin", "manage"],
    },
    {
      name: "Test-Map",
      icon: <CreditCardOutlined />,
      key: "8",
      to: "/testmap",
      permission: ["user", "superAdmin", "manage"],
    },
  ];

  const iconListSetting = [
    {
      name: "ผู้ครอบครองรถ",
      icon: <DashboardOutlined />,
      key: "9",
      to: "/setting/ownerVehicle",
      permission: ["user", "superAdmin","manage"],
    },
  ];
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const onLogout = () => {
    localStorage.removeItem("userLogin");
    history.replace("/login");
  };

  const menuUser = (
    <Menu style={{ width: 150 }}>
      <SubMenu
        key="sub1"
        title={
          <span>
            <SettingOutlined />
            <span>Setting</span>
          </span>
        }
      >
        <Menu.Item>
          <Link to={`/resetpassword/${UserProfile.id}`}>Change Password</Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Divider />

      <Menu.Item onClick={onLogout}>
        <LockOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider
        breakpoint="xl"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <Link to={"/dashboad"}>
          <div className="logo">
            <span>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logistics.svg`}
              />
            </span>
            <span style={{ paddingLeft: "23px", fontSize: "22px" }}>
              Logistics
            </span>
          </div>
        </Link>
        <Menu theme="dark" mode="inline">
          {iconList.map((item) =>
            item.permission.includes(UserProfile.role) ? (
              <Menu.Item key={item.key} icon={item.icon}>
                <NavLink to={item.to}>{item.name}</NavLink>
              </Menu.Item>
            ) : (
              ""
            ),
          )}
          {iconListSetting.map((item) =>
            item.permission.includes(UserProfile.role) ? (
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <span>Setting</span>
                  </span>
                }
              >
                <Menu.Item key={item.key} icon={item.icon}>
                  <NavLink to={item.to}>{item.name}</NavLink>
                </Menu.Item>
              </SubMenu>
            ) : (
              ""
            ),
          )}
        </Menu>
      </Sider>

      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 240,
        }}
      >
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            },
          )}

          <Dropdown overlay={menuUser}>
            <span style={{ padding: "0px 22px", float: "right" }}>
              <Avatar
                src={UserProfile.full_path}
                style={{ cursor: "pointer", width: 35, height: 35 }}
              />
              <span style={{ marginLeft: 10, cursor: "pointer" }}>
                {UserProfile.name}
              </span>
            </span>
          </Dropdown>
        </Header>
        <Content
          //className="site-layout-background"
          style={{
            //margin: "24px 16px",
            //padding: 24,
            minHeight: 850,
          }}
        >
          <Route path="/">
            <Pages />
          </Route>
        </Content>
        <Footer
          style={{
            padding: "15px 20px",
            color: "#000000",
            fontSize: "14px",
            background: "#FFF",
            borderTop: "1px solid #ededed",
          }}
        >
          <span style={{ float: "left" }}></span>

          <span style={{ float: "right" }}>SSSSSSSSSSSSSSSSSS</span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
