const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");
require("dotenv").config();

// OpenAI 클라이언트 설정
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /chat 요청 처리
router.post("/", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "너는 일반 성인의 지식을 가지고 대화를 잘 할 수 있는 사람이야야",
        },
        { role: "user", content: "일상대화를 주제야" },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("❗ OpenAI Error:", err);
    res.status(500).json({ error: "GPT 응답 실패" });
  }
});

module.exports = router;
