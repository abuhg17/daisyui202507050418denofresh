import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const videoIdsParam = ctx.params.videoIds;
    const apikey = "AIzaSyAUD7ipwX-VAIIgbtw4V6sHKOTfyWoPdMo";

    if (!videoIdsParam) {
      return new Response(
        JSON.stringify({ error: "請提供 videoIds 參數（可用逗號分隔多個）" }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          status: 400,
        }
      );
    }

    const videoIds = videoIdsParam
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    if (videoIds.length === 0 || videoIds.length > 50) {
      return new Response(
        JSON.stringify({ error: "影片 ID 數量需介於 1 到 50 之間" }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          status: 400,
        }
      );
    }

    try {
      const url = new URL("https://www.googleapis.com/youtube/v3/videos");
      url.searchParams.append("part", "snippet,statistics");
      url.searchParams.append("id", videoIds.join(","));
      url.searchParams.append("key", apikey);

      const res = await fetch(url.toString());
      const data = await res.json();

      const items = data?.items || [];

      if (items.length === 0) {
        return new Response(JSON.stringify({ error: "找不到任何影片資料" }), {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          status: 404,
        });
      }

      return new Response(
        JSON.stringify({
          count: items.length,
          items,
        }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "無法取得影片資料",
          message: error.message,
          status: error.response?.status || null,
          response: error.response?.data || null,
        }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          status: 500,
        }
      );
    }
  },
};
