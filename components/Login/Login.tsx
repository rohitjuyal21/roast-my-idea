"use client";
import { useSelector } from "react-redux";
import LoginLeftSection from "./LoginLeftSection";
import LoginMain from "./LoginMain";
import { selectUser, useAppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginRightSection from "./LoginRightSection";
import { fetchUser } from "@/lib/features/user/userSlice";
import withAuth from "../withAuth";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useSelector(selectUser);
  const router = useRouter();

  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [dispatch]);

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
