import { useState, useEffect } from "preact/hooks";

interface Food {
  id: string;
  foodname: string;
  foodbrand: string;
  foodstore: string;
  foodprice: string;
  foodamount: string;
  fooddate: string;
}

export default function FirebaseFoodTable() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [sortKey, setSortKey] = useState<string>("");
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  // 資料獲取
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/firebasefood");
        const data = await response.json();
        setFoods(data.myvue3food || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setFoods([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // 點擊排序欄位切換排序
  function sort(key: string) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  // 顯示箭頭
  function arrow(key: string) {
    if (sortKey !== key) return "";
    return sortAsc ? "🔼" : "🔽";
  }

  // 輔助解析日期 YYYY-MM-DD 或 YYYY/MM/DD
  function parseYMDDate(str: string): number {
    if (typeof str !== "string") return 0;
    const normalized = str.replace(/\//g, "-");
    const parts = normalized.split("-");
    if (parts.length === 3) {
      const [y, m, d] = parts.map(Number);
      if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d).getTime();
      }
    }
    return 0;
  }

  // 排序資料
  const sortedFoods = (() => {
    if (!sortKey) return foods;

    return [...foods].sort((a, b) => {
      let v1 = a[sortKey as keyof Food];
      let v2 = b[sortKey as keyof Food];

      if (sortKey === "fooddate") {
        const t1 = parseYMDDate(v1);
        const t2 = parseYMDDate(v2);
        return sortAsc ? t1 - t2 : t2 - t1;
      }

      const n1 = parseFloat(v1);
      const n2 = parseFloat(v2);
      if (!isNaN(n1) && !isNaN(n2)) {
        return sortAsc ? n1 - n2 : n2 - n1;
      }

      return sortAsc
        ? String(v1).localeCompare(String(v2))
        : String(v2).localeCompare(String(v1));
    });
  })();

  return (
    <>
      {loading ? (
        <div class="text-center py-8">
          <p class="text-lg">載入中...</p>
        </div>
      ) : (
        <>
          <p class="mb-2">
            目前排序：<strong>{sortKey || "無"}</strong>
            {sortKey && (
              <span>{sortAsc ? " 🔼 升冪" : " 🔽 降冪"}</span>
            )}
          </p>

          <div class="overflow-x-auto">
            <table class="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-100">
                  <th class="border border-gray-300 px-4 py-2">#</th>
                  <th 
                    onClick={() => sort('foodname')} 
                    class="border border-gray-300 px-4 py-2 cursor-pointer select-none hover:bg-gray-200"
                  >
                    foodname <span>{arrow("foodname")}</span>
                  </th>
                  <th 
                    onClick={() => sort('foodbrand')} 
                    class="border border-gray-300 px-4 py-2 cursor-pointer select-none hover:bg-gray-200"
                  >
                    foodbrand <span>{arrow("foodbrand")}</span>
                  </th>
                  <th 
                    onClick={() => sort('foodstore')} 
                    class="border border-gray-300 px-4 py-2 cursor-pointer select-none hover:bg-gray-200"
                  >
                    foodstore <span>{arrow("foodstore")}</span>
                  </th>
                  <th 
                    onClick={() => sort('foodprice')} 
                    class="border border-gray-300 px-4 py-2 cursor-pointer select-none hover:bg-gray-200"
                  >
                    foodprice <span>{arrow("foodprice")}</span>
                  </th>
                  <th 
                    onClick={() => sort('foodamount')} 
                    class="border border-gray-300 px-4 py-2 cursor-pointer select-none hover:bg-gray-200"
                  >
                    foodamount <span>{arrow("foodamount")}</span>
                  </th>
                  <th 
                    onClick={() => sort('fooddate')} 
                    class="border border-gray-300 px-4 py-2 cursor-pointer select-none hover:bg-gray-200"
                  >
                    fooddate <span>{arrow("fooddate")}</span>
                  </th>
                  <th 
                    onClick={() => sort('id')} 
                    class="border border-gray-300 px-4 py-2 cursor-pointer select-none hover:bg-gray-200"
                  >
                    id <span>{arrow("id")}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedFoods.map((food, idx) => (
                  <tr key={food.id} class={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td class="border border-gray-300 px-4 py-2">{idx + 1}</td>
                    <td class="border border-gray-300 px-4 py-2">{food.foodname}</td>
                    <td class="border border-gray-300 px-4 py-2">{food.foodbrand}</td>
                    <td class="border border-gray-300 px-4 py-2">{food.foodstore}</td>
                    <td class="border border-gray-300 px-4 py-2">{food.foodprice}</td>
                    <td class="border border-gray-300 px-4 py-2">{food.foodamount}</td>
                    <td class="border border-gray-300 px-4 py-2">{food.fooddate}</td>
                    <td class="border border-gray-300 px-4 py-2">{food.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

