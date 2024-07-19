"use client";
import { AlignLeft, Bookmark, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
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
    href: "/feed",
    icon: Plus,
  },
];

const SidebareMenu = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col gap-3">
      {menuItems.map((item) => (
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
      ))}
    </div>
  );
};

export default SidebareMenu;
