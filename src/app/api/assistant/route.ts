import { NextResponse } from "next/server";
import {
  buildAssistantSystemPrompt,
  parseAssistantJson,
  recommendLocally,
} from "@/lib/assistant";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string; history?: ChatMessage[] };
    const message = body.message?.trim();

    if (!message || message.length > 800) {
      return NextResponse.json({ error: "Mensaje inválido." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const history = (body.history ?? []).slice(-6);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
          temperature: 0.4,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: buildAssistantSystemPrompt() },
            ...history.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: message },
          ],
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const content = data.choices?.[0]?.message?.content ?? "";
        const parsed = parseAssistantJson(content);
        if (parsed) {
          return NextResponse.json({ ...parsed, source: "openai" });
        }
      }
    }

    const local = recommendLocally(message);
    return NextResponse.json({ ...local, source: "local" });
  } catch {
    return NextResponse.json(
      { error: "No pudimos procesar tu consulta. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
