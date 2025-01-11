"use client";

import { useEffect } from "react";
import useScreenSize from "@/lib/hooks/use-screen-size";
import PixelTrail from "@/components/fancy/pixel-trail";
import Image from "next/image";
import { useLogin } from "@/lib/hooks/use-login";
import { useRouter } from "next/navigation";

export default function Home() {
  const screenSize = useScreenSize();
  const { login, user } = useLogin({ redirectTo: true });
  const router = useRouter();

  useEffect(() => {
    const handleClick = () => {
      if (!user) {
        login();
      } else {
        router.push("/dashboard/interface");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [login, user, router]);

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col font-azeret">
      <div className="absolute inset-0 bg-[url('/banner.png')] bg-cover bg-center opacity-50 z-0" />

      <div className="absolute inset-0 z-10">
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 16 : 24}
          fadeDuration={500}
          pixelClassName="bg-white"
        />
      </div>

      <div className="justify-center items-center flex flex-col w-full h-full gap-4 z-[9]">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 justify-center items-center flex flex-col">
          <div className="flex flex-col gap-6 items-center ">
            <Image
              src="/arbor.png"
              alt="Arbor Logo"
              width={75}
              height={75}
              className="rounded-lg"
            />
            <h2 className="font-vt323 text-5xl sm:text-4xl md:text-6xl uppercase">
              Arbor
            </h2>
          </div>

          <p className="pt-0.5 sm:pt-2 text-xs sm:text-base md:text-xl">
            Sovereign Self Learning Agents
          </p>
          <p className="mt-4 z-[11] text-lg cursor-pointer">
            click to enter the ether
          </p>
        </div>
      </div>
    </div>
  );
}
