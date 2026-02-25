import Link from "next/link";
import { HomeIcon, ClockIcon, UserIcon } from "@heroicons/react/24/solid";

export default function BottomNavbar() {
  return (
    <footer
      id="bottomNavbar"
      className="fixed bottom-0 z-50 w-full bg-amber-400 h-auto py-2"
    >
      {/* Dashboard | Today | Profile */}
      <div className="flex flex-row justify-center gap-10">
        <Link href="">
          <HomeIcon className="h-8 w-8"></HomeIcon>
        </Link>
        <Link href="">
          <ClockIcon className="h-8 w-8"></ClockIcon>
        </Link>
        <Link href="">
          <UserIcon className="h-8 w-8"></UserIcon>
        </Link>
      </div>
    </footer>
  );
}
