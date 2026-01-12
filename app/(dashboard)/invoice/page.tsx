import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function InvoicePage(){
    return (
        <div className="p-4">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl font-semibold">Factures</h1>
                <Link href={"/invoice/create"} className={cn(buttonVariants(), "cursor-pointer")}>
                    Créer une facture
                </Link>
            </div>
        </div>
    )
}