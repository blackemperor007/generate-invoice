import { ProtectedPae } from "@/components/CheckAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./_component/DashboardSidebar";
import UserProfileDropdown from "./_component/UserProfileDropdown";
import DashbardHeader from "./_component/DashbardHeader";
import { Suspense } from "react";

export default function DashboardLayout({children} : { children : React.ReactNode}) {
    return (
        <SidebarProvider>
            {/* sidebar */}
            <DashboardSidebar>
                <UserProfileDropdown
                isFullName
                isArrowUp
                />
            </DashboardSidebar>
            <main className="w-full relative">
                <DashbardHeader/>
                    <Suspense fallback={<div className="p-4">Loading...</div>}>
                        {children}
                    </Suspense>
                <ProtectedPae/>
            </main>
        </SidebarProvider>
    )
}