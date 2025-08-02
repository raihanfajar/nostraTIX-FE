import { AppSidebar } from "@/components/orgsidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="relative top-0 left-0 mt-1 h-full p-1 text-white" />
      <main className="w-screen">{children}</main>
    </SidebarProvider>
  );
}
