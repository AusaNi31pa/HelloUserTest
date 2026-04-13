"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserCard from "../../components/UserCard";

type User = { id: number; name: string; email: string; avatar?: string; phone?: string };

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = useMemo(() => {
    if (!query) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase()) ||
        (u.phone || "").toLowerCase().includes(query.toLowerCase())
    );
  }, [query, users]);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      router.push("/login");
      return;
    }
  }, [router]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const [res1, res2] = await Promise.all([
          fetch("https://reqres.in/api/users?page=1", {
            headers: {
              "x-api-key": "pro_a62b3b9f3f428bdaf5ab67979ac1384a959981b98690ed8e2ff8a1af0f905678",
            },
          }),
          fetch("https://reqres.in/api/users?page=2", {
            headers: {
              "x-api-key": "pro_a62b3b9f3f428bdaf5ab67979ac1384a959981b98690ed8e2ff8a1af0f905678",
            },
          }),
        ]);

        const data1 = await res1.json();
        const data2 = await res2.json();

        let mapped: User[] = [];

        const allData = [...(data1?.data || []), ...(data2?.data || [])];

        if (allData.length > 0) {
          mapped = allData.map((u: any) => ({
            id: u.id,
            name: `${u.first_name} ${u.last_name}`,
            email: u.email,
            avatar: u.avatar,
            phone: "-",
          }));
        }

        const raw = localStorage.getItem("helloUsers");
        if (raw) {
          const local = JSON.parse(raw);

          mapped = mapped.map((apiUser) => {
            const found = local.find((l: any) => String(l.id) === String(apiUser.id));
            return found ? { ...apiUser, ...found } : apiUser;
          });

          const extra = local.filter(
            (l: any) => !mapped.find((m) => String(m.id) === String(l.id))
          );

          mapped = [...extra, ...mapped];
        }

        setUsers(mapped);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUsers();
  }, []);

  function handleAdd() {
    router.push("/users/add");
  }

  function handleEdit(id: number) {
    router.push(`/users/edit/${id}`);
  }

  function openDelete(user: User) {
    setSelectedUser(user);
    setShowDelete(true);
  }

  function closeModal() {
    setShowDelete(false);
    setSelectedUser(null);
  }

  async function confirmDelete() {
    if (!selectedUser) return closeModal();

    try {
      await fetch(`https://reqres.in/api/users/${selectedUser.id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": "pro_a62b3b9f3f428bdaf5ab67979ac1384a959981b98690ed8e2ff8a1af0f905678",
        },
      });

      const raw = localStorage.getItem("helloUsers");
      if (raw) {
        const list = JSON.parse(raw);
        const updated = list.filter((u: any) => u.id !== selectedUser.id);
        localStorage.setItem("helloUsers", JSON.stringify(updated));
      }

      setUsers((s) => s.filter((u) => u.id !== selectedUser.id));
    } catch (err) {
      console.error(err);
    }

    closeModal();
  }

  return (
    <div className="min-h-screen p-6 bg-[radial-gradient(400px_400px_at_10%_20%,_rgba(169,211,239,0.8)_0%,_transparent_80%),radial-gradient(350px_350px_at_90%_15%,_rgba(169,211,239,0.55)_0%,_transparent_80%),radial-gradient(450px_450px_at_20%_80%,_rgba(169,211,239,0.45)_0%,_transparent_80%),radial-gradient(300px_300px_at_85%_75%,_rgba(169,211,239,0.55)_0%,_transparent_80%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#005A94] flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21a8 8 0 1 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-sky-800">List User</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                aria-label="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-[450px] max-w-[40vw] pl-4 pr-10 py-2 rounded-full border-2 border-sky-300 bg-white/80 placeholder:text-sky-400 focus:outline-none"
                placeholder="Search"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-full bg-sky-800 text-white hover:bg-sky-700"
            >
              +Add User
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-18 gap-y-10">
          {filtered.map((u) => (
            <UserCard
              key={u.id}
              name={u.name}
              email={u.email}
              phone={u.phone || "-"}
              avatar={u.avatar}
              onEdit={() => handleEdit(u.id)}
              onDelete={() => openDelete(u)}
            />
          ))}
        </div>

        {showDelete && (
          <>
            <div
              className="fixed inset-0 bg-white/60 backdrop-blur-sm z-40"
              onClick={closeModal}
            />

            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[min(560px,90%)] p-9 rounded-xl shadow-2xl text-center z-50">
              <h2 className="text-2xl text-[#0b5c80] tracking-wide font-bold mb-1">
                CONFIRM DELETE
              </h2>
              <p className="text-3xl text-[#0b9bf0] font-semibold mb-6">
                Are You Sure?
              </p>

              <p className="text-sm text-sky-600 mb-6">
                {selectedUser
                  ? `Delete user "${selectedUser.name}" (${selectedUser.email})`
                  : ""}
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  className="min-w-[120px] px-6 py-3 rounded-full bg-red-500 text-white text-base"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  className="min-w-[120px] px-6 py-3 rounded-full bg-gray-400 text-white text-base"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}