import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
