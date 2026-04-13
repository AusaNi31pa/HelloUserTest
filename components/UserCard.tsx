"use client";

import React from "react";
import Image from "next/image";

type Props = {
  name: string;
  email: string;
  phone?: string;
  avatar?: string; 
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function UserCard({ name, email, phone, avatar, onEdit, onDelete }: Props) {
  return (
    <div className="relative bg-white rounded-xl p-8 w-75 shadow-md shadow-[#A9D3EF] border border-white/60">
      <div className="absolute right-3 top-3 flex gap-2">
        <button onClick={onEdit} aria-label="edit" className="p-1 rounded bg-white/80 hover:bg-blue-50 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21v-3l11-11 3 3L6 21H3z" />
          </svg>
        </button>
        <button onClick={onDelete} aria-label="delete" className="p-1 rounded bg-white/80 hover:bg-red-50 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h18" />
            <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
            <path d="M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-22 h-22 rounded-full bg-sky-300 flex items-center justify-center text-white text-3xl font-semibold overflow-hidden">
          {avatar ? (
            <Image
              src={avatar}
              alt="avatar"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            name?.charAt(0)
          )}
        </div>

        <div className="flex-1 text-left">
          <div className="font-semibold text-sky-800 text-lg">{name}</div>
        </div>
      </div>

      <div className="mt-4 text-base text-sky-700 space-y-2">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16v16H4z" />
            <path d="M22 6l-10 7L2 6" />
          </svg>
          <span className="truncate text-base">{email}</span>
        </div>

        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92V21a1 1 0 0 1-1.11 1 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2 3.11 1 1 0 0 1 3 2h4.09a1 1 0 0 1 1 .75c.12.65.35 1.35.69 2.06a1 1 0 0 1-.24 1L7.91 8.09a12.07 12.07 0 0 0 6 6l1.28-1.28a1 1 0 0 1 1-.24c.71.34 1.41.57 2.06.69a1 1 0 0 1 .75 1V21z" />
          </svg>
          <span className="text-base">{phone ?? "-"}</span>
        </div>
      </div>
    </div>
  );
}