import Sidebar from "@/components/Sidebar/Sidebar";
import TopIdeas from "@/components/TopIdeas";
import { Toaster } from "react-hot-toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 xl:mr-96">{children}</main>
      <TopIdeas />
    </div>
  );
}
