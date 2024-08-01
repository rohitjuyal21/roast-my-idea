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
import withAuth from "@/components/withAuth";
import { axiosInstance } from "@/lib/axiosInstance";
import { logout } from "@/lib/features/user/userSlice";
import { selectUser, useAppDispatch, useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete("/user/delete-account");
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col gap-4">
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

export default withAuth(Page);
