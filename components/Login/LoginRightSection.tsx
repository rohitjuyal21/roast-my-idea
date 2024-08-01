import Image from "next/image";
import React from "react";

const LoginRightSection = () => {
  return (
    <div className="relative w-80 xl:block hidden">
      <Image
        src="/images/ideas.png"
        alt="ideas"
        width={320}
        height={0}
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="h-screen w-full"
      />
    </div>
  );
};

export default LoginRightSection;
