import React, { useState } from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import css from "./style.module.css";
import { CiUser } from "react-icons/ci";
import { BiSolidShow } from "react-icons/bi";
import { notification } from "antd";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [registration, setRegistration] = useState({
    username: "",
    email: "",
    password: "",
    comfirmPassword: "",
    role: "user",
  });
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [validationError, setValidationError] = useState("");
  const Navigate = useNavigate();
  const handleInput = (e) => {
    e.persist();
    setRegistration({ ...registration, [e.target.name]: e.target.value });
    console.log(registration);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!username || !password) {
    //   setValidationError("Нэвтрэх нэр эсвэл нууц үг хоосон байна!");
    //   return;
    // }
    if (
      !registration.username ||
      !registration.password ||
      !registration.email ||
      !registration.comfirmPassword
    ) {
      notification.error({ message: "Бүх талбарыг бөглөнө үү." });
      return;
    }
    if (registration.password !== registration.comfirmPassword) {
      notification.error({ message: "Нууц үг адил биш байна." });
      return;
    }
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/Register`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registration),
      });
      console.log("Response status:", response.status);
      if (response.status === 201) {
        const data = await response.json();
        // const { token } = data;
        // const { role } = data;
        // const { name } = data;
        // localStorage.setItem("token", token);
        // localStorage.setItem("role", role);
        // localStorage.setItem("name", name);
        notification.success({
          message: "Амжилттай бүртгэлээ.",
        });
        Navigate("/Login");
      } else if (response.status === 401) {
        notification.error({
          message: "",
        });
      } else if (response.status === 404) {
        notification.error({
          message: "",
        });
      }
    } catch (error) {
      console.error("Login Failed", error);
      notification.error({
        message: "Бүртгэж чадсангүй",
      });
    } finally {
    }
  };

  return (
    <div className={css.container}>
      <form className={css.formContainer} onSubmit={handleSubmit}>
        <CiUser className={css.icon} />
        <p className={css.p}>Хэрэглэгч бүртгүүлэх</p>
        <div className={css.inputBox}>
          <UserOutlined className={css.icons} />
          <input
            type="text"
            placeholder="Username"
            name="username"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
            onChange={handleInput}
            value={registration.username}
          />
        </div>
        <div className={css.inputBox}>
          <MailOutlined className={css.icons} />
          <input
            type="text"
            placeholder="email"
            name="email"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
            onChange={handleInput}
            value={registration.email}
          />
        </div>
        <div className={css.inputBox}>
          <LockOutlined className={css.icons} />
          <input
            type={passwordVisibility ? "text" : "password"}
            placeholder="Password"
            name="password"
            // onChange={(e) => setPassword(e.target.value)}
            onChange={handleInput}
            value={registration.password}
          />
          <BiSolidShow
            className={css.hideIcon}
            type="button"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          />
          {/* {passwordVisibility ? "Hide" : "Show"} */}
        </div>
        <div className={css.inputBox}>
          <LockOutlined className={css.icons} />
          <input
            type={passwordVisibility ? "text" : "password"}
            placeholder="comfirmPassword"
            name="comfirmPassword"
            // onChange={(e) => setPassword(e.target.value)}
            onChange={handleInput}
            value={registration.comfirmPassword}
          />
          <BiSolidShow
            className={css.hideIcon}
            type="button"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          />
          {/* {passwordVisibility ? "Hide" : "Show"} */}
        </div>
        <button type="submit">Бүртгүүлэх</button>
        <p className={css.forgotPassword}>
          <Link to="/Login" className={css.link}>
            Энд дарж
          </Link>
          нэвтрэх хэсэг рүү очино уу
        </p>
      </form>
    </div>
  );
};

export default Register;
