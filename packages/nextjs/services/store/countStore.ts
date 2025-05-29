import { useConnectStore } from "./connectStore";
import axios from "axios";
import { create } from "zustand";

interface CountState {
  count: number;
  tapCost: number;
  audioContext: AudioContext;
  soundBuffer: AudioBuffer | null;
  setCount: (value: number) => void;
  setTapCost: (value: number) => void;
  tapTractor: () => void;
  syncMetricsToDb: () => Promise<void>;
  upgradeTractor: (level: number) => Promise<void>;
  resetEnergy: () => void;
  dailyReset: () => void;
  initializeAudio: () => Promise<void>;
}

export const useCountStore = create<CountState>((set, get) => ({
  count: 0,
  tapCost: 0,
  audioContext: new (window.AudioContext || (window as any).webkitAudioContext)(),
  soundBuffer: null,

  setCount: value => set({ count: value }),
  setTapCost: value => set({ tapCost: value }),

  initializeAudio: async () => {
    try {
      const response = await fetch("/pickup_gold.mp3");
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await get().audioContext.decodeAudioData(arrayBuffer);
      set({ soundBuffer: audioBuffer });
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  },

  tapTractor: () => {
    const connectStore = useConnectStore.getState();
    if (connectStore.userMetrics.energy > 0) {
      // Play sound
      if (get().soundBuffer) {
        const source = get().audioContext.createBufferSource();
        source.buffer = get().soundBuffer;
        source.connect(get().audioContext.destination);
        source.start(0);
      }

      // Update metrics
      const newMetrics = {
        ...connectStore.userMetrics,
        gold_coins: connectStore.userMetrics.gold_coins + connectStore.tractor.multiplier,
        energy: connectStore.userMetrics.energy - 1,
        taps_total: connectStore.userMetrics.taps_total + 1,
      };

      connectStore.setUserMetrics(newMetrics);
      localStorage.setItem("userMetrics", JSON.stringify(newMetrics));
    }
  },

  syncMetricsToDb: async () => {
    const connectStore = useConnectStore.getState();
    const userId = 123;
    const data = {
      user_id: userId,
      tap_count: connectStore.userMetrics.taps_total,
      energy: connectStore.userMetrics.energy,
    };

    try {
      const res = await axios.post(`${connectStore.BASE_URL}/api/sync-tap`, data, {
        headers: {
          Accept: "application/json",
          "x-api-key": connectStore.API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (res.data === "success") {
        await connectStore.getTelegramUserData();
      }
    } catch (error) {
      console.error(error);
    }
  },

  upgradeTractor: async (level: number) => {
    const connectStore = useConnectStore.getState();
    const userId = 123;

    try {
      const res = await axios.post(
        `${connectStore.BASE_URL}/api/user/upgrade_tractor?user_id=${userId}&upgrade_level=${level}`,
        {},
        {
          headers: {
            Accept: "application/json",
            "x-api-key": connectStore.API_KEY,
            "Content-Type": "application/json",
          },
        },
      );
      console.log("upgrade response:", res.data);
    } catch (error) {
      console.error(error);
    }
  },

  resetEnergy: () => {
    const connectStore = useConnectStore.getState();
    const newMetrics = {
      ...connectStore.userMetrics,
      energy: Math.min(connectStore.userMetrics.max_energy),
    };
    connectStore.setUserMetrics(newMetrics);
    localStorage.setItem("userMetrics", JSON.stringify(newMetrics));
  },

  dailyReset: () => {
    const connectStore = useConnectStore.getState();
    const newMetrics = {
      ...connectStore.userMetrics,
      energy: connectStore.userMetrics.max_energy,
    };
    connectStore.setUserMetrics(newMetrics);
    localStorage.setItem("userMetrics", JSON.stringify(newMetrics));
  },
}));

// // Initialize audio when the app starts
// if (typeof window !== "undefined") {
//   const countStore = useCountStore.getState();
//   countStore.initializeAudio();

//   // Set up metrics sync interval
//   setInterval(() => {
//     countStore.syncMetricsToDb();
//   }, 900000); // 15 minutes
// }
