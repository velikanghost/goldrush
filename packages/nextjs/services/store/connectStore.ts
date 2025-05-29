import axios from "axios";
import { create } from "zustand";
import { Invites, Leaderboard, Metrics, Tractor, User } from "~~/types/all";

interface ConnectState {
  API_KEY: string;
  BASE_URL: string;
  rushing: boolean;
  localMetrics: Metrics;
  user: User;
  userMetrics: Metrics;
  tractor: Tractor;
  tractors: Tractor[];
  leaderboard: Leaderboard[];
  invites: Invites;
  setUser: (data: User) => void;
  setUserMetrics: (data: Metrics) => void;
  setTractor: (data: Tractor) => void;
  setLeaderboard: (data: Leaderboard[]) => void;
  setTractors: (data: Tractor[]) => void;
  setInvites: (data: Invites) => void;
  setRushing: (value: boolean) => void;
  getTelegramUserData: () => Promise<void>;
  getLeaderboard: () => Promise<void>;
  getTractors: () => Promise<void>;
  getInvites: () => Promise<void>;
}

const defaultMetrics: Metrics = {
  gold_coins: 0,
  user_rank: 0,
  referral_count: 0,
  upgrade_level: 0,
  energy: 0,
  max_energy: 0,
  taps_total: 0,
};

const defaultUser: User = {
  id: 0,
  telegram_id: 0,
  username: "",
  first_name: "",
  last_name: "",
  referral_link: "",
  created_at: "",
  stats: defaultMetrics,
  tractor: {
    id: 0,
    name: "",
    upgrade_level: 0,
    multiplier: 0,
    max_energy: 0,
    image_url: "",
    price: 0,
  },
};

const defaultTractor: Tractor = {
  id: 0,
  name: "",
  upgrade_level: 0,
  multiplier: 0,
  max_energy: 0,
  image_url: "",
  price: 0,
};

const defaultInvites: Invites = {
  total_referral_count: 0,
  referral_link: "",
  recent_referrals: [],
};

export const useConnectStore = create<ConnectState>((set, get) => ({
  API_KEY: process.env.NEXT_PUBLIC_BACKEND_API_KEY || "",
  BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "",
  rushing: true,
  localMetrics: defaultMetrics,
  user: defaultUser,
  userMetrics: defaultMetrics,
  tractor: defaultTractor,
  tractors: [],
  leaderboard: [],
  invites: defaultInvites,

  setUser: data => set({ user: data }),
  setUserMetrics: data => set({ userMetrics: data }),
  setTractor: data => set({ tractor: data }),
  setLeaderboard: data => set({ leaderboard: data }),
  setTractors: data => set({ tractors: data }),
  setInvites: data => set({ invites: data }),
  setRushing: value => set({ rushing: value }),

  getTelegramUserData: async () => {
    const telegram = (window as any).Telegram?.WebApp;
    try {
      const res = await axios.get(`${get().BASE_URL}/api/user/profile/${telegram.initDataUnsafe.user.id}`, {
        headers: {
          Accept: "application/json",
          "x-api-key": get().API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (res) {
        set({ user: res.data });

        const higherCoinsObject =
          get().localMetrics.gold_coins > res.data?.stats?.gold_coins
            ? get().localMetrics
            : get().localMetrics.gold_coins < res.data?.stats?.gold_coins
              ? res.data?.stats
              : null;

        if (higherCoinsObject) {
          set({ userMetrics: higherCoinsObject });
        } else {
          set({ userMetrics: res.data?.stats });
        }
        set({ tractor: res.data?.tractor });
      }
    } catch (error) {
      console.error(error);
    }
  },

  getLeaderboard: async () => {
    try {
      const res = await axios.get(`${get().BASE_URL}/api/leaderboard`, {
        headers: {
          Accept: "application/json",
          "x-api-key": get().API_KEY,
          "Content-Type": "application/json",
        },
      });
      set({ leaderboard: res.data });
    } catch (error) {
      console.error(error);
    }
  },

  getTractors: async () => {
    try {
      const res = await axios.get(`${get().BASE_URL}/api/tractors`, {
        headers: {
          Accept: "application/json",
          "x-api-key": get().API_KEY,
          "Content-Type": "application/json",
        },
      });
      set({ tractors: res.data });
    } catch (error) {
      console.error(error);
    }
  },

  getInvites: async () => {
    const id = 123;
    try {
      const res = await axios.get(`${get().BASE_URL}/api/user/invites?telegram_id=${id}`, {
        headers: {
          Accept: "application/json",
          "x-api-key": get().API_KEY,
          "Content-Type": "application/json",
        },
      });
      set({ invites: res.data });
    } catch (error) {
      console.error(error);
    }
  },
}));
