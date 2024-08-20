import { http, HttpResponse } from "msw";

export const mockTopics = [
  {
    id: 1,
    content: "this is the topic",
    createdAt: "2024-08-11T08:33:27.135Z",
    updatedAt: "2024-08-11T08:33:27.135Z",
  },
  {
    id: 2,
    content: "comment",
    createdAt: "2024-08-11T08:35:27.121Z",
    updatedAt: "2024-08-11T08:35:27.121Z",
  },
];

const topicHandlers = [
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

    return HttpResponse.json(newTopic, { status: 200 });
  }),
  http.get<{
    content: string;
  }>("http://localhost:3000/topic", async ({ request }) => {
    const search = new URL(request.url).searchParams.get("search");

    const filteredTopics = search ? mockTopics.filter((topic) => topic.content.includes(search)) : mockTopics;

    return HttpResponse.json(filteredTopics, { status: 200 });
  }),
];

const commentHandlers = [
  http.put<{
    content: string;
  }>("http://localhost:3000/topic/25/comment", async ({ request }) => {
    const comment = (await request.json()) as { author: string; content: string };

    if (!comment.content || !comment.author) {
      return HttpResponse.json({ error: "Content and author are required" }, { status: 400 });
    }

    const newComment = {
      id: 1,
      topicId: 25,
      author: comment.author,
      content: comment.content,
      rating: 0,
      parentId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(newComment, { status: 200 });
  }),
];

export const handlers = [...topicHandlers, ...commentHandlers];
