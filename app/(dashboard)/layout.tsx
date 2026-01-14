import { ProtectedPage } from "@/components/CheckAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./_component/DashboardSidebar";
import UserProfileDropdown from "./_component/UserProfileDropdown";
import DashbardHeader from "./_component/DashbardHeader";
import { Suspense } from "react";
import DashboardHeader from "./_component/DashbardHeader";
import UserProfileDropDown from "./_component/UserProfileDropdown";

export default function DashboardLayout({children} : { children : React.ReactNode}) {
    return (
        <SidebarProvider>
            {/**sidebar**/}
            <DashboardSidebar>
                <UserProfileDropDown
                    isFullName
                    isArrowUp
                />
            </DashboardSidebar>
            <main className="w-full relative">
                <DashboardHeader/>
                <Suspense fallback={<p>Loading...</p>}>
                    {children}
                </Suspense>
                <ProtectedPage/>
            </main>
        </SidebarProvider>
    )
}