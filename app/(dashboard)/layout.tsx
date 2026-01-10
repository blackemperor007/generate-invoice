import { ProtectedPae } from "@/components/CheckAuth";

export default function DashboardLayout({children} : { children : React.ReactNode}) {
    return (
        <main>
            {children}
            <ProtectedPae/>
        </main>
    )
}