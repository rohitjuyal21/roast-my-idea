"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

const UserSection = () => {
  const session = useSession();
  const user = session.data?.user;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  const handleSettingButtonClick = () => {
    setIsPopoverOpen(false);
    router.push("/settings");
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger className="md:w-full">
        <div className="flex gap-2 items-center p-2 rounded-md cursor-pointer md:hover:bg-muted w-full">
          <Avatar>
            <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
            <AvatarFallback>{user?.name?.slice(0, 2) || ""}</AvatarFallback>
          </Avatar>
          <span className="md:inline hidden">{user?.name}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] ml-4">
        <div className="flex w-full flex-col gap-2 items-start">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleSettingButtonClick}
          >
            <Settings className="mr-2 size-5" />
            Settings
          </Button>
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 size-5" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserSection;
