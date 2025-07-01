import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req) {
    const urlParam = new URL(req.url).searchParams.get("url");

    if (!urlParam) {
      return new Response(JSON.stringify({ error: "請提供 url 參數" }), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        status: 400,
      });
    }

    try {
      const response = await fetch(urlParam, {
        headers: {
          Referer: "https://www.bilibili.com/",
          // User-Agent 可以加上模擬瀏覽器，視需要
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      const headers = new Headers();
      if (contentType) {
        headers.set("Content-Type", contentType);
      }
      headers.set("Cache-Control", "public, max-age=86400");

      return new Response(response.body, { headers });
    } catch (err) {
      console.error("圖片代理失敗:", err);
      return new Response(
        JSON.stringify({ error: "圖片代理失敗", message: err.message }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          status: 500,
        }
      );
    }
  },
};
