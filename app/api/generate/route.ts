import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    const response = await fetch(`https://api.edenai.run/v2/text/generation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EDENAI_API_KEY}`,
      },
      body: JSON.stringify({
        providers: "cohere",
        text: `Tell me ${question}`,
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });
    const data = await response.json();

    const success = data?.cohere?.status === "success";

    if (!success) {
      throw new Error("Could not get answer from Eden AI");
    }

    const aiAnswer = data?.cohere?.generated_text;
    return NextResponse.json({ aiAnswer });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message });
  }
}
