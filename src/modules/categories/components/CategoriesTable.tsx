import type { Category } from "../types/Category";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CategoriesTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
    loading: boolean;
    // NUEVAS PROPS
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export const CategoriesTable = ({
    categories,
    onEdit,
    onDelete,
    loading,
    count,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange
}: CategoriesTableProps) => {

    // Si la lista está vacía, mostramos un mensaje de retroalimentación
    if (categories.length === 0 && !loading) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay categorías registradas.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Usa el botón "Crear Categoría" para empezar.
                </Typography>
            </Box>
        );
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}> {/* Fija una altura máxima para el scroll */}
                <Table stickyHeader aria-label="tabla de categorías">
                    {/* ENCABEZADO */}
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>CÓDIGO</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* CUERPO DE LA TABLA */}
                    <TableBody>
                        {!loading && categories.map((category) => (
                            <TableRow
                                key={category.id}
                                hover
                                // Pequeño estilo para indicar que la fila está siendo actualizada (si es necesario)
                                sx={{
                                    opacity: loading ? 0.8 : 1,
                                    transition: 'opacity 0.3s'
                                }}
                            >
                                <TableCell align="center">{category.id}</TableCell>
                                <TableCell align="center">{category.codigo}</TableCell>
                                <TableCell align="left">{category.nombre || 'N/A'}</TableCell>

                                {/* CELDAS DE ACCIONES */}
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        startIcon={<EditIcon />}
                                        onClick={() => onEdit(category)} // Dispara la función del padre
                                        sx={{ mr: 1 }}
                                        disabled={loading} // Desactivar si hay una operación en curso
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => onDelete(category.id!)} // Dispara la función del padre
                                        disabled={loading} // Desactivar si hay una operación en curso
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Opcional: Paginación (Si la lista es grande, esto es fundamental) */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={count} // Total de registros desde el backend
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                labelRowsPerPage="Filas por página"
            />
        </Paper>

    )
}
