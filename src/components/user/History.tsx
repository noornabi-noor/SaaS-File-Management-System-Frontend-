"use client";

import { useEffect, useState } from "react";
import { UserSubscriptionService } from "@/services/userSubscription.service";

interface HistoryType {
  id: string;
  packageName: string;
  startDate: string;
  endDate: string | null;
}

export default function History() {
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await UserSubscriptionService.getHistory();

      // Unwrap .data safely
      const historyData = Array.isArray(res?.data) ? res.data : [];

      // Map backend structure to frontend HistoryType
      const mappedHistory: HistoryType[] = historyData.map(
        (item: any) => ({
          id: item.id,
          packageName: item.package?.name || "Unknown",
          startDate: item.startDate,
          endDate: item.endDate,
        })
      );

      setHistory(mappedHistory);
    } catch (err: any) {
      console.error("Failed to fetch history:", err.message);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading subscription history...
        </p>
      </div>
    );

  if (!history.length)
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 dark:text-gray-400">No subscription history found.</p>
      </div>
    );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Subscription History</h2>
      <div className="space-y-2">
        {history.map((item: HistoryType) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <p className="font-medium text-gray-800 dark:text-gray-200">{item.packageName}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {new Date(item.startDate).toLocaleDateString()} -{" "}
              {item.endDate ? new Date(item.endDate).toLocaleDateString() : "Current"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}




// "use client";

// import { useEffect, useState } from "react";
// import { UserSubscriptionService } from "@/services/userSubscription.service";

// interface HistoryType {
//   id: string;
//   packageName: string;
//   startDate: string;
//   endDate: string | null;
// }

// export default function History() {
//   const [history, setHistory] = useState<HistoryType[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchHistory = async () => {
//     setLoading(true);
//     try {
//       const res = await UserSubscriptionService.getHistory();

//       // FIX: unwrap .data, and ensure it’s an array
//       const historyData = Array.isArray(res?.data) ? res.data : [];
//       setHistory(
//         historyData.map((item) => ({
//           id: item.id,
//           packageName: item.package?.name || "Unknown",
//           startDate: item.startDate,
//           endDate: item.endDate,
//         }))
//       );
//     } catch (err: any) {
//       console.error("Failed to fetch history:", err.message);
//       setHistory([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-48">
//         <p className="text-gray-500 dark:text-gray-400 animate-pulse">
//           Loading subscription history...
//         </p>
//       </div>
//     );

//   if (!history.length)
//     return (
//       <div className="flex justify-center items-center h-48">
//         <p className="text-gray-500 dark:text-gray-400">No subscription history found.</p>
//       </div>
//     );

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-semibold">Subscription History</h2>
//       <div className="space-y-2">
//         {history.map((item) => (
//           <div
//             key={item.id}
//             className="border p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//           >
//             <p className="font-medium text-gray-800 dark:text-gray-200">{item.packageName}</p>
//             <p className="text-gray-600 dark:text-gray-400 text-sm">
//               {new Date(item.startDate).toLocaleDateString()} -{" "}
//               {item.endDate ? new Date(item.endDate).toLocaleDateString() : "Current"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }