import axios from "axios";
import type { Category } from "../types/Category";


const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_URL);

// TODO: Crear una categoria
export const CreateCategory = async (category: Category) => {

    try {

        const response = await axios.post(`${API_URL}/v1/categorias`, category);
        return response.data;

    } catch (error) {

        console.error("Error al crear la categoria", error)
        throw new Error("Error al crear la categoria")
    }


}

// TODO: Actualizar una categoria
export const UpdateCategory = async (category: Category) => {

    try {

        const response = await axios.put(`${API_URL}/v1/categorias/${category.id}`, category);
        return response.data;

    } catch (error) {

        console.error("Error al actualizar la categoria", error)
        throw new Error("Error al actualizar la categoria")
    }

}



// TODO: Eliminar una categoria
export const DeleteCategory = async (id: number) => {

    try {

        const response = await axios.delete(`${API_URL}/v1/categorias/${id}`);
        return response.data;

    } catch (error) {

        console.error("Error al eliminar la categoria", error)
        throw new Error("Error al eliminar la categoria")
    }

}


// TODO: Listar las categorias
export const getAllCategories = async (pageNumber: number, pageSize: number, searchTerm?: string) => {
    try {

        const response = await axios.get(`${API_URL}/v1/categorias`, {
            params: {
                pageNumber,
                pageSize,
                searchTerm
            }
        });

        return response.data;

    } catch (error) {
        console.error("Error al obtener las categorías", error);
        throw new Error("Error al obtener las categorías");
    }
};
