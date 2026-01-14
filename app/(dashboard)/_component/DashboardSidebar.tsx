"use client";

import Logo from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BookAIcon, Home, Inbox, LayoutDashboardIcon, Settings } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfileDropdown from "./UserProfileDropdown";

// Menu items.
// const items = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: Home,
//   },
//   {
//     title: "Factures",
//     url: "/invoice",
//     icon: Inbox,
//   },
//   {
//     title: "Settings",
//     url: "/settings",
//     icon: Settings,
//   },
// ]

export default function DashboardSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Sidebar className="" collapsible="icon">
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href={"/dashboard"}
                className={cn(pathname === "/dashboard" && "bg-gray")}
              >
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href={"/invoice"}
                className={cn(pathname === "/invoice" && "bg-gray")}
              >
                <BookAIcon className="mr-2 h-4 w-4" />
                Facture
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link
                href={"/settings"}
                className={cn(pathname === "/settings" && "bg-red")}
              >
                <Settings className="mr-2 h-4 w-4"/>
                <span>Paramètres</span>
              </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>

            {children}
      </SidebarFooter>
    </Sidebar>
    // <Sidebar>
    //   <SidebarHeader className="p-4">
    //     <Logo />
    //   </SidebarHeader>
    //   <SidebarContent>
    //     <SidebarGroup>
    //       <SidebarGroupLabel>Application</SidebarGroupLabel>
    //       <SidebarGroupContent>
    //         <SidebarMenu>
    //           {items.map((item) => (
    //             <SidebarMenuItem key={item.title}>
    //               <SidebarMenuButton asChild>
    //                 <a href={item.url}>
    //                   <item.icon />
    //                   <span>{item.title}</span>
    //                 </a>
    //               </SidebarMenuButton>
    //             </SidebarMenuItem>
    //           ))}
    //         </SidebarMenu>
    //       </SidebarGroupContent>
    //     </SidebarGroup>
    //   </SidebarContent>

    //   <SidebarFooter>
    //     <SidebarMenu>
    //       <SidebarMenuItem></SidebarMenuItem>
    //     </SidebarMenu>
    //   </SidebarFooter>
    // </Sidebar>
  );
}
