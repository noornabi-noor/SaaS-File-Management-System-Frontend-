// // UserLayout.tsx
// "use client";

// import { useState, ReactNode } from "react";
// import UserNavbar from "./UserNavbar";
// import UserFooter from "./UserFooter";
// import UserSidebar from "./UserSidebar";

// export default function UserLayout({
//   children,
// }: {
//   children: (activeTab: string, setActiveTab: (tab: string) => void) => ReactNode;
// }) {
//   const [open, setOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("dashboard"); // SPA tab state

//   return (
//     <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white">
//       {/* Sidebar */}
//       <UserSidebar
//         open={open}
//         setOpen={setOpen}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />

//       {/* Main content */}
//       <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
//         {/* Navbar */}
//         <UserNavbar setOpen={setOpen} />

//         {/* Page content */}
//         <main className="flex-1 p-6 md:ml-0">{children(activeTab, setActiveTab)}</main>

//         {/* Footer */}
//         <UserFooter />
//       </div>
//     </div>
//   );
// }








// // "use client";

// // import { useState } from "react";
// // import UserNavbar from "./UserNavbar";
// // import UserFooter from "./UserFooter";
// // import UserSidebar from "./UserSidebar";

// // export default function UserLayout({
// //   children,
// // }: {
// //   children: React.ReactNode; 
// // }) {
// //   const [open, setOpen] = useState(false);
// //   const [activeTab, setActiveTab] = useState("dashboard"); // SPA tab state

// //   return (
// //     <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white">
// //       {/* Sidebar */}
// //       <UserSidebar
// //         open={open}
// //         setOpen={setOpen}
// //         activeTab={activeTab}
// //         setActiveTab={setActiveTab}
// //       />

// //       {/* Main content */}
// //       <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
// //         {/* Navbar */}
// //         <UserNavbar setOpen={setOpen} />

// //         {/* Page content */}
// //         <main className="flex-1 p-6 md:ml-0">{children}</main>

// //         {/* Footer */}
// //         <UserFooter />
// //       </div>
// //     </div>
// //   );
// // }



"use client";

import { useState } from "react";
import UserSidebar from "./UserSidebar";

interface UserLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function UserLayout({
  children,
  activeTab,
  setActiveTab,
}: UserLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-950">
      <UserSidebar
        open={open}
        setOpen={setOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1">{children}</main>
    </div>
  );
}