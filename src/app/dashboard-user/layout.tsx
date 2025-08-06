import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user/user-sidebar";
import AuthProvider from "@/providers/AuthProviders";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider className="font-anton">
        <UserSidebar />
        <SidebarTrigger className="relative top-0 left-0 mt-1 h-full p-1 text-white" />
        <main className="w-screen">{children}</main>
      </SidebarProvider>
    </AuthProvider>
  );
}
