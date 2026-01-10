import { ProtectedPae } from "@/components/CheckAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./_component/DashboardSidebar";
import UserProfileDropdown from "./_component/UserProfileDropdown";
import DashbardHeader from "./_component/DashbardHeader";

export default function DashboardLayout({children} : { children : React.ReactNode}) {
    return (
        <SidebarProvider>
            {/* sidebar */}
            <DashboardSidebar>
                <UserProfileDropdown />
            </DashboardSidebar>
            <main>
                <DashbardHeader/>
                {children}
                <ProtectedPae/>
            </main>
        </SidebarProvider>
    )
}