import BottomNav from "@/components/BottomNav/BottomNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import TopIdeas from "@/components/TopIdeas";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <BottomNav />
      <main className="flex-1 mb-16 md:mb-0 md:ml-64 xl:mr-96">{children}</main>
      <TopIdeas />
    </div>
  );
}
