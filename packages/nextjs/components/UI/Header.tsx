"use client";

import { Coins, Crown } from "lucide-react";
import { BugAntIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useConnectStore } from "~~/services/store/connectStore";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="w-4 h-4" />,
  },

  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="w-4 h-4" />,
  },
];

/**
 * Site header
 */
export const Header = () => {
  const { userMetrics } = useConnectStore();
  return (
    <nav className="relative z-20 flex items-center justify-between w-full gap-4 p-4 mt-3">
      {/* Remove this onclick */}
      <button
        onClick={() => localStorage.clear()}
        className="flex justify-center items-center gap-2 py-1 px-3 bg-[#1d8109] border-2 border-[#8cc63f] rounded-3xl text-xl font-medium shadow-[0px 4px 6px rgba(0, 0, 0, 0.1)] cursor-pointer transform-[0.2s] active:scale-[1.05]"
      >
        <span className="text-base text-white font-headings">LVL {userMetrics.user_rank || 0}</span>
        <Crown color="gold" />
      </button>
      <button className="flex justify-center items-center gap-2 py-1 px-3 bg-[#1d8109] border-2 border-[#8cc63f] rounded-3xl text-xl font-medium shadow-[0px 4px 6px rgba(0, 0, 0, 0.1)] cursor-pointer transform-[0.2s] active:scale-[1.05]">
        <span className="text-base text-white font-headings">{userMetrics.gold_coins || 0}</span>
        <Coins color="gold" />
      </button>
    </nav>
  );
};
