import React, { useState, useEffect } from "react";
import css from "./module.css";
import SideBar from "../components/SideBar";
import { Button, notification } from "antd";
import { AiOutlinePoweroff } from "react-icons/ai";
import Dashboard from "../components/Dashboard";
import { useNavigate } from "react-router-dom";
import UserCheck from "../components/UserCheck";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      notification.error({ message: "Нэвтэрч орно уу!!!" });
      navigate("/Login");
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("theme");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/Login");
  };
  return (
    <div className="main">
      <div className="SideBar">
        <SideBar />
      </div>

      <div className="container">
        <header>
          <Button className={css.AiOutlinePoweroff} onClick={logout}>
            <AiOutlinePoweroff />
          </Button>
        </header>
        <section>
          {/* <UserCheck /> */}
          <Dashboard />
        </section>
        <footer></footer>
      </div>
    </div>
  );
};

export default HomePage;
