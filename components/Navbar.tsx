"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <header className="w-full bg-sky-100 border-b border-sky-200">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="#" onClick={(e) => e.preventDefault()} className="block">
            <img src="/images/Logo_HelloUser.png" alt="HelloUser logo" className="w-10 h-10 rounded-full object-cover" />
          </a>
          <div className="text-[#005A94] font-semibold text-2xl">HelloUser</div>
        </div>

        <div>
          <button onClick={handleLogout} className="px-3 py-1 rounded-full bg-rose-200 text-rose-800 hover:bg-rose-100">Logout</button>
        </div>
      </div>
    </header>
  );
}