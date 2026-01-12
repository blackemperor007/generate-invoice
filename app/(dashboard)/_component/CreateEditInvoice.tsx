"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { InvoiceSchemaZod } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface ICreateEditInvoice {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined | null;
  currency: string | undefined;
}

export default function CreateEditInvoice({
  firstName,
  lastName,
  email,
  currency,
}: ICreateEditInvoice) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<z.infer<typeof InvoiceSchemaZod>>({
    resolver: zodResolver(InvoiceSchemaZod),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (data: z.infer<typeof InvoiceSchemaZod>) => {
    console.log(data);
  };

  return (
    <form className="grid py-4">
      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        <div className="grid">
          <div className="flex items-center">
            <div className="min-w-9 min-h-9 text-center border h-full flex justify-center items-center bg-gray rounded-l-md">
              #
            </div>
            <Input
              type="text"
              placeholder="Invoice No."
              className="rounded-l-none"
              {...register("invoice_no", { required: true })}
            />
          </div>
          {
            errors?.invoice_no && (
                <p className="text-xs text-red-500">{errors.invoice_no.message}</p>
            )
          }
        </div>

        <div></div>

        <div className="grid">
          <div className="flex items-center">
            <div className="min-w-9 min-h-9 text-center border h-full flex justify-center items-center bg-gray rounded-l-md">
              <Calendar1Icon className="size-4"/>
            </div>
            <Popover>
                <PopoverTrigger className="w-full" asChild>
                    <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                            "pl-3 text-left font-normal",
                            !watch('invoice_date') && "text-muted-foreground", 
                            "justify-start font-normal rounded-l-none flex-1 w-full"
                        )}
                    >
                        {watch('invoice_date') ? (
                            format(watch('invoice_date'), "ppp")
                        ) : (
                            <span>Choisir une date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="range"
                        // selected={watch('invoice_date')}
                    //     onSelect={(date)=>{
                    //         setValue('invoice_date', date || new Date() , { shouldValidate : true })
                    //     }}
                    />
                </PopoverContent>
            </Popover>
          </div>
          {
            errors?.invoice_no && (
                <p className="text-xs text-red-500">{errors.invoice_no.message}</p>
            )
          }
        </div>
      </div>
    </form>
  );
}
