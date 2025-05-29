import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTasks } from "react-icons/fa";
import { GiAxeSwing } from "react-icons/gi";
import { MdLeaderboard, MdPostAdd, MdStoreMallDirectory } from "react-icons/md";
import { PiFarmFill } from "react-icons/pi";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  const location = usePathname();

  return (
    <div className="min-h-0 px-1 py-3">
      <div className="fixed bottom-0 left-0 z-10 flex items-center justify-between w-full p-4 pointer-events-none">
        <div className="flex flex-col gap-2 pointer-events-auto md:flex-row">
          {nativeCurrencyPrice > 0 && (
            <div>
              <div className="gap-1 font-normal cursor-auto btn btn-primary btn-sm">
                <CurrencyDollarIcon className="w-4 h-4" />
                <span>{nativeCurrencyPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
          {isLocalNetwork && (
            <>
              <Faucet />
              <Link href="/blockexplorer" passHref className="gap-1 font-normal btn btn-primary btn-sm">
                <MagnifyingGlassIcon className="w-4 h-4" />
                <span>Block Explorer</span>
              </Link>
            </>
          )}
        </div>
      </div>
      <footer className="fixed bottom-0 z-20 w-full gap-4 p-4">
        {location === "/" && (
          <div className="flex justify-between mb-6 top">
            <Link
              href="/leaderboard"
              passHref
              className="grid place-items-center bg-[#1d8109] border-[#8cc63f] border-2 rounded-[4px] p-1 w-[70px] h-[70px]"
            >
              <MdLeaderboard size={32} color="gold" />
            </Link>
            <Link
              href="/store"
              passHref
              className="grid place-items-center bg-[#1d8109] border-[#8cc63f] border-2 rounded-[4px] p-1 w-[70px] h-[70px]"
            >
              <MdStoreMallDirectory size={32} color="gold" />
            </Link>
          </div>
        )}
        <div className="flex justify-between bottom">
          <Link
            href="/"
            passHref
            className="grid place-items-center bg-[#1d8109] border-[#8cc63f] border-2 rounded-[4px] p-1 w-[70px] h-[70px]"
          >
            <PiFarmFill size={32} color="gold" />
            <p className="font-semibold text-white text-[9px] font-headings">HOME</p>
          </Link>
          <Link
            href="/mine"
            passHref
            className="grid place-items-center bg-[#1d8109] border-[#8cc63f] border-2 rounded-[4px] p-1 w-[70px] h-[70px]"
          >
            <GiAxeSwing size={32} color="gold" />
            <p className="font-semibold text-white text-[9px] font-headings">MINE</p>
          </Link>
          <Link
            href="/tasks"
            passHref
            className="grid place-items-center bg-[#1d8109] border-[#8cc63f] border-2 rounded-[4px] p-1 w-[70px] h-[70px]"
          >
            <FaTasks size={32} color="gold" />
            <p className="font-semibold text-white text-[9px] font-headings">TASK</p>
          </Link>
          <Link
            href="/invites"
            passHref
            className="grid place-items-center bg-[#1d8109] border-[#8cc63f] border-2 rounded-[4px] p-1 w-[70px] h-[70px]"
          >
            <MdPostAdd size={32} color="gold" />
            <p className="font-semibold text-white text-[9px] font-headings">INVITE</p>
          </Link>
        </div>
      </footer>

      {/* <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} /> */}
    </div>
  );
};
