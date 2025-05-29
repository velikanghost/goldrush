"use client";

import { AiFillThunderbolt } from "react-icons/ai";
import { GiPadlock } from "react-icons/gi";
import { useConnectStore } from "~~/services/store/connectStore";
import { Tractor } from "~~/types/all";

const Store = () => {
  const { tractors, userMetrics } = useConnectStore();
  const hasWallet = localStorage.getItem("wallet") !== null;

  const handleConnectWallet = () => {
    console.log("connect wallet");
  };

  const handleBuyTractor = async (tractor: Tractor) => {
    console.log("buy tractor");
  };

  return (
    <>
      {!hasWallet ? (
        <div className="relative grid place-items-center">
          <button
            onClick={handleConnectWallet}
            className="mt-[48%] bg-[#F5EAD1] text-[#5C4F3A] border-[#5C4F3A] self-center font-medium py-6 px-12 rounded-[32px] text-xl font-headings shadow-[4.4px_4.4px_0px_#d0c3a1] hover:shadow-[2.2px_2.2px_0px_#d0c3a1] hover:translate-y-1"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
          <div className="relative w-[93%] rounded mx-auto bg-[#0a3d00]/50 border border-[#8cc63f] p-4 flex flex-col overflow-y-auto h-[calc(100%-15.5rem)]">
            <div className="pb-4 border-b border-[#ffd700]">
              <h1 className="pb-2 text-3xl font-bold text-[#ffd700] font-body">Study Power-ups</h1>
              <p className="font-semibold text-[#e0d6b9]">You get even more gold coins!</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {tractors.slice(0, 4).map(tractor => (
                <div key={tractor.id} className="bg-[#F5EAD1] flex flex-col p-2 rounded items-center justify-between">
                  <img src={tractor.image_url} className="pb-3 transition-transform duration-200" alt="tractor" />
                  <h3 className="font-bold text-center border-t border-[#3d2c24] w-full pt-3">{tractor.name}</h3>
                  <p className="flex items-center justify-between py-1 text-sm font-semibold">
                    {tractor.max_energy} Energy
                    <AiFillThunderbolt color="#3d2c24" />
                  </p>
                  <p className="py-1 text-sm font-semibold">{tractor.multiplier}x Multiplier</p>
                  {userMetrics.upgrade_level === tractor.upgrade_level ? (
                    <button className="flex items-center justify-center w-full buy_btn__disabled bg-[#ffd700]">
                      Active
                    </button>
                  ) : userMetrics.upgrade_level + 1 === tractor.upgrade_level ? (
                    <button onClick={() => handleBuyTractor(tractor)} className="w-full buy_btn">
                      BUY for {tractor.price} SUI
                    </button>
                  ) : (
                    <button className="flex items-center justify-center w-full buy_btn__disabled">
                      <GiPadlock size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Store;
