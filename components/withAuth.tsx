"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { login } from "@/lib/features/userSlice";
import { selectUser, useAppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useEffect, ComponentType } from "react";
import { useSelector } from "react-redux";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useSelector(selectUser);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get("/user/profile");
          dispatch(login(response.data));
        } catch (error) {
          router.push("/login");
        }
      };

      if (!isAuthenticated) {
        fetchUser();
      }
    }, [isAuthenticated, dispatch, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
