"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateEditInvoice from "../../_component/CreateEditInvoice";
import { useForm } from "react-hook-form";
import { InvoiceSchemaZod } from "@/lib/zodSchema";
import z from "zod";

export default function InvoiceCreate() {
    const router = useRouter()
    const {} = useForm<z.infer<typeof InvoiceSchemaZod>>()
  return (
    <div className="p-4">
            <div className="flex items-center gap-4">
                <Button size={"icon"} onClick={()=>router.back()}>
                    <ArrowLeft/>
                </Button>
                <h1 className="text-xl font-semibold">Nouvelle Facture</h1>
            </div>

            <CreateEditInvoice/>
        </div>
  )
}

