import { useEffect, useState } from "preact/hooks";

interface CountdownApi {
  diffday: number;
  diffhour: number;
  diffminute: number;
  diffsecond: number;
  slugISO: string;
}

export default function CountdownTimer() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 載入 API
  useEffect(() => {
    setLoading(true);
    fetch("/api/countdown/202507050418")
      .then((res) => {
        if (!res.ok) throw new Error("API 載入失敗");
        return res.json();
      })
      .then((data: CountdownApi) => {
        setTotalSeconds(
          data.diffday * 86400 +
            data.diffhour * 3600 +
            data.diffminute * 60 +
            data.diffsecond
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "未知錯誤");
        setLoading(false);
      });
  }, []);

  // 每秒倒數
  useEffect(() => {
    if (loading || error) return;
    if (totalSeconds <= 0) return;
    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, error, totalSeconds]);

  // 分解
  const day = Math.floor(totalSeconds / 86400);
  const hour = Math.floor((totalSeconds % 86400) / 3600);
  const minute = Math.floor((totalSeconds % 3600) / 60);
  const second = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  if (loading) {
    return (
      <div class="text-center text-white">
        <div class="text-2xl">載入中...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div class="text-center text-red-300">
        <div class="text-2xl">錯誤: {error}</div>
      </div>
    );
  }

  return (
    <div class="card shadow-xl bg-black bg-opacity-80 text-white w-max px-10 py-6 rounded-lg">
      <h2 class="card-title text-4xl font-semibold mb-6 text-center tracking-widest select-none">
        倒數計時
      </h2>
      {totalSeconds > 0
        ? (
          <p class="font-mono tracking-wide select-none text-3xl sm:text-4xl md:text-5xl flex gap-6 justify-center items-center whitespace-nowrap">
            <span>{pad(day)}天</span>
            <span>{pad(hour)}時</span>
            <span>{pad(minute)}分</span>
            <span>{pad(second)}秒</span>
          </p>
        )
        : (
          <p class="text-3xl text-yellow-400 font-bold text-center animate-pulse">
            🎉 時間已結束！
          </p>
        )}
    </div>
  );
}