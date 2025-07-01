import { h } from "preact";
import CountdownTimer from "../islands/CountdownTimer.tsx";

export default function CountdownPage() {
  return (
    <div>
      <h1>This is Countdown Page.</h1>
      <h2>First, fetch /api/countdown/202507050418 once.</h2>
      <h2>Second, setInterval every one sec.</h2>
      <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-800 via-black to-indigo-900 p-6">
        <div class="flex flex-col items-center gap-8 max-w-4xl w-full">
          {/* 警示卡片群 */}
          <div class="flex flex-wrap justify-center gap-6">
            {/* ...這裡放你的所有卡片SVG與內容，直接複製你的HTML即可... */}
            {/* 省略，請將你的卡片內容貼上 */}
          </div>
          <div class="flex flex-wrap justify-center gap-6">
            {/* ...這裡放你的所有連結卡片，直接複製你的HTML即可... */}
            {/* 省略，請將你的卡片內容貼上 */}
          </div>
          {/* 正式起跑敘述 */}
          <div class="text-center text-yellow-300 space-y-2 px-4 max-w-xl">
            <p class="text-2xl font-bold tracking-widest">
              🕓 2025/07/05 04:18 三災八難正式啟動
            </p>
            <p class="text-lg leading-relaxed text-pink-200">
              🌿辯證邏輯：沒事發生世人皆不信因果，所以要有事發生
              <br />
              🌿辯證邏輯：沒事發生第十二屆臺北市長將不信因果，所以有事發生將使得草包鋒兄延續相信因果
              <br />
              ☄️下元甲子:至2043
              <br />
              ☄️三界六道抓交替
              <br />
              ☄️考核標準:人心
              <br />
              ☄️1923:1%人口(基準點)
              <br />
              ☄️2025:?%人口(上界如何看待下界的衡量點)
              <br />
              ☄️1999:0.5%人口(基準點)
              <br />
              ☄️2025:?%人口(上界如何看待下界的衡量點)
              <br />
              ☄️房子防自然不防超自然
              <br />
              ☄️1850:牛樹梅(基準點)
              <br />
              ☄️2025:第1屆至第8屆臺北市長?(上界如何看待下界的衡量點)
              <br />
              ☄️2038:第12屆臺北市長?(草包鋒兄?)
              <br />
              ☄️202507050418取代20250726:超自然大罷免
              <br />
            </p>
          </div>
          <div class="text-center text-yellow-300 space-y-2 px-4 max-w-xl">
            <p class="text-2xl font-bold tracking-widest">
              🕓 2025/07/05 04:18 鋒兄不虛偽
            </p>
            {/* ...這裡放你的所有連結... */}
          </div>
          {/* 倒數計時卡片 */}
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
}
