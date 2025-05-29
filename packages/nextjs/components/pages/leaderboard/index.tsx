"use client";

import { useConnectStore } from "~~/services/store/connectStore";

const Leaderboard = () => {
  const { leaderboard } = useConnectStore();
  return (
    <div className="relative w-[93%] rounded mx-auto bg-[#0a3d00]/50 border border-[#8cc63f] p-4 h-[calc(100%-11.5rem)]">
      <div className="pb-4 border-b border-[#ffd700]">
        <h1 className="text-3xl font-bold text-[#ffd700] font-body">Leaderboard</h1>
      </div>

      <div className="bg-[#F5EAD1] w-full flex flex-col p-2 rounded items-start mt-4 overflow-y-auto h-[calc(100%-4.5rem)]">
        <table className="table">
          <thead>
            <tr className="border-[#3d2c24]">
              <th>No</th>
              <th>Miner</th>
              <th className="text-right">Golds</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={index}>
                <td className="font-medium">{index + 1}</td>
                <td className="text-[#5C4F3A] capitalize">{user.username}</td>
                <td className="text-right text-[#5C4F3A]">{user.gold_coins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
