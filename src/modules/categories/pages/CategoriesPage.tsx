import { useEffect, useState } from "react";
import type { Category } from "../types/Category";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import { CategoriesTable } from "../components/CategoriesTable";
import { CreateCategory, getAllCategories, UpdateCategory } from "../api/categoriesService";
import { CategoriaInsertForm } from "../components/CategoriaInsertForm";
import { CategoriaUpdateForm } from "../components/CategoriaUpdateForm";



export const CategoriesPage = () => {


    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // TODO: Crear nueva categoria
    const [openInsert, setOpenInsert] = useState(false);

    // TODO: Editar categoria
    const [openUpdate, setOpenUpdate] = useState(false);
    const [categoryUpdate, setCategoryUpdate] = useState<Category | null>(null);


    // TODO: ESTADOS PARA PAGINACIÓN Y FILTRO
    const [page, setPage] = useState(0); // MUI usa base 0
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        fetchCategories();

    }, [page, rowsPerPage]);

    const fetchCategories = async () => {

        setLoading(true);

        try {
            const response = await getAllCategories(page + 1, rowsPerPage, searchTerm);
            setCategories(response.items);
            setTotalCount(response.totalCount);

        } catch (error) {
            setError('Error al cargar las categorías');
        }
        finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: number) => {
        console.log('Eliminar categoría con ID:', id);
    };


    // Handlers para la tabla
    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reiniciar a la primera página
    };

    const handleSearch = () => {
        setPage(0); // Reiniciar al buscar
        fetchCategories();
    };

    // TODO: Abrir formulario de creación
    const handleOpenInsert = () => {
        setOpenInsert(true);
    };

    // TODO: Cerrar formulario de creación
    const handleCloseInsert = () => {
        setOpenInsert(false);
    };


    // TODO: Abrir formulario de edicion
    const handleOpenEdit = (category: Category) => {

        setCategoryUpdate(category);
        setOpenUpdate(true);

    };

    // TODO: Cerrar formulario de edicion
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        setCategoryUpdate(null);
    };

    // TODO: función para insertar la categoria
    const handleInsertCategory = async (category: Category) => {

        try {

            const response = await CreateCategory(category);
            fetchCategories();

        } catch (error) {

            throw new Error("Error al crear la categoria")

        }

    };

    // TODO: función para actualizar la categoria
    const handleUpdateCategory = async (category: Category) => {

        try {

            await UpdateCategory(category);
            handleCloseUpdate();
            fetchCategories();

        } catch (error) {

            throw new Error("Error al actualizar la categoria")

        }

    };


    return (
        <div>

            <Paper elevation={3} sx={{ p: 2 }}>

                <Typography variant="h4" gutterBottom>
                    Categorías
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 4 }}>
                    <TextField
                        label="Buscar por código / nombre"
                        variant="outlined"
                        size="small"
                        sx={{ flexGrow: 1, minWidth: '200px' }}
                    />
                    <Button variant="contained" color="primary" startIcon={<SearchIcon />}>
                        Buscar
                    </Button>
                    <Button variant="outlined" color="success" startIcon={<FileDownloadIcon />}>
                        Exportar Excel
                    </Button>
                    <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleOpenInsert}>
                        Crear Categoría
                    </Button>
                </Box>

                {/* Aquí va el componente de tabla real */}
                <CategoriesTable
                    categories={categories}
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                    loading={loading} // Pasamos el estado de carga
                    // PASAMOS PROPS DE PAGINACIÓN
                    count={totalCount}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {loading && categories.length > 0 && <Alert severity="info">Actualizando...</Alert>}
            </Paper>

            <CategoriaInsertForm open={openInsert} onClose={handleCloseInsert} onSubmit={handleInsertCategory} />

            {categoryUpdate && (
                <CategoriaUpdateForm
                    open={openUpdate}
                    onClose={handleCloseUpdate}
                    category={categoryUpdate} // Aquí ya no es null, TS lo sabe
                    onSubmit={handleUpdateCategory}
                />
            )}

        </div>
    )
}
