import Link from "next/link";
import { HomeIcon, ClockIcon, UserIcon } from "@heroicons/react/24/solid";

export default function BottomNavbar() {
  return (
    <footer className="fixed bottom-6 left-0 right-0 z-50 px-6 md:hidden">
      <div className="flex justify-around items-center bg-zinc-900/90 backdrop-blur-xl rounded-3xl py-4 shadow-2xl">
        <Link href="/">
          <HomeIcon className="h-6 w-6 text-white" />
        </Link>
        <Link href="/log">
          <ClockIcon className="h-6 w-6 text-zinc-500 hover:text-white" />
        </Link>
        <Link href="/profile">
          <UserIcon className="h-6 w-6 text-zinc-500 hover:text-white" />
        </Link>
      </div>
    </footer>
  );
}
