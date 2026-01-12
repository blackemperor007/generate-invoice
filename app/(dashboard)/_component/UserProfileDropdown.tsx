import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/lib/auth";
import getAvatarName from "@/lib/getAvatarName";
import { ChevronDown, ChevronUp, User2 } from "lucide-react";
import UserProfile from "./UserProfile";
import { SidebarMenuButton } from "@/components/ui/sidebar";

interface IUserProfileDropdown {
  isFullName: boolean;
  isArrowUp: boolean;
}

export default async function UserProfileDropdown({
  isFullName,
  isArrowUp,
}: IUserProfileDropdown) {
  const session = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-100 rounded-md cursor-pointer">
          <Avatar className="border size-9 bg-neutral-30 cursor-pointer">
            <AvatarImage src={session?.user?.image as string} />
            <AvatarFallback>
              {getAvatarName(
                session?.user?.firstName as string,
                session?.user?.lastName as string | null
              )}
            </AvatarFallback>
          </Avatar>
          {isFullName && (
            <div>
              <p className="text-ellipsis line-clamp-1 font-medium">
                <span>{session?.user?.firstName}</span>{" "}
                <span>{session?.user?.lastName}</span>
              </p>
            </div>
          )}

          {isArrowUp && (
            <ChevronDown size={16} className="transition-all ml-auto" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[250px]">
        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* user profile */}
        <UserProfile />
        <DropdownMenuItem
          onClick={async () => {
            "use server";
            await signOut();
          }}
          className="bg-red-50 text-red-500 hover:bg-red-100 font-medium"
        >
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  );
}
