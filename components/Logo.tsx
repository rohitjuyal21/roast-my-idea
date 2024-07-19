import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="relative flex gap-1.5 items-end h-10">
      <Image src="/svgs/logoIcon.svg" alt="logo" height={40} width={40} />
      <h2 className="text-4xl font-bold font-roadrage">roast my idea</h2>
    </div>
  );
};

export default Logo;
