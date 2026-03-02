import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Por favor, ingresa un correo electrónico válido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
})

export type LoginCredentials = z.infer<typeof LoginSchema>