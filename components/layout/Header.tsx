import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    // Changed top-4 to top-0, removed px-4 and left/right-0 to make it flush
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Removed rounded-2xl and added border-b instead of a full border */}
      <div className="w-full bg-white/70 backdrop-blur-lg border-b border-white/40 p-3 flex justify-between items-center shadow-sm">
        <div className="mx-auto max-w-5xl w-full flex justify-between items-center">
          <Link
            href="/"
            className="font-bold text-zinc-800 tracking-tight ml-4"
          >
            INTAKE<span className="text-zinc-400 font-light">OS</span>
          </Link>
          <div className="mr-4">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
