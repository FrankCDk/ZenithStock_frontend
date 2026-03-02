import { Box, Button, Divider, Grid, Modal, TextField, Typography } from "@mui/material";
import { CategorySchema, type Category } from "../types/Category";
import React, { useState } from "react";

interface CategoriaInsertFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (category: Category) => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};


export const CategoriaInsertForm = ({ open, onClose, onSubmit }: CategoriaInsertFormProps) => {

    const initialFormState: Category = { id: 0, codigo: '', nombre: '' };
    const [category, setCategory] = useState<Category>(initialFormState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    // TODO: Manejando el cambio de los atributos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategory((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Limpiamos el error del campo cuando el usuario empieza a escribir
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }

    const handleSave = () => {

        const result = CategorySchema.safeParse(category);

        if (!result.success) {
            // Si hay errores, los transformamos en un objeto fácil de leer
            const formattedErrors: { [key: string]: string } = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as string;
                formattedErrors[path] = issue.message;
            });

            setErrors(formattedErrors);
            return; // Detenemos la ejecución
        }

        onSubmit(result.data);
        setCategory(initialFormState);
        setErrors({});
        onClose();
    }

    return (
        <>
            <Modal open={open} onClose={onClose} keepMounted aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
                <Box sx={style} component="form" >
                    <Typography variant="h5">CREAR CATEGORÍA</Typography>

                    <Divider sx={{ mb: 3, mt: 2 }} />

                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField name="codigo" label="Código" variant="outlined" value={category.codigo} error={!!errors.codigo} helperText={errors.codigo} onChange={handleChange} fullWidth />
                        </Grid>

                        <Grid size={12}>
                            <TextField name="nombre" label="Nombre" variant="outlined" value={category.nombre} error={!!errors.nombre} helperText={errors.nombre} onChange={handleChange} fullWidth />
                        </Grid>

                        <Grid size={6}>
                            <Button variant="contained" color="secondary" onClick={onClose} fullWidth>Cerrar</Button>
                        </Grid>

                        <Grid size={6}>
                            <Button variant="contained" color="primary" onClick={handleSave} fullWidth>Guardar</Button>
                        </Grid>

                    </Grid>


                </Box>
            </Modal>
        </>
    )
}
