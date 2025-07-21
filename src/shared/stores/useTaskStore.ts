import { create } from "zustand";
import { Task, TaskUpdate } from "@/shared/types/Task";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById
} from "@/services/tasksService";

interface TaskStore {
    tasks: Task[];
    loading: boolean;
    fetchTasks: (userId: string) => Promise<void>;
    addTask: (data: { title: string; description?: string | null }) => Promise<void>;
    fetchTaskById: (id: string) => Promise<Task | null>;
    updateTask: (id: string, data: TaskUpdate) => Promise<void>;
    removeTask: (id: string) => Promise<void>;
    setTasksFromColumns: (columns: Record<string, Task[]>) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    loading: false,

    fetchTasks: async (userId?: string) => {
        set({ loading: true });
        try {
            if (!userId) {
                console.error("UserId é obrigatório para buscar tasks");
                set({ loading: false });
                return;
            }
            const tasks = await getTasks(userId);
            set({ tasks });
        } catch (err) {
            console.error("Erro ao buscar tarefas:", err);
        } finally {
            set({ loading: false });
        }
    },
    fetchTaskById: async (id: string): Promise<Task | null> => {
        set({ loading: true });
        try {
            const task = await getTaskById(id);
            return task || null;
        } catch (error) {
            console.error("Erro ao buscar tarefa:", error);
            return null;
        } finally {
            set({ loading: false });
        }
    },



    addTask: async (data) => {
        try {
            const newTask = await createTask(data);
            set((state) => ({
                tasks: [...state.tasks, newTask],
            }));
        } catch (err) {
            console.error("Erro ao adicionar tarefa:", err);
        }
    },

    updateTask: async (id, data) => {
        try {
            const updated = await updateTask(id, data);
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? updated : task
                ),
            }));
        } catch (err) {
            console.error("Erro ao atualizar tarefa:", err);
        }
    },

    removeTask: async (id) => {
        try {
            await deleteTask(id);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            }));
        } catch (err) {
            console.error("Erro ao remover tarefa:", err);
        }
    },

    setTasksFromColumns: (columns) => {
        const updatedTasks = Object.values(columns).flat();
        set({ tasks: updatedTasks });
    },
}));
