"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { InvoiceSchemaZod } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
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
    setValue,
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
          {errors?.invoice_no && (
            <p className="text-xs text-red-500">{errors.invoice_no.message}</p>
          )}
        </div>

        <div></div>

        <div className="grid">
          <div className="flex items-center">
            <div className="min-w-9 min-h-9 text-center border h-full flex justify-center items-center bg-gray rounded-l-md">
              <Calendar1Icon className="size-4" />
            </div>
            <Popover>
              <PopoverTrigger className="w-full" asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    !watch("invoice_date") && "text-muted-foreground",
                    "justify-start font-normal rounded-l-none flex-1 w-full"
                  )}
                >
                  {watch("invoice_date") ? (
                    format(watch("invoice_date"), "dd MMMM yyyy")
                  ) : (
                    <span>Choisir une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={watch("invoice_date")}
                  onSelect={(date) => {
                    setValue("invoice_date", date || new Date(), {
                      shouldValidate: true,
                    });
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors?.invoice_no && (
            <p className="text-xs text-red-500">{errors.invoice_no.message}</p>
          )}
        </div>

        <div className="grid">
          <div className="flex items-center">
            <div className="min-w-9 min-h-9 text-center border h-full flex justify-center items-center bg-gray rounded-l-md">
              <Calendar1Icon className="size-4" />
            </div>
            <Popover>
              <PopoverTrigger className="w-full" asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    !watch("due_date") && "text-muted-foreground",
                    "justify-start font-normal rounded-l-none flex-1 w-full"
                  )}
                >
                  {watch("due_date") ? (
                    format(watch("due_date"), "dd MMMM yyyy")
                  ) : (
                    <span>Date limite</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={watch("due_date")}
                  onSelect={(date) => {
                    setValue("due_date", date || new Date(), {
                      shouldValidate: true,
                    });
                  }}
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors?.invoice_no && (
            <p className="text-xs text-red-500">{errors.invoice_no.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        <div className="grid gap-2">
          {/* from  (current user details) */}
          <Label>Prestataire</Label>
          <div>
            <Input
              type="text"
              placeholder="De : "
              {...register("from.name", { required: true })}
            />
            {errors?.from?.name && (
              <p className="text-xs text-red-500">{errors.from.name.message}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="joe@example.com"
              {...register("from.email", { required: true })}
            />
            {errors?.from?.email && (
              <p className="text-xs text-red-500">
                {errors.from.email.message}
              </p>
            )}
          </div>
        </div>
        <div>
          {/* to (client details) */}
          <Label>Clients</Label>
          <div>
            <Input
              type="text"
              placeholder="De : "
              {...register("from.name", { required: true })}
            />
            {errors?.from?.name && (
              <p className="text-xs text-red-500">{errors.from.name.message}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="joe@example.com"
              {...register("from.email", { required: true })}
            />
            {errors?.from?.email && (
              <p className="text-xs text-red-500">
                {errors.from.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Bldg No. / Flat No. / Shop No. / Building Name"
              {...register("from.address1", { required: true })}
            />
            {errors?.from?.address1 && (
              <p className="text-xs text-red-500">
                {errors.from.address1.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Street name / Landmark"
              {...register("from.address2", { required: true })}
            />
            {errors?.from?.address2 && (
              <p className="text-xs text-red-500">
                {errors.from.address2.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="City / State / country / Pincode"
              {...register("from.address3", { required: true })}
            />
            {errors?.from?.address3 && (
              <p className="text-xs text-red-500">
                {errors.from.address3.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
