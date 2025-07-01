import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const bvid = ctx.params.bvid;

    if (!bvid) {
      return new Response(JSON.stringify({ error: "請提供 bvid 參數" }), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        status: 400,
      });
    }

    try {
      const res = await fetch(
        `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const { pic, title, owner, stat, pages } = data.data;
      const raw = data.data;
      const newdata: Record<string, unknown> = {};
      for (const key in raw) {
        if (typeof raw[key] !== "object") {
          newdata[key] = raw[key];
        }
      }

      return new Response(
        JSON.stringify({
          pic,
          title,
          owner,
          stat,
          data: newdata,
          pages,
        }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
    } catch (error: any) {
      console.error("Error fetching Bilibili data:", error);
      return new Response(
        JSON.stringify({
          error: "無法取得 Bilibili 資料",
          message: error.message,
          status: error.response?.status || 500,
          response: error.response?.data || null,
        }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          status: error.response?.status || 500,
        }
      );
    }
  },
};
