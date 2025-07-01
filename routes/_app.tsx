import { h, Fragment } from "preact";
import { type PageProps } from "$fresh/server.ts";
import Nav from "../islands/Nav.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>daisyui202507050418denofresh</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="flex flex-col min-h-screen">
          {/* 手機版：Nav 在上方 */}
          <nav class="bg-gray-100 p-4">
            <Nav />
          </nav>

          {/* 內容區 */}
          <main class="flex-1 p-4">
            <Component />
          </main>
        </div>
      </body>
    </html>
  );
}
