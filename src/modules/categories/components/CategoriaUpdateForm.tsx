import { Box, Button, Divider, Grid, Modal, TextField, Typography } from "@mui/material";
import { CategorySchema, type Category } from "../types/Category";
import React, { useEffect, useState } from "react";


interface CategoriaUpdateFormProps {
    open: boolean;
    onClose: () => void;
    category: Category;
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

export const CategoriaUpdateForm = ({ open, onClose, category, onSubmit }: CategoriaUpdateFormProps) => {

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [categoryUpdate, setCategoryUpdate] = useState<Category>(category);

    useEffect(() => {

        setCategoryUpdate(category);
        setErrors({});

    }, [category, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryUpdate((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {

        const result = CategorySchema.safeParse(categoryUpdate);

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
        onClose();

    };

    return (
        <>
            <Modal open={open} onClose={onClose} keepMounted aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
                <Box sx={style} component="form" >
                    <Typography variant="h5">EDITAR CATEGORÍA</Typography>

                    <Divider sx={{ mb: 3, mt: 2 }} />

                    <Grid container spacing={2}>

                        <input type="hidden" name="id" value={categoryUpdate.id} />

                        <Grid size={12}>
                            <TextField name="codigo" label="Código" variant="outlined" value={categoryUpdate.codigo} error={!!errors.codigo} helperText={errors.codigo} onChange={handleChange} fullWidth />
                        </Grid>

                        <Grid size={12}>
                            <TextField name="nombre" label="Nombre" variant="outlined" value={categoryUpdate.nombre} error={!!errors.nombre} helperText={errors.nombre} onChange={handleChange} fullWidth />
                        </Grid>

                        <Grid size={6}>
                            <Button variant="contained" color="secondary" onClick={onClose} fullWidth>Cerrar</Button>
                        </Grid>

                        <Grid size={6}>
                            <Button variant="contained" color="primary" onClick={handleSave} fullWidth>Actualizar</Button>
                        </Grid>

                    </Grid>


                </Box>
            </Modal>
        </>
    )
}
