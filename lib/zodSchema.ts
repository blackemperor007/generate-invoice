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