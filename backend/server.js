const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const path = require("path");
const db = require("./controller/dbconnect");
const PORT = process.env.PORT;
const http = require("http");
const userRoutes = require("./routes/userRoutes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const { info, error } = require("console");
// app.use("/api", userRoutes);
dotenv.config({ path: "./config.env" });
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body);
  // console.log("aaaaaaaaaa");
  try {
    const userData = await db.query(
      "SELECT * FROM user WHERE `username` = ? ",
      [username]
    );

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй",
      });
    }
    const storedHashedPassword = userData[0].password;
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Нууц үг таарахгүй байна!!!",
      });
    }
    // const user = userData[0];
    // if (password !== user.password) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Нууц үг буруу байна",
    //   });
    // }
    const userWithoutPassword = { ...userData[0] };
    const role = userData[0].role;
    const name = userData[0].username;
    const token = jwt.sign(
      {
        userId: userWithoutPassword.id,
        username: userWithoutPassword.username,
      },
      "your_sercet_key",
      {
        expiresIn: "1h",
      }
    );
    console.log(token, name, role);
    return res.status(200).json({
      success: true,
      token: token,
      role: role,
      name: name,
    });
  } catch (error) {
    console.error("Нэвтрэх үед алдаа гарлаа:", error);
    return res.status(500).json({
      success: false,
      message: "Дотоод серверийн алдаа",
    });
  }
});
app.post("/register", async (req, res) => {
  const { username, email, password, comfirmPassword, role } = req.body;
  // console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO userRequest (username, email, password, role) VALUES (?,?,?,?)",
      [username, email, hashedPassword, role]
    );
    return res.status(201).json({
      success: true,
      message: "Хэрэглэгч амжилттай бүртгэгдлээ",
    });
  } catch (error) {
    console.error("Бүртгэл хийхэд алдаа гарлаа:", error);
    return res.status(500).json({
      success: false,
      message: "Дотоод серверийн алдаа",
    });
  }
});
app.post("/search", (req, res) => {
  const { usernumber, call, date } = req.body;
  // console.log(req.body);
  // console.log("aaaaa");
});
app.get("/getUserRequest", async (req, res) => {
  try {
    const registerData = await db.query("SELECT * FROM userRequest");
    return res.status(200).json({
      success: true,
      data: registerData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// const userWithoutPassword = { ...userData[0] };
// const { role } = userData[0];
// const { name } = userData[0];
// delete userWithoutPassword.password;
// const token = jwt.sign(
//   {
//     userId: userWithoutPassword.id,
//     username: userWithoutPassword.username,
//   },
//   "your_secret_key",
//   {
//     expiresIn: "1h",
//   }
// );
