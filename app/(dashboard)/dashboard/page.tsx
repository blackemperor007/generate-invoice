import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export default function DashboardPage(){
    return (
        <div>
            <div>
                Tableau de Board
            </div>
            <Button onClick={async()=>{
                "use server"
                await signOut()
            }}>
                Deconnexion
            </Button>
        </div>
    )
}