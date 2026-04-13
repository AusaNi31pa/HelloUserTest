import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(400px_400px_at_10%_20%,_rgba(169,211,239,0.8)_0%,_transparent_80%),radial-gradient(350px_350px_at_90%_15%,_rgba(169,211,239,0.55)_0%,_transparent_80%),radial-gradient(450px_450px_at_20%_80%,_rgba(169,211,239,0.45)_0%,_transparent_80%),radial-gradient(300px_300px_at_85%_75%,_rgba(169,211,239,0.55)_0%,_transparent_80%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)]">
      <main className="flex flex-col items-center gap-6 p-8">
        <h2 className="text-5xl font-bold text-[#005A94]">Welcome To</h2>

        <Image src="/images/Logo_HelloUser.png" alt="HelloUser" width={200} height={200} className="rounded-full" />

        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00436E] via-[#007BCA] to-[#099DFD] bg-clip-text text-transparent">HelloUser</h1>

        <a href="/login" className="mt-4 inline-flex items-center justify-center w-25 h-15 bg-gradient-to-r from-[#00436E] to-[#099DFD] text-white rounded-full hover:bg-sky-700">
          <span className="text-2xl leading-none">→</span>
        </a>
      </main>
    </div>
  );
}
