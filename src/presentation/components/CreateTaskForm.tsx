"use client";

import { useEffect, useState } from "react";
import { Task } from "@/shared/types/Task";
import { useTaskStore } from "@/shared/stores/useTaskStore";
import toast from "react-hot-toast";

interface CreateTaskFormProps {
    onTaskCreated?: (task: Task) => void;
    formType: "create" | "update";
    task?: Task;
    taskId?: string;
}

export const CreateTaskForm = ({
    onTaskCreated,
    formType,
    task,
}: CreateTaskFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addTask = useTaskStore((state) => state.addTask);
    const updateTask = useTaskStore((state) => state.updateTask);

    useEffect(() => {
        if (formType === "update" && task) {
            setTitle(task.title);
            setDescription(task.description || "");
        }
    }, [formType, task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            if (formType === "create") {
                const newTask = await addTask({
                    title: title.trim(),
                    description: description.trim() || null,
                });

                if (onTaskCreated && newTask) onTaskCreated(newTask);
                toast.success("Tarefa criada com sucesso!");
                setTitle("");
                setDescription("");
            } else if (formType === "update" && task) {
                await updateTask(task.id, {
                    title: title.trim(),
                    description: description.trim() || null,
                });

                toast.success("Tarefa atualizada com sucesso!");
                setTitle("");
                setDescription("");
            }

        } catch (error) {
            toast.error(
                formType === "create"
                    ? "Falha ao criar tarefa, tente novamente."
                    : "Falha ao atualizar tarefa, tente novamente."
            );
            console.error("Erro:", error);
        }
    };

    return (
        <div className="flex flex-col w-full mx-auto justify-center items-center my-10 md:my-30 md:px-4">
            <div>
                <h1 className="text-white text-3xl md:text-4xl font-bold mb-8 text-center">
                    Tasks Drag & Drop
                </h1>
                <h2 className="text-white text-xl md:text-2xl mb-4 text-center">
                    {formType === "create" ? "Crie uma nova tarefa" : "Atualize a tarefa"}
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-12 justify-center items-center w-full mx-auto max-w-xl"
            >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título da tarefa"
                    className="border-b px-3 py-2 rounded w-full"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição da tarefa (opcional)"
                    className="border px-3 py-2 rounded w-full h-60 md:h-100 resize-none"
                    rows={3}
                />
                <div className="flex justify-end w-full">
                    <button
                        type="submit"
                        className="bg-white border rounded-full text-black hover:bg-black hover:scale-105 hover:text-white w-1/3 px-4 py-2 transition duration-300"
                    >
                        {formType === "create" ? "Criar" : "Atualizar"}
                    </button>
                </div>
            </form>
        </div>
    );
};
