import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
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
          <Image
            src="/dashboardHome.jpg" // Replace with your uploaded BG Image
            alt="Dashboard Background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-10 text-white">
          <h2 className="text-3xl font-bold">Hello Prashant Shukla,</h2>
          <p className="text-lg mt-2 font-semibold">
            Initial push is the toughest! Go through the learning modules, or
            reach out to your fundraising manager to level up.
          </p>
        </div>
      </div>
    </>
  );
}
