import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const channelIdsParam = ctx.params.channelIds;
    const apikey = "AIzaSyAUD7ipwX-VAIIgbtw4V6sHKOTfyWoPdMo";

    if (!channelIdsParam) {
      return new Response(
        JSON.stringify({ error: "請提供 channelIds 參數（可用逗號分隔多個）" }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          status: 400,
        }
      );
    }

    const channelIds = channelIdsParam
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    if (channelIds.length === 0 || channelIds.length > 50) {
      return new Response(
        JSON.stringify({ error: "頻道 ID 數量需介於 1 到 50 之間" }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          status: 400,
        }
      );
    }

    try {
      const url = new URL("https://www.googleapis.com/youtube/v3/channels");
      url.searchParams.append("part", "snippet,statistics");
      url.searchParams.append("id", channelIds.join(","));
      url.searchParams.append("key", apikey);

      const res = await fetch(url.toString());
      const data = await res.json();

      const items = data?.items || [];

      if (items.length === 0) {
        return new Response(JSON.stringify({ error: "找不到任何頻道資料" }), {
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
          error: "無法取得頻道資料",
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
