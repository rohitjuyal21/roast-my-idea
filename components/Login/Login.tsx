"use client";

import LoginLeftSection from "./LoginLeftSection";
import LoginMain from "./LoginMain";
import { selectUser, useAppSelector } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginRightSection from "./LoginRightSection";
import withAuth from "../withAuth";

const Login = () => {
  const { isAuthenticated } = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      <LoginLeftSection />
      <LoginMain />
      <LoginRightSection />
    </div>
  );
};

export default withAuth(Login);
