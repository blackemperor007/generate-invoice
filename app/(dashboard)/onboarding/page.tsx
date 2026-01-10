"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { currencyOptions } from "@/lib/utils";
import { onboardingSchema } from "@/lib/zodSchema";
import { UserCircle } from "lucide-react";
import router from "next/router";
import { DefaultValues, useForm } from "react-hook-form";
import z from "zod";

export default function OnboardingPage() {

    const { register , handleSubmit, formState : { errors } } = useForm<z.infer<typeof onboardingSchema>>({
        // resolver : zodResolver(onboardingSchema),
        // DefaultValues : {
        //     currency : "USD"
        // }
    })

    


    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            <Card className="min-w-xs lg:min-w-sm w-full max-w-sm relative z-10">
                <CardHeader className="flex flex-col gap-3 items-center">
                    <div className="bg-purple-100 text-purple-600 p-4 rounded-full w-fit mx-auto">
                        <UserCircle className="size-12" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                        Presque terminé
                    </CardTitle>
                    <CardDescription className="text-center">
                        Entrez vos informations pour créer votre compte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label>Nom </Label>
                            <Input placeholder="e.g : John" type="text" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Prénom : </Label>
                            <Input placeholder="e.g : Doe" type="text" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Nom : </Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionnez la devise" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        Object.keys(currencyOptions).map((item: string, index: number) => {
                                            return (
                                                <SelectItem key={item} value={item}>
                                                    {item}
                                                </SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            Créer mon compte
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
