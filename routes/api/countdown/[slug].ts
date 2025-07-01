import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const slug = ctx.params.slug;

    if (!slug || slug.length < 12) {
      return new Response(
        JSON.stringify({
          error: "Invalid slug. Format should be: YYYYMMDDHHMM",
        }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          status: 400,
        }
      );
    }

    // 轉換為 ISO 格式並指定台北時區（+08:00）
    const slugISO =
      slug.slice(0, 4) +
      "-" + // YYYY-
      slug.slice(4, 6) +
      "-" + // MM-
      slug.slice(6, 8) +
      "T" + // DD + T
      slug.slice(8, 10) +
      ":" + // HH:
      slug.slice(10, 12) +
      ":00+08:00"; // MM:00 + 時區

    const now = new Date();
    const next = new Date(slugISO);

    const diffMs = next.getTime() - now.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    let remaining = diffSec;
    const diffday = Math.floor(remaining / 86400);
    remaining -= diffday * 86400;

    const diffhour = Math.floor(remaining / 3600);
    remaining -= diffhour * 3600;

    const diffminute = Math.floor(remaining / 60);
    const diffsecond = remaining % 60;

    return new Response(
      JSON.stringify({
        slug,
        now,
        slugISO,
        next,
        diffMs,
        diffday,
        diffhour,
        diffminute,
        diffsecond,
      }),
      {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  },
};
