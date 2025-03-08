"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
export default function DashboardPage() {
  const { user, isLoading } = useUser();
  return (
    <>
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/dashboard" className="hover:underline">
          General
        </Link>{" "}
        / Home
      </div>

      <div className="relative w-full h-[80vh] overflow-hidden rounded-lg shadow-lg">
        <br />

        {/* Background Image */}
        <div className="h-[80vh]">
          {/* NOTE:Use Some Css to reduce the image Brightness so that the white text will appear better and improve the text css  */}
          <Image
            src="/dashboardHome.jpg" // Replace with your uploaded BG Image
            alt="Dashboard Background"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />
        </div>
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-10 text-white">
          <h2 className="text-3xl font-bold">
            Hello {!isLoading ? user?.fullName : "John Doe"}{" "}
          </h2>
          <p className="text-lg mt-2 font-semibold">
            Level up your plant growing game with agrisense, adding some sense
            to your agriculturing process{" "}
          </p>
        </div>
      </div>
    </>
  );
}
