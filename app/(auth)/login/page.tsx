
import SubmitButton from "@/components/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "@/lib/auth";

export default function LoginPage(){
    const session = auth()

    console.log(session)
    return (
        <Card className="max-w-sm min-w-xs lg:min-w-sm">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Entrez votre email pour vous connecter</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-6"
                    action = {async(formdata)=>{
                        "use server"
                        await signIn("resend",formdata)
                    }} 
                >
                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input
                            placeholder="hello@example.com"
                            required
                            type="email"
                            name="email"
                        />
                    </div>
                    <SubmitButton title="Login"/>
                </form>
            </CardContent>
        </Card>
    )
}