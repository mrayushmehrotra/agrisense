"use client";

import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  // Handle loading state
  if (!isLoaded) {
    return (
      <div className="flex justify-between items-center bg-[#FEF4F3] px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold text-zinc-500">Dashboard</h1>
        <div className="flex items-center space-x-3">
          <span className="text-white">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center bg-[#FEF4F3] px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold text-zinc-500">Dashboard</h1>
      <div className="flex items-center space-x-3 p-4">
        {isSignedIn ? (
          <>
            <span className="text-black font-semibold ">{user.fullName}</span>
            <UserButton />
          </>
        ) : (
          <span className="text-white">Please sign in</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
