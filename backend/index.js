const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const chatRoute = require("./routes/chat");
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("✅ Sofia 백엔드 서버가 실행 중입니다.");
});

app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
