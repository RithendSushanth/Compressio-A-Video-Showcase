// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useClerk, useUser } from "@clerk/nextjs";
// import {
//   LogOutIcon,
//   MenuIcon,
//   LayoutDashboardIcon,
//   Share2Icon,
//   UploadIcon,
//   ImageIcon,
// } from "lucide-react";

// const sidebarItems = [
//   { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
//   { href: "/social-share", icon: Share2Icon, label: "Social Share" },
//   { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
// ];

// export default function AppLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { signOut } = useClerk();
//   const { user } = useUser();

//   const handleLogoClick = () => {
//     router.push("/");
//   };

//   const handleSignOut = async () => {
//     await signOut();
//   };

//   return (
//     <div className="drawer lg:drawer-open min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
//       <input
//         id="sidebar-drawer"
//         type="checkbox"
//         className="drawer-toggle"
//         checked={sidebarOpen}
//         onChange={() => setSidebarOpen(!sidebarOpen)}
//       />
//       <div className="drawer-content flex flex-col">
//         {/* Navbar */}
//         <header className="w-full bg-gray-900">
//           <div className="navbar max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center">
//             <div className="flex-none lg:hidden">
//               <label
//                 htmlFor="sidebar-drawer"
//                 className="btn btn-square btn-ghost drawer-button text-white"
//               >
//                 <MenuIcon />
//               </label>
//             </div>
//             <div className="flex-1">
//               <Link href="/" onClick={handleLogoClick}>
//                 <div className="btn btn-ghost normal-case text-xl lg:text-2xl font-bold tracking-tight cursor-pointer text-white">
//                   Compressio: A Showcase
//                 </div>
//               </Link>
//             </div>
//             <div className="flex-none flex items-center space-x-4">
//               {user && (
//                 <>
//                   <div className="avatar">
//                     <div className="w-8 h-8 rounded-full">
//                       <img
//                         src={user.imageUrl}
//                         alt={
//                           user.username || user.emailAddresses[0].emailAddress
//                         }
//                         className="rounded-full"
//                       />
//                     </div>
//                   </div>
//                   <span className="text-sm truncate max-w-xs lg:max-w-md">
//                     {user.username || user.emailAddresses[0].emailAddress}
//                   </span>
//                   <button
//                     onClick={handleSignOut}
//                     className="btn btn-ghost btn-circle text-white"
//                   >
//                     <LogOutIcon className="h-6 w-6" />
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </header>
//         {/* Page content */}
//         <main className="flex-grow">
//           <div className="max-w-full lg:max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
//             {children}
//           </div>
//         </main>
//       </div>
//       <div className="drawer-side">
//         <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
//         <aside className="bg-gray-900 text-white w-64 h-full flex flex-col">
//           <div className="flex items-center justify-center py-4">
//             <ImageIcon className="w-10 h-10 text-secondary" />
//           </div>
//           <ul className="menu p-4 w-full text-base-content flex-grow">
//             {sidebarItems.map((item) => (
//               <li key={item.href} className="mb-2">
//                 <Link
//                   href={item.href}
//                   className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
//                     pathname === item.href
//                       ? "bg-secondary text-white"
//                       : "hover:bg-gray-700"
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <item.icon className="w-6 h-6" />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           {user && (
//             <div className="p-4">
//               <button
//                 onClick={handleSignOut}
//                 className="btn btn-outline btn-error w-full"
//               >
//                 <LogOutIcon className="mr-2 h-5 w-5" />
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
  UserIcon, // Import a user icon for sign-in
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, openSignIn } = useClerk(); // Added openSignIn
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignInClick = () => {
    router.push('/sign-in') // Opens the sign-in modal or redirects to sign-in page
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <header className="w-full bg-gray-900">
          <div className="navbar max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost drawer-button text-white"
              >
                <MenuIcon />
              </label>
            </div>
            <div className="flex-1">
              <Link href="/" onClick={handleLogoClick}>
                <div className="btn btn-ghost normal-case text-xl lg:text-2xl font-bold tracking-tight cursor-pointer text-white">
                  Compressio: A Showcase
                </div>
              </Link>
            </div>
            <div className="flex-none flex items-center space-x-4">
              {user ? (
                <>
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full">
                      <img
                        src={user.imageUrl}
                        alt={
                          user.username || user.emailAddresses[0].emailAddress
                        }
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm truncate max-w-xs lg:max-w-md">
                    {user.username || user.emailAddresses[0].emailAddress}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="btn btn-ghost btn-circle text-white"
                  >
                    <LogOutIcon className="h-6 w-6" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSignInClick}
                  className="btn btn-ghost text-white flex items-center space-x-2"
                >
                  <UserIcon className="h-6 w-6" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-grow">
          <div className="max-w-full lg:max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-gray-900 text-white w-64 h-full flex flex-col">
          <div className="flex items-center justify-center py-4">
            <ImageIcon className="w-10 h-10 text-secondary" />
          </div>
          <ul className="menu p-4 w-full text-base-content flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
                    pathname === item.href
                      ? "bg-secondary text-white"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {user && (
            <div className="p-4">
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error w-full"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
