import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import css from "./style.module.css";
import { CiUser } from "react-icons/ci";
import { BiSolidShow } from "react-icons/bi";
import { notification } from "antd";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [validationError, setValidationError] = useState("");
  const Navigate = useNavigate();
  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!username || !password) {
    //   setValidationError("Нэвтрэх нэр эсвэл нууц үг хоосон байна!");
    //   return;
    // }

    const apiUrl = `${process.env.REACT_APP_BASE_URL}/login`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("Response status:", response.status);
      if (response.status === 200) {
        const data = await response.json();
        const { token } = data;
        const { role } = data;
        const { name } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
        notification.success({
          message: "Амжилттай нэвтэрлээ.",
        });
        Navigate("/");
      } else if (response.status === 401) {
        notification.error({
          message: "Нууц үг буруу байна.!!!",
        });
      } else if (response.status === 404) {
        notification.error({
          message: "Мэйл хаяг буруу байна.!!!",
        });
      }
    } catch (error) {
      console.error("Login Failed", error);
      notification.error({
        message: "Нэвтэрч чадсангүй",
      });
    } finally {
    }
  };

  return (
    <div className={css.container}>
      <form className={css.formContainer} onSubmit={handleSubmit}>
        <CiUser className={css.icon} />
        <p className={css.p}>Хэрэглэгч нэвтрэх</p>
        <div className={css.inputBox}>
          <UserOutlined className={css.icons} />
          <input
            type="text"
            placeholder="Username"
            name="username"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
            onChange={handleInput}
            value={user.username}
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
            value={user.password}
          />
          <BiSolidShow
            className={css.hideIcon}
            type="button"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          />
          {/* {passwordVisibility ? "Hide" : "Show"} */}
        </div>
        <button type="submit">Login</button>
        <p className={css.forgotPassword}>
          <Link to="/Register" className={css.link}>
            Энд дарж
          </Link>
          Хэрэглэгчээр бүртгүүлнэ үү
        </p>
      </form>
    </div>
  );
};

export default Login;
