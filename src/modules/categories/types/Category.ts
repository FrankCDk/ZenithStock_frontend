import { z } from "zod";

// TODO: Esquema de validacion de Categoria
export const CategorySchema = z.object({
    id: z.number().optional(), // ID opcional para la creación
    codigo: z
        .string()
        .nonempty("El codigo es obligatorio")
        .min(3, "El codigo debe tener al menos 3 caracteres."),
    nombre: z
        .string()
        .nonempty("El nombre es obligatorio")
        .max(255, "El nombre no puede exceder los 255 caracteres.")
        .optional()
        .nullable()
});

// TODO: Tipo de datos de Categoria
export type Category = z.infer<typeof CategorySchema>;

// TODO: Esquema para la creación / edición de Categoria
export type CategoryPayload = Omit<Category, 'id'> & { id?: number };