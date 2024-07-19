import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import SidebareMenu from "./SidebareMenu";
import UserSection from "./UserSection";

const Sidebar = () => {
  return (
    <aside className="p-4 min-h-screen border-r max-w-64 w-full flex">
      <div className="pr-6 w-full flex flex-col">
        <div className="pt-3 mb-14">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <SidebareMenu />
        <div className="mt-auto">
          <UserSection />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
