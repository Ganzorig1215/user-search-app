import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import { Button, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
const UserCheck = () => {
  const [userData, setUserData] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/getUserRequest");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sendFriendRequest = (userId) => {
    setFriendRequests([...friendRequests, userId]);
  };

  return (
    <div>
      <h3>Бүртгүүлсэн хэрэглэгчид</h3>
      <List
        dataSource={userData ? [userData.data[0]] : []}
        renderItem={(item) => (
          <List.Item>
            <div className={css.bigContain}>
              <div className={css.innerContain}>
                <UserOutlined />
                <p>{item.username}</p>
                <div>
                  <Button
                    onClick={() => sendFriendRequest(item.id)}
                    type="primary"
                  >
                    Зөвшөөрөх
                  </Button>
                  <Button onClick={() => sendFriendRequest(item.id)} type="">
                    Цуцлах
                  </Button>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserCheck;
