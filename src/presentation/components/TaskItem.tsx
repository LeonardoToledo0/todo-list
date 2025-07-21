"use client";

import { useRouter } from "next/navigation";
import { useTaskStore } from "@/shared/stores/useTaskStore";
import toast from "react-hot-toast";
import { Task } from "@/shared/types/Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";


export function TaskItem({ task }: { task: Task }) {
    const router = useRouter();
    const deleteTask = useTaskStore((state) => state.removeTask);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            await deleteTask(task.id);
            toast.success("Tarefa deletada com sucesso!");
        } catch {
            toast.error("Erro ao deletar a tarefa.");
        }
    };

    const handleDoubleClick = () => {
        router.push(`/tasks/update/${task.id}`);
    };

    return (
        <>
            <li
                ref={setNodeRef}
                {...attributes}
                style={style}
                className={`relative bg-gray-700 p-3 rounded mb-2 text-white shadow ${isDragging ? "opacity-60" : "opacity-100"
                    }`}
                onDoubleClick={handleDoubleClick}
            >
                <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                        <strong>{task.title}</strong>
                        {task.description && (
                            <p className="text-sm text-gray-300 mt-1">{task.description}</p>
                        )}
                    </div>
                    <div className="group">
                        <button
                            onClick={handleDelete}
                            className="text-red-400 hover:text-red-600 z-50 absolute bottom-0 right-2"
                        >
                            🗑️
                        </button>
                        <div className="absolute right-10 bottom-0 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-sm font-bold px-2 py-1 rounded shadow z-50 whitespace-nowrap">
                            Clique para deletar
                        </div>
                    </div>
                </div>
                <div className="group">
                    <div
                        {...listeners}
                        className="absolute top-0 right-2 text-gray-400 cursor-move text-4xl hover:scale-105 transition-all ease-in-out duration-300 hover:text-green-400"
                    >
                        ⠿
                    </div>
                    <div className="absolute right-10 top-0 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-sm font-bold px-2 py-1 rounded shadow z-50 whitespace-nowrap">
                        Segure para arrastar
                    </div>
                </div>
            </li>


        </>

    );
}
