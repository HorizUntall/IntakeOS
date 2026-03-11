/*
Content:
Sign out
Settings (Setup)
Appearance (Dark or Light)

Voice Support:
Siri, Google
- Copy Voice Commands

Advanced -> Show API endpoints

*/

"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  MicrophoneIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserNav({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <>
      {/* <div className="h-screen v-screen bg-black-200">Hello</div> */}

      <div className="absolute right-0 mt-2 w-70 h-auto bg-white border border-zinc-200 rounded-lg shadow-xl z-40 flex flex-col text-gray-600 text-md py-4 px-2 gap-4">
        <div className="flex items-center px-2 gap-3">
          <div className="flex items-center justify-center">
            <Image
              src={user.imageUrl}
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="text-lg font-semibold">
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
        </div>
        <ul className="w-full">
          <li className="flex h-10 align-middle rounded-lg px-2 hover:bg-zinc-200 cursor-pointer ">
            <Link
              href="/voice"
              className="flex gap-2 w-full"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-center">
                <MicrophoneIcon className="h-5 w-5"></MicrophoneIcon>
              </div>
              <div className="flex items-center justify-center">
                <span>Voice Commands</span>
              </div>
            </Link>
          </li>

          <li className="flex h-10 align-middle rounded-lg px-2 hover:bg-zinc-200 cursor-pointer">
            <Link
              href="/settings"
              className="flex gap-2 w-full"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-center">
                <Cog6ToothIcon className="h-5 w-5"></Cog6ToothIcon>
              </div>
              <div className="flex items-center justify-center">
                <span>Settings</span>
              </div>
            </Link>
          </li>

          <li
            className="flex h-10 align-middle rounded-lg gap-2 px-2 hover:bg-zinc-200 cursor-pointer"
            onClick={() => alert("Feature not added yet. Sorry 😞")}
          >
            <div className="flex items-center justify-center">
              <MoonIcon className="h-5 w-5"></MoonIcon>
            </div>
            <div className="flex items-center justify-center">
              <span>Appearance</span>
            </div>
          </li>

          <li
            className="flex h-10 align-middle rounded-lg gap-2 px-2 hover:bg-zinc-200 cursor-pointer"
            onClick={() => signOut(() => router.push("/"))}
          >
            <div className="flex items-center justify-center">
              <ArrowRightStartOnRectangleIcon className="h-5 w-5"></ArrowRightStartOnRectangleIcon>
            </div>
            <div className="flex items-center justify-center">
              <span>Sign out</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
