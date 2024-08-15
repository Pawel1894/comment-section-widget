import { http, HttpResponse } from "msw";

export const handlers = [
  http.put<{
    content: string;
  }>("http://localhost:3000/topic", async ({ request }) => {
    const topic = (await request.json()) as { content: string };

    if (!topic.content) {
      return HttpResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const newTopic = {
      id: 1,
      content: topic.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json([newTopic], { status: 201 });
  }),
];
