"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import Image from "next/image";
import {
  Monitor,
  CreditCard,
  Rocket,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <Monitor size={20} /> },
    {
      name: "Irrigation",
      path: "/dashboard/irrigation",
      icon: <CreditCard size={20} />,
    },
    {
      name: "Start Here",
      path: "/dashboard/campaign",
      icon: <Rocket size={20} />,
    },
    { name: "FAQ", path: "/dashboard/faq", icon: <HelpCircle size={20} /> },
    {
      name: "Feedback",
      path: "/dashboard/feedback",
      icon: <MessageSquare size={20} />,
    },
  ];

  return (
    <nav className="p-4 flex flex-col h-full  space-y-2">
      <div className="mt-2"></div>
      <div className="  flex items-center justify-center    rounded-lg p-4">
        <Image src="/dashboard_logo.webp" height={50} width={50} alt="logo" />
      </div>
      <div className=" pt-8  ">
        <div className="px-2 py-3 bg-[#FEF4F3] ">
          <h2 className="text-orange-500 py-2  px-4  rounded-lg font-semibold mb-2">
            General <br /> <span className="text-stone-400">Dashboard </span>
          </h2>
        </div>
        <div className="pt-8">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "flex items-center gap-3 px-4 py-4 rounded-lg transition-all",
                pathname === link.path
                  ? "bg-red-500 text-white shadow-md"
                  : "hover:bg-gray-200 text-gray-700",
              )}
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
