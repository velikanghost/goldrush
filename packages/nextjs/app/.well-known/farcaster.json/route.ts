import { NextResponse } from "next/server";

/**
 * Get the farcaster manifest for the frame, generate yours from Warpcast Mobile
 * On your phone to Settings > Developer > Domains > insert website hostname > Generate domain manifest
 * @returns The farcaster manifest for the frame
 */
export async function GET() {
  let frameName = "Gold Rush";
  let noindex = false;
  const appUrl = process.env.NEXT_PUBLIC_URL || "";

  if (appUrl.includes("localhost")) {
    frameName += " Local";
    noindex = true;
  } else if (appUrl.includes("ngrok")) {
    frameName += " NGROK";
    noindex = true;
  } else if (appUrl.includes("https://dev.")) {
    frameName += " Dev";
    noindex = true;
  }

  return NextResponse.json({
    accountAssociation: {
      header: process.env.NEXT_PUBLIC_FARCASTER_HEADER,
      payload: process.env.NEXT_PUBLIC_FARCASTER_PAYLOAD,
      signature: process.env.NEXT_PUBLIC_FARCASTER_SIGNATURE,
    },
    frame: {
      version: "1",
      name: frameName,
      homeUrl: appUrl,
      iconUrl: `${appUrl}/images/icon.png`,
      imageUrl: `${appUrl}/images/feed.png`,
      buttonTitle: `Launch App`,
      splashImageUrl: `${appUrl}/images/splash.png`,
      splashBackgroundColor: "#0a3d00",
      webhookUrl: `${appUrl}/api/webhook`,
      // Metadata for Mini App Store
      subtitle: "Mine Gold on Monad",
      description:
        "Join the Gold Rush on Monad! Mine gold, upgrade your tractor, and compete with other miners in this exciting blockchain game.",
      primaryCategory: "games",
      tags: ["mini-app", "games", "monad", "mining"],
      tagline: "Mine Gold, Get Rich!",
      ogTitle: `${frameName}`,
      ogDescription: "Join the Gold Rush on Monad! Mine gold, upgrade your tractor, and compete with other miners.",
      screenshotUrls: [
        `${appUrl}/images/screenshot1.png`,
        `${appUrl}/images/screenshot2.png`,
        `${appUrl}/images/screenshot3.png`,
      ],
      heroImageUrl: `${appUrl}/images/hero.png`,
      ogImageUrl: `${appUrl}/images/og.png`,
      noindex,
    },
  });
}
