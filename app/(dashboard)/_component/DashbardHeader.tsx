import { auth } from '@/lib/auth'
import UserProfileDropdown from './UserProfileDropdown'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ModeToggle } from './ThemeToggle'

export default async function DashbardHeader() {
  const session = await auth()
  return (
    <header className="sticky top-0 h-12 w-full border-b backdrop-blur-3xl flex items-center px-4 ">
        <SidebarTrigger/>
        <div>
          Bienvenue <span className='font-semibold'>
            <span>{session?.user.firstName ?? "_"}</span>
            {" "}
            <span>{session?.user.lastName ?? "_"}</span>
          </span>
        </div>

        <div className='ml-auto w-fit'>
          <UserProfileDropdown
          isFullName = {false}
          isArrowUp = {false}
          />
        </div>
        <ModeToggle/>
    </header>
  )
}

