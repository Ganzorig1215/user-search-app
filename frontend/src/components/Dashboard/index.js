import React, { useState } from "react";
import css from "./style.module.css";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  notification,
  DatePicker,
  Space,
  Table,
  Tag,
} from "antd";

const Dashboard = () => {
  const [activeButton, setActiveButton] = useState();
  const [user, setUser] = useState({
    usernumber: "",
    date: "",
    dateString: "",
  });
  const [date, setDate] = useState();

  const activeButton1 = (param) => {
    setActiveButton(param);
  };

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      call: activeButton,
      usernumber: user.usernumber,
      date: user.date,
      date: date,
    };

    const apiUrl = `${process.env.REACT_APP_BASE_URL}/search`;
    try {
      const response = fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Response status:", response.status);
      if (response.status === 200) {
        const data = response.json();
        notification.success({
          message: "Амжилттай нэвтэрлээ.",
        });
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
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [];
  return (
    <div className={css.contain}>
      <div className={css.innerContain}>
        <div className={css.aaa}>
          <UserOutlined />
          <p> Хэрэглэгч хайх</p>
        </div>
        <div className={css.nextContain}>
          <div className={css.call}>
            <button
              onClick={() => {
                activeButton1("incoming");
                // fetchDataFromDatabase("incoming");
              }}
              className={activeButton === "incoming" ? css.activeButton : ""}
            >
              Орж ирсэн дуудлагууд
            </button>
            <button
              onClick={() => {
                activeButton1("outgoing");
                // fetchDataFromDatabase("outgoing");
              }}
              className={activeButton === "outgoing" ? css.activeButton : ""}
            >
              Гарсан дуудлагууд
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={css.importForm}>
              <Form.Item label="Дугаараар:" name="usernumber">
                <Input
                  type="text"
                  name="usernumber"
                  onChange={handleInput}
                  value={user.usernumber}
                />
              </Form.Item>

              <Form.Item label="Он сараар:" name="username">
                <Space direction="vertical">
                  <DatePicker
                    onChange={onChange}
                    // value={user.date}
                    picker="month"
                  />
                </Space>
              </Form.Item>
            </div>
            <button
              className={css.searchButton}
              type="submit"
              icon={<SearchOutlined />}
            >
              Хайх
            </button>
          </form>
        </div>
      </div>
      <div className={css.nextContain}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};
export default Dashboard;
