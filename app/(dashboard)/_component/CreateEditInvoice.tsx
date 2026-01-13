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
import { Calendar1Icon, Trash, WrapText } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
    control,
  } = useForm<z.infer<typeof InvoiceSchemaZod>>({
    resolver: zodResolver(InvoiceSchemaZod),
    defaultValues: {
      items: [
        {
          item_name: "",
          quantity: 0,
          price: 0,
          total: 0,
        },
      ],
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // items name
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  // total of items
  const items = watch("items");
  useEffect(() => {
    items.forEach((item, index) => {
      const quantity = parseFloat(item.quantity.toString()) || 0;
      const price = parseFloat(item.price.toString()) || 0;

      const total = quantity * price;

      setValue(`items.${index}.total`, total);
    });
    const sub_total = items.reduce((preve, curr) => preve + curr.total, 0);
    setValue("sub_total", sub_total);
  }, [JSON.stringify(items), setValue]);

  // add new item row
  const handleAddNewItemRow = (e: any) => {
    e.preventDefault();
    append({
      item_name: "",
      quantity: 0,
      price: 0,
      total: 0,
    });
  };

  //remove item row
  const handleRemoveItemRow = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: z.infer<typeof InvoiceSchemaZod>) => {
    console.log(data);
  };

  const sub_total = watch("sub_total") || 0;
  const discount = watch("discount") || 0;
  const sub_totalRemoveDiscount = sub_total - discount;
  const taxAmount =
    (sub_totalRemoveDiscount * watch("tax_percentage")) / 100 || 0
  
  const totalAmount = sub_totalRemoveDiscount - taxAmount

  const totalAmountCurrencyFormat = new Intl.NumberFormat('en-us', {
    style : 'currency',
    currency : currency
  }).format(totalAmount)

  return (
    <form className="grid py-4 gap-4 lg:gap-6">
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
        {/* from  (current user details) */}
        <div className="grid gap-2">
          <Label>Prestataire</Label>
          <div>
            <Input
              type="text"
              placeholder="De : "
              {...register("from.name", { required: true })}
            />
            {errors.from?.name && (
              <p className="text-xs text-red-500">{errors.from.name.message}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="joe@example.com"
              {...register("from.email", { required: true })}
            />
            {errors.from?.email && (
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
            {errors.from?.address1 && (
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
            {errors.from?.address2 && (
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
            {errors.from?.address3 && (
              <p className="text-xs text-red-500">
                {errors.from.address3.message}
              </p>
            )}
          </div>
        </div>

        {/* to (client details) */}
        <div className="grid gap-2">
          <Label>Clients</Label>
          <div>
            <Input
              type="text"
              placeholder="Pour : "
              {...register("to.name", { required: true })}
            />
            {errors.to?.name && (
              <p className="text-xs text-red-500">{errors.to.name.message}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="joe@example.com"
              {...register("to.email", { required: true })}
            />
            {errors.to?.email && (
              <p className="text-xs text-red-500">{errors.to.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Bldg No. / Flat No. / Shop No. / Building Name"
              {...register("to.address1", { required: true })}
            />
            {errors.to?.address1 && (
              <p className="text-xs text-red-500">
                {errors.to.address1.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Street name / Landmark"
              {...register("to.address2", { required: true })}
            />
            {errors.to?.address2 && (
              <p className="text-xs text-red-500">
                {errors.to.address2.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="City / State / country / Pincode"
              {...register("to.address3", { required: true })}
            />
            {errors.to?.address3 && (
              <p className="text-xs text-red-500">
                {errors.to.address3.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* items details  */}

      <div className="grid gap-2">
        <div className="grid grid-cols-6 bg-neutral-50 py-1 px-1 gap-2">
          <div className="col-span-3">Service</div>
          <div>Quantité</div>
          <div>Prix</div>
          <div>Total</div>
        </div>

        {fields.map((item, index) => {
          return (
            <div className="grid grid-cols-6 gap-2" key={index}>
              <div className="col-span-3">
                <Input
                  placeholder="Service ou produits rendu"
                  type="text"
                  {...register(`items.${index}.item_name`, { required: true })}
                />
                {errors.items && errors.items[index]?.item_name && (
                  <p className="text-xs text-red-500">
                    {errors.items[index]?.item_name.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Quantité"
                  type="number"
                  {...register(`items.${index}.quantity`, { required: true })}
                />
                {errors.items && errors.items[index]?.quantity && (
                  <p className="text-xs text-red-500">
                    {errors.items[index]?.quantity.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Prix Unitaire"
                  type="number"
                  {...register(`items.${index}.price`, { required: true })}
                />
                {errors.items && errors.items[index]?.price && (
                  <p className="text-xs text-red-500">
                    {errors.items[index]?.price.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <Input
                  placeholder="Total prix"
                  type="number"
                  disabled
                  {...register(`items.${index}.total`, { required: true })}
                />
                {errors.items && errors.items[index]?.total && (
                  <p className="text-xs text-red-500">
                    {errors.items[index]?.total.message}
                  </p>
                )}
                {/* {
                index === 0 && (
                  <div className="absolute top-0 right-0 text-red-500">
                <Button type="button" className="bg-red-50" variant={'ghost'} size={'icon'} onClick={ ()=> handleRemoveItemRow(index)}>
                  <Trash/>
                </Button>
              </div>
                )
              } */}
                <div className="absolute top-0 right-0 text-red-500">
                  <Button
                    type="button"
                    className="bg-red-50"
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => handleRemoveItemRow(index)}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        <Button className="w-fit" type="button" onClick={handleAddNewItemRow}>
          Ajouter
        </Button>
      </div>

      {/* sub total, discount, tax, total  */}
      <div>
        <div className="max-w-sm w-full ml-auto grid gap-2">
          <div className="grid grid-cols-2">
            <Label>Sub Total :</Label>
            <Input
              value={watch("sub_total") ?? ""}
              onChange={() => {}}
              disabled
              placeholder="Sub total"
              type="number"
            />
          </div>
          <div className="grid grid-cols-2">
            <Label>Discount :</Label>
            <Input
              placeholder="Discount"
              value={watch("discount") ?? ""}
              onChange={(e) => {
                setValue("discount", Number(e.target.value));
              }}
              type="number"
            />
          </div>
          <div className="grid grid-cols-2">
            <Label></Label>
            <Input
              placeholder="Sub total"
              value={sub_totalRemoveDiscount ?? ""}
              disabled
              type="number"
            />
          </div>
          <div className="grid grid-cols-2">
            <Label>
              Tax :{" "}
              <Input
                placeholder="%"
                type="text"
                className="min-w-14 w-14 max-w-14"
                {...register("tax_percentage")}
              />
              %{" "}
            </Label>
            <Input
              placeholder="Tax amount"
              disabled
              type="number"
              value={taxAmount}
            />
          </div>
          <div className="grid grid-cols-2">
            <Label>Total : </Label>
            <Input placeholder="Total" disabled type="number" className="font-semibold"  value={totalAmount ?? ""}/>
          </div>

          <div className="flex items-center justify-center min-h-14 font-bold 5xl">
            {totalAmountCurrencyFormat}
          </div>
        </div>
      </div>
    </form>
  );
}
