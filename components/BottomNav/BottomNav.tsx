"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import CreateIdeaModal from "../CreateIdeaModal/CreateIdeaModal";
import UserSection from "../Sidebar/UserSection";
import { menuItems } from "../Sidebar/SidebareMenu";

const BottomNav = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const pathname = usePathname();

  return (
    <div className="fixed md:hidden w-full h-16 bg-background border-t border bottom-0">
      <div className="flex items-center h-full justify-between gap-4 px-4">
        {menuItems.map((item) =>
          item.href ? (
            <Button size="icon" variant="ghost" key={item.label} asChild>
              <Link
                href={item.href}
                title={item.label}
                className={cn(
                  "border",
                  pathname === item.href
                    ? "bg-muted border-border"
                    : "bg-transparent border-transparent"
                )}
              >
                <item.icon />
              </Link>
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              key={item.label}
              title={item.label}
              onClick={() => setOpenDialog(true)}
              className={cn(
                "",
                pathname === item.href
                  ? "bg-muted border-border"
                  : "bg-transparent border-transparent"
              )}
            >
              <item.icon />
            </Button>
          )
        )}
        <UserSection />
      </div>
      <CreateIdeaModal openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default BottomNav;
