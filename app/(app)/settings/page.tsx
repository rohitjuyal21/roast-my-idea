"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axiosInstance";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const session = useSession();
  const user = session.data?.user;

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete("/delete-account");
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Settings</h1>
      <div>
        <div className="mb-4 flex">
          <h4 className="font-medium w-20 gap-8">Name</h4>
          <span>{user?.name}</span>
        </div>
        <div className="mb-6 flex">
          <h4 className="font-medium w-20 gap-8">Email</h4>
          <span>{user?.email}</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete your account?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={handleDeleteAccount} variant="destructive">
                Yes, Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Page;
