// api/chat.js (Ready for Vercel Edge Functions)
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const userMessage = body.message;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "لا يوجد رد حالياً.";
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ reply: "حدث خطأ أثناء الاتصال بـ ChatGPT." });
  }
}
