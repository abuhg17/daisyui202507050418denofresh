import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req) {
    return new Response(
      JSON.stringify({
        message: "Hello World.",
        message2: "こんにちは、世界。",
        message3: "世界，你好!",
      }),
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  },
};
