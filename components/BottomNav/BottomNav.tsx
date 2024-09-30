"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import CreateIdeaModal from "../CreateIdeaModal/CreateIdeaModal";
import UserSection from "../Sidebar/UserSection";
import { menuItems } from "../Sidebar/SidebareMenu";
import { useSession } from "next-auth/react";
import LoginPopup from "../LoginPopup";

const BottomNav = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [openLoginPopup, setOpenLoginPopup] = useState(false);

  const handlePostIdeaClick = () => {
    if (!session) {
      setOpenLoginPopup(true);
    } else {
      setOpenDialog(true);
    }
  };

  const handleSaveClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!session) {
      event.preventDefault();
      setOpenLoginPopup(true);
    }
  };

  return (
    <div className="fixed z-50 md:hidden w-full h-16 bg-background border-t border bottom-0">
      <div className="flex items-center h-full justify-between gap-4 px-4">
        {menuItems.map((item) =>
          item.href ? (
            <Button size="icon" variant="ghost" key={item.label} asChild>
              <Link
                href={item.href}
                title={item.label}
                onClick={item.label === "Saved" ? handleSaveClick : undefined}
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
              onClick={
                item.label === "Post Idea" ? handlePostIdeaClick : undefined
              }
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
      <LoginPopup
        openDialog={openLoginPopup}
        setOpenDialog={setOpenLoginPopup}
      />
    </div>
  );
};

export default BottomNav;
