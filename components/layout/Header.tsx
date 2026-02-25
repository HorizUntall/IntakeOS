import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header
      id="header"
      className="fixed top-0 z-50 w-full bg-amber-400 flex p-3"
    >
      <div className="flex mx-auto w-full max-w-300">
        <div className="flex gap-10 ml-5">
          <Link href="/">IntakeOS</Link>
        </div>
        <div className="ml-auto flex items-center">
          <UserButton></UserButton>
        </div>
      </div>
    </header>
  );
}
