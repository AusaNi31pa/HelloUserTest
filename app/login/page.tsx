"use client";

import { useState } from "react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		try {
			const raw = localStorage.getItem("helloUsers");
			if (raw) {
				const list = JSON.parse(raw);

				const found = list.find(
					(u: any) =>
						u.email === email &&
						(u.password ? u.password === password : true)
				);

				if (found) {
					alert("Login success (local)!");
					console.log("User:", found);

					localStorage.setItem("token", "local-login");

					window.location.href = "/users";
					return;
				}
			}

			const res = await fetch("https://reqres.in/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": "pro_a62b3b9f3f428bdaf5ab67979ac1384a959981b98690ed8e2ff8a1af0f905678"
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				alert("Login success!");
				console.log("Token:", data.token);

				localStorage.setItem("token", data.token);

				window.location.href = "/users";
			} else {
				alert(data.error);
			}
		} catch (error) {
			console.error(error);
			alert("Something went wrong");
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[radial-gradient(400px_400px_at_10%_20%,_rgba(169,211,239,0.8)_0%,_transparent_80%),radial-gradient(350px_350px_at_90%_15%,_rgba(169,211,239,0.55)_0%,_transparent_80%),radial-gradient(450px_450px_at_20%_80%,_rgba(169,211,239,0.45)_0%,_transparent_80%),radial-gradient(300px_300px_at_85%_75%,_rgba(169,211,239,0.55)_0%,_transparent_80%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)]">
			<div className="w-[550px] h-[500px] bg-white/95 rounded-xl p-9 shadow-[0_20px_40px_rgba(169,211,239,0.4),_0_6px_18px_rgba(169,211,239,0.4)] text-center">
				<h1 className="m-5 mb-10 text-5xl tracking-widest text-[#005A94] font-semibold">LOGIN</h1>

				<form className="flex flex-col gap-10 items-center" onSubmit={handleSubmit}>
					<label className="relative w-full max-w-[380px] block">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-[#099DFD]" aria-hidden>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="M4 4h16v16H4z" fill="none" />
								<path d="M22 6l-10 7L2 6" />
							</svg>
						</span>
						<input
							className="w-full pl-12 pr-4 py-3 rounded-[22px] border-2 border-[#099DFD] bg-white/80 text-xl text-[#099DFD] placeholder:text-[#099DFD] focus:border-[#0284c7] focus:shadow-[0_6px_18px_rgba(169,211,239,0.4)] focus:outline-none"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>

					<label className="relative w-full max-w-[380px] block">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-[#099DFD]" aria-hidden>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
								<rect x="3" y="11" width="18" height="11" rx="2" />
								<path d="M7 11V7a5 5 0 0 1 10 0v4" />
							</svg>
						</span>
						<input
							className="w-full pl-12 pr-4 py-3 rounded-[22px] border-2 border-[#099DFD] bg-white/80 text-xl text-[#099DFD] placeholder:text-[#099DFD] focus:border-[#099DFD] focus:shadow-[0_6px_18px_rgba(169,211,239,0.4)] focus:outline-none"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>

					<button className="mt-1 w-[220px] py-3 rounded-full text-white text-2xl font-semibold bg-gradient-to-r from-[#056aa8] to-[#5db8f0] shadow-[0_8px_18px_rgba(5,106,168,0.18)]" type="submit">
						login
					</button>
				</form>

				<a className="block mt-4 text-[#5892B8] text-2xl font-semibold hover:underline" href="/register">
					create account
				</a>
			</div>
		</div>
	);
}