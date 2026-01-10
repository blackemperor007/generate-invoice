"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, MailIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VerifyEmail(){
    const router = useRouter()
    return (
        <Card className="min-w-xs lg:min-w-sm">
            <CardHeader className="flex flex-col gap-3 items-center">
                <div className="bg-purple-100 text-purple-600 p-4 rounded-full w-fit mx-auto">
                    <MailIcon className="size-12"/>
                </div>
                <CardTitle className="text-xl font-semibold">Check your email</CardTitle>
                <CardDescription className="text-center">
                    Cliquez sur le lien de vérification envoyé
                    à votre adresse email.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex items-center gap-2 p-4 bg-yellow-50 text-yellow-600">
                    <AlertCircle className="size-5"/>
                    <span>Consulter vos dossier Spam aussi</span>
                </div>
                <Button onClick={()=>router.back()} className="w-full" variant={"outline"}>
                    <ArrowLeft className="size-4" />
                    Retour à la page de connexion
                </Button>
            </CardContent>
        </Card>
    )
}