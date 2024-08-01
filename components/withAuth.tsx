"use client";
import React, { useEffect, ComponentType } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch, selectUser } from "@/lib/store";
import { fetchUser } from "@/lib/features/user/userSlice";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { isAuthenticated, status } = useSelector(selectUser);

    useEffect(() => {
      const fetchCurrentUser = async () => {
        const resultAction = await dispatch(fetchUser());
        if (fetchUser.rejected.match(resultAction)) {
          router.push("/login");
        }
      };

      if (isAuthenticated && pathname === "/login") {
        router.push("/");
      }

      if (!isAuthenticated && status === "idle") {
        fetchCurrentUser();
      }
    }, [isAuthenticated, status, dispatch, router, pathname]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
