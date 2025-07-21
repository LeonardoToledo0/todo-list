
export interface Task {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface Column {
    id: string;
    title: string;
    tasks: Task[];
}
export interface CreateTaskInput {
    title: string;
    description: string | null;
}

export type TaskUpdate = Partial<Pick<Task, "title" | "description" | "completed">>;

export type TaskCreate = Omit<Task, "id" | "createdAt" | "updatedAt">;