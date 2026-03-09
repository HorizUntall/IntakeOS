"use client";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import UserNav from "@/components/layout/UserNav";
import { useState } from "react";

export default function Header() {
  const { isLoaded, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!isLoaded) {
    return <div className="h-[73px] w-full" />;
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          Hello
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full bg-white/70 backdrop-blur-lg border-b border-white/40 p-3 flex justify-between items-center shadow-sm px-10">
          <div className="mx-auto max-w-5xl w-full flex justify-between items-center">
            <Link
              href="/"
              className="font-bold text-zinc-800 tracking-tight ml-4"
            >
              INTAKE<span className="text-zinc-400 font-light">OS</span>
            </Link>
            {/* <div className="mr-4">
            <UserButton />
          </div> */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(true)}
                className="relative h-7 w-7 rounded-full overflow-hidden border border-zinc-200 cursor-pointer"
              >
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="User Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-zinc-100 h-full w-full object-cover cursor-pointer"></div>
                )}
              </button>

              {isOpen && <UserNav setIsOpen={setIsOpen} />}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
