import React from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "./Logo";

interface LoginPopupProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPopup: React.FC<LoginPopupProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="w-[90%] rounded-lg sm:w-full">
        <DialogTitle className="sr-only">Please Login First</DialogTitle>
        <div className="flex flex-col gap-6 items-center my-10">
          <div className="flex gap-1.5 items-end h-10">
            <Logo />
          </div>
          <Button
            onClick={() => signIn("google", { redirectTo: "/" })}
            type="submit"
            variant="outline"
            size="lg"
            className="flex gap-2 outline-none w-fit"
          >
            <Image src="/images/google.png" alt="logo" height={32} width={32} />
            Login with google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default LoginPopup;
