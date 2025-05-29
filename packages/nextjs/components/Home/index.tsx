"use client";

import Link from "next/link";

export default function Home() {
  // const { signIn, isLoading, isSignedIn, user } = useSignIn({
  //   autoSignIn: true,
  // });
  // const { addMiniApp, context } = useMiniApp();
  // const { address: connectedAddress } = useAccount();

  return (
    <section className="relative grid place-items-center">
      <img
        src="https://res.cloudinary.com/dwz1rvu5m/image/upload/v1731423605/miner_qexap3.png"
        className="w-[70%] z-10 -ml-5"
        alt="miner"
      />
      <Link className="inline-block cursor-pointer" href="/mine" passHref>
        <img
          className="transform-[0.2s] active:scale-[1.05] z-10"
          src="https://res.cloudinary.com/dwz1rvu5m/image/upload/v1731423609/start_button_xwbwnr.png"
          alt="start mining"
        />
      </Link>
    </section>
  );
}
