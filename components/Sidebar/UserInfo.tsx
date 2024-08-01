"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { selectUser, useAppDispatch, useAppSelector } from "@/lib/store";

import { Button } from "../ui/button";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logout } from "@/lib/features/user/userSlice";

const UserInfo = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push("/login");
    } catch (error) {
      toast.error("Logout Failed!");
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <div className="flex gap-2 items-center p-2 rounded-md cursor-pointer hover:bg-muted w-full">
          <Avatar>
            <AvatarImage src={user?.profileImage} alt={user?.name} />
            <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span>{user?.name}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] ml-4">
        <div className="flex w-full flex-col gap-2 items-start">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/settings">
              <Settings className="mr-2 size-5" />
              Settings
            </Link>
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

export default UserInfo;
