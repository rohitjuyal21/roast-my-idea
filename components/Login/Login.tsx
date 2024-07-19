import LoginLeftSection from "./LoginLeftSection";
import LoginMain from "./LoginMain";

const Login = () => {
  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      <LoginLeftSection />
      <LoginMain />
    </div>
  );
};

export default Login;
