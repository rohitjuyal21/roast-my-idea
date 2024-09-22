import LoginLeftSection from "./LoginLeftSection";
import LoginMain from "./LoginMain";
import LoginRightSection from "./LoginRightSection";

const Login = () => {
  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      <LoginLeftSection />
      <LoginMain />
      <LoginRightSection />
    </div>
  );
};

export default Login;
