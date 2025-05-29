"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Eruda } from "../Eruda/ErudaProvider";
import { Footer } from "../UI/Footer";
import { Header } from "../UI/Header";
import { MiniAppProvider } from "../contexts/miniapp-context";
import Welcome from "../pages/welcome";
import { QueryClient } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "~~/components/providers/ThemeProvider";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useConnectStore } from "~~/services/store/connectStore";

interface ProvidersProps {
  children: ReactNode;
}

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const { rushing, setRushing } = useConnectStore();
  useInitializeNativeCurrencyPrice();
  const location = usePathname();
  const home = location === "/";
  const mine = location === "/mine";

  setTimeout(() => {
    setRushing(false);
  }, 3000);

  if (rushing) {
    return <Welcome />;
  }

  return (
    <>
      <div className={`min-h-screen ${home ? "home_section" : mine ? "mine_section" : "home_section"}`}>
        <main className="relative flex flex-col flex-1">{children}</main>
      </div>
      <Toaster />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider enableSystem>
      <MiniAppProvider addMiniAppOnLoad={false}>
        <ProgressBar height="3px" color="#8cc63f" />
        <ScaffoldEthApp>
          <Eruda>
            <Header />
            {children}
            <Footer />
          </Eruda>
        </ScaffoldEthApp>
      </MiniAppProvider>
    </ThemeProvider>
  );
}
