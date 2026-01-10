"use client";

import Logo from "@/components/Logo";
import {Sidebar,SidebarContent,SidebarFooter,SidebarHeader,SidebarMenu,SidebarMenuButton,SidebarMenuItem,} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BookAIcon, LayoutDashboardIcon, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfileDropdown from "./UserProfileDropdown";

export default function DashboardSidebar({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href={"/dashboard"}
                className={cn(pathname === "/dashboard" && "bg-white")}
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
                className={cn(pathname === "/invoice" && "bg-white")}
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
                className={cn(pathname === "/settings" && "bg-white")}
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
  );
}
