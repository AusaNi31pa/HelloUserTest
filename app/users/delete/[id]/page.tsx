"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Page({ params }: { params: { id: string } }) {
	const router = useRouter()
	const id = params?.id

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (!token) {
			router.push("/login")
		}
	}, [])

	function close() {
		router.push('/users')
	}

	async function handleDelete() {
		try {
			// Example: await fetch(`/api/users/${id}`, { method: 'DELETE' })
			await new Promise((r) => setTimeout(r, 400))
			router.push('/users')
		} catch (err) {
			console.error(err)
			router.push('/users')
		}
	}

	return (
		<div>
			<div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-40" onClick={close} />

			<div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[min(560px,90%)] p-9 rounded-xl shadow-2xl text-center z-50" role="dialog" aria-modal="true">
				<h2 className="text-xl text-[#0b5c80] tracking-wider font-semibold mb-1">CONFIRM DELETE</h2>
				<p className="text-3xl text-[#0b9bf0] font-semibold mb-6">Are You Sure?</p>

				<div className="flex gap-4 justify-center">
					<button className="min-w-[120px] px-6 py-3 rounded-full bg-red-500 text-white text-base" onClick={handleDelete}>Delete</button>
					<button className="min-w-[120px] px-6 py-3 rounded-full bg-gray-400 text-white text-base" onClick={close}>Cancel</button>
				</div>
			</div>
		</div>
	)
}