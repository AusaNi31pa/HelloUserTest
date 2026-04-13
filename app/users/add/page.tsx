"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditUserPage() {
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [avatar, setAvatar] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			router.push("/login");
		}
	}, []);

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();

		try {
			const raw = localStorage.getItem("helloUsers");
			const list = raw ? JSON.parse(raw) : [];

			const newUser = {
				id: Date.now(),
				name,
				email,
				phone,
				avatar,
			};

			const updated = [newUser, ...list];

			localStorage.setItem("helloUsers", JSON.stringify(updated));

			alert("Saved successfully!");
			router.push("/users");
		} catch (error) {
			console.error(error);
			alert("Something went wrong");
		}
	}

	function handleCancel() {
		router.back();
	}

	return (
		<div className="min-h-screen p-20 bg-[radial-gradient(400px_400px_at_10%_20%,_rgba(169,211,239,0.8)_0%,_transparent_80%),radial-gradient(350px_350px_at_90%_15%,_rgba(169,211,239,0.55)_0%,_transparent_80%),radial-gradient(450px_450px_at_20%_80%,_rgba(169,211,239,0.45)_0%,_transparent_80%),radial-gradient(300px_300px_at_85%_75%,_rgba(169,211,239,0.55)_0%,_transparent_80%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)] flex items-start justify-center">
			<div className="w-[640px] max-w-[calc(100%_-_48px)] bg-white/95 rounded-xl p-8 shadow-[0_20px_40px_rgba(169,211,239,0.4),_0_6px_18px_rgba(169,211,239,0.4)]">
				<h1 className="text-3xl font-bold text-sky-800 text-center tracking-wider">
					ADD USER
				</h1>

				<div className="flex flex-col items-center mt-6">
					<div className="w-28 h-28 rounded-full overflow-hidden bg-sky-500 flex items-center justify-center text-white text-3xl font-semibold">
						{avatar ? (
							<Image
								src={avatar}
								alt="avatar"
								width={112}
								height={112}
								className="w-full h-full object-cover"
							/>
						) : (
							name?.charAt(0)
						)}
					</div>

					<input
						className="mt-2 text-sm px-2 py-1 rounded-full border border-2 text-[#099DFD] border-[#099DFD] placeholder:text-[#099DFD] focus:border-[#099DFD] focus:shadow-[0_6px_18px_rgba(169,211,239,0.4)] focus:outline-none"
						placeholder="Paste avatar URL"
						value={avatar}
						onChange={(e) => setAvatar(e.target.value)}
					/>
				</div>

				<form
					onSubmit={handleSave}
					className="mt-8 flex flex-col items-center gap-4"
				>
					<div className="w-full max-w-[520px]">
						<label className="relative block">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#099DFD]">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
									<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
									<circle cx="12" cy="7" r="4" />
								</svg>
							</span>
							<input
								className="w-full pl-12 pr-4 py-3 rounded-full border-2 text-[#099DFD] border-[#099DFD] placeholder:text-[#099DFD] focus:border-[#099DFD] focus:shadow-[0_6px_18px_rgba(169,211,239,0.4)] focus:outline-none"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Name"
								required
							/>
						</label>
					</div>

					<div className="w-full max-w-[520px]">
						<label className="relative block">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#099DFD]">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
									<path d="M4 4h16v16H4z" />
									<path d="M22 6l-10 7L2 6" />
								</svg>
							</span>
							<input
								className="w-full pl-12 pr-4 py-3 rounded-full border-2 text-[#099DFD] border-[#099DFD] placeholder:text-[#099DFD] focus:border-[#099DFD] focus:shadow-[0_6px_18px_rgba(169,211,239,0.4)] focus:outline-none"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email"
								type="email"
								required
							/>
						</label>
					</div>

					<div className="w-full max-w-[520px]">
						<label className="relative block">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#099DFD]">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
									<path d="M22 16.92V21a1 1 0 0 1-1.11 1 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2 3.11 1 1 0 0 1 3 2h4.09a1 1 0 0 1 1 .75c.12.65.35 1.35.69 2.06a1 1 0 0 1-.24 1L7.91 8.09a12.07 12.07 0 0 0 6 6l1.28-1.28a1 1 0 0 1 1-.24c.71.34 1.41.57 2.06.69a1 1 0 0 1 .75 1V21z" />
								</svg>
							</span>
							<input
								className="w-full pl-12 pr-4 py-3 rounded-full border-2 text-[#099DFD] border-[#099DFD] placeholder:text-[#099DFD] focus:border-[#099DFD] focus:shadow-[0_6px_18px_rgba(169,211,239,0.4)] focus:outline-none"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="Phone"
							/>
						</label>
					</div>

					<div className="mt-4 flex gap-4">
						<button type="submit" className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#056aa8] to-[#5db8f0] shadow-md">
							Save
						</button>
						<button type="button" onClick={handleCancel} className="px-6 py-2 rounded-full bg-gray-300 text-gray-700">
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}