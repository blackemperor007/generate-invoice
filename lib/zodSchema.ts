import z from "zod";

export const onboardingSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Le prénom est requis" })
    .max(50, { message: "Le prénom doit contenir au maximum 50 caractères" }),
  lastName: z
    .string()
    .min(3, { message: "Le nom est requis" })
    .max(50, { message: "Le nom doit contenir au maximum 50 caractères" }),
  currency: z.string({ message: "Sélectionner la devise" }).optional(),
});

export const InvoiceSchemaZod = z.object({
  invoice_no: z.string().min(1, { message: "invoice no. required " }),
  invoice_date: z.date({ message: "Invoice date is required" }),
  due_date: z.date({ message: "Invoice due date" }),
  currency : z.string().min(1, {message: "currency is required"}),

  from: z.object({
    name: z
      .string()
      .min(3, { message: "name is required " })
      .max(100, { message: "name is too longer " }),
    email: z.string().email({ message: "email is required" }),
    address1: z.string({ message: "Address is required" }),
    address2: z.string().optional(),
    address3: z.string().optional(),
  }),

  to: z.object({
    name: z
      .string()
      .min(3, { message: "name is required " })
      .max(100, { message: "name is too longer " }),
    email: z.string().email({ message: "email is required" }),
    address1: z.string().min(5, { message: "Address is required" }),
    address2: z.string().optional(),
    address3: z.string().optional(),
  }),

  items: z.array(
    z.object({
      item_name: z
        .string()
        .min(3, { message: "item name is required " })
        .max(100, { message: "name is too longer " }),
      quantity: z.number().min(0, { message : "Quantity can't be negative"}),
      price: z.number().min(0, { message : "price can't be negative"}),
      total: z.number().min(0, { message : "total can't be negative"}),
    })
  ),

  sub_total: z.number(),
  discount: z.number(),

  tax_percentage: z.number(),

  total: z.number(),

  notes: z.string().optional(),

  // status: z.enum(["PAYER", "NON PAYER", "ANNULER"]),
});
