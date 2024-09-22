import Image from "next/image";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const LoginMain = () => {
  const handleLogin = async () => {
    await signIn("google", { redirectTo: "/" });
  };

  return (
    <div className="flex-1 p-4 md:p-8 xl:px-80  flex items-center justify-center z-10 px-5">
      <div className="flex flex-col items-center">
        <div className="flex gap-1.5 items-end h-10">
          <div className="relative lg:size-[100px] size-[70px]">
            <Image src="/svgs/logoIcon.svg" alt="logo" fill />
          </div>
          <h2 className="text-6xl lg:text-8xl font-bold font-roadrage">
            roast my idea
          </h2>
        </div>
        <p className="text-lg lg:text-xl mt-6 text-center mb-8">
          Share your idea with the world and get real, candid feedback
        </p>

        <Button
          onClick={handleLogin}
          type="submit"
          variant="outline"
          size="lg"
          className="flex gap-2"
        >
          <Image src="/images/google.png" alt="logo" height={32} width={32} />
          Login with google
        </Button>
      </div>
    </div>
  );
};

export default LoginMain;
