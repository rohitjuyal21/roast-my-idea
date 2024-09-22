"use client";
import { AlignLeft, Bookmark, Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CreateIdeaModal from "../CreateIdeaModal/CreateIdeaModal";

export const menuItems = [
  {
    label: "Feed",
    href: "/",
    icon: AlignLeft,
  },
  {
    label: "Saved",
    href: "/saved",
    icon: Bookmark,
  },
  {
    label: "Post Idea",
    icon: Plus,
  },
];

const SidebareMenu = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        {menuItems.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex gap-1 items-center p-2 hover:bg-muted rounded-md border",
                pathname === item.href
                  ? "bg-muted border-border"
                  : "bg-transparent border-transparent"
              )}
            >
              <item.icon className="size-5" />
              <span className="text-lg">{item.label}</span>
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={() => setOpenDialog(true)}
              className={cn(
                "flex gap-1 items-center p-2 hover:bg-muted rounded-md border",
                pathname === item.href
                  ? "bg-muted border-border"
                  : "bg-transparent border-transparent"
              )}
            >
              <item.icon className="size-5" />
              <span className="text-lg">{item.label}</span>
            </button>
          )
        )}
      </div>
      <CreateIdeaModal openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

export default SidebareMenu;
