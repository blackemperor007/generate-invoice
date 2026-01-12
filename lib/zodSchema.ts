import z from "zod";

export const onboardingSchema = z.object({
    firstName: z
        .string()
        .min(3, { message: "Le prénom est requis"})
        .max(50, { message: "Le prénom doit contenir au maximum 50 caractères"}),
    lastName: z
        .string()
        .min(3, { message: "Le nom est requis"})
        .max(50, { message: "Le nom doit contenir au maximum 50 caractères"}),
    currency: z
        .string({ message : "Sélectionner la devise" })
        .optional(),
});

export const InvoiceSchemaZod = z.object({
    invoice_no : z.string({ message : "invoice no. required "}),
    invoice_date : z.date({message : "Invoice date is required"}),
    due_date : z.date({ message : "Invoice due date"}),
    currency : z.string({ message : "currency is required"}),

    from : z.object({
        name : z.string()
        .min(3, {message : "name is required "})
        .max(100,{ message : "name is too longer "}),
        email : z.string().email({ message : "email is required"}),
        address1: z.string({ message : "Address is required"}),
        address2: z.string().optional(),
        address3: z.string().optional(),
    }),

    to : z.object({
        name : z.string()
        .min(3, {message : "name is required "})
        .max(100,{ message : "name is too longer "}),
        email : z.string().email({ message : "email is required"}),
        address1: z.string({ message : "Address is required"}),
        address2: z.string().optional(),
        address3: z.string().optional(),
    }),

    items : z.array(z.object({
        name : z.string()
        .min(3, {message : "item name is required "})
        .max(100,{ message : "name is too longer "}),
        quantity : z.number(),
        price: z.number(),
        total: z.number(),
    })),

    sub_total : z.number(),
    discount : z.number().default(0),

    tax_percentage : z.number().default(0),

    total :  z.number(),

    notes :  z.string().optional(),

    status : z.enum(["PAYER", "NON PAYER", "ANNULER"]) ,
})