import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-[48px] h-[48px] overflow-clip rounded-sm">
        <Image src="/logo-remove-bg.png" alt="logo" width={48} height={48} />
      </div>
      <p className="text-xl">ESSENTIA</p>
    </div>
  );
};

export default Logo;
