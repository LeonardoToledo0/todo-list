import { TaskUpdate, } from "@/shared/types/Task";
import { apiClient } from "./apiClient";


export const getTasks = async (userId: string) => {
    const res = await apiClient.get(`/tasks?userId=${userId}`);
    return res.data;
};

export const createTask = async (data: { title: string; description?: string | null }) => {
    const res = await apiClient.post("/tasks", data);
    console.log("Resposta da API /tasks:", res);
    return res.data;
};

export const updateTask = async (id: string, data: TaskUpdate) => {
    const res = await apiClient.put(`/tasks/${id}`, data);
    return res.data;
};

export const getTaskById = async (id: string) => {
    const res = await apiClient.get(`/tasks/${id}`);
    return res.data;
}

export const deleteTask = async (id: string) => {
    const res = await apiClient.delete(`/tasks/${id}`);
    return res.data;
};
