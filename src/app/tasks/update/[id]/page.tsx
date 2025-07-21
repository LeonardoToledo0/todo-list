"use client";

import { DashboardLayout } from "@/presentation/sections/DashboardLayout";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { CreateTaskForm } from "@/presentation/components/CreateTaskForm";
import { Column, Task } from "@/shared/types/Task";
import { useTaskStore } from "@/shared/stores/useTaskStore";
import { TextHoverEffectLoading } from "@/presentation/components/Loading";

export default function UpdateTaskPage() {
    const params = useParams();
    const taskId = Array.isArray(params.id) ? params.id[0] : params.id;

    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchTaskById = useTaskStore(state => state.fetchTaskById);

    useEffect(() => {
        if (!taskId) return;

        const fetchTask = async () => {
            setLoading(true);
            try {
                const taskFetched = await fetchTaskById(taskId);
                setTask(taskFetched);
            } catch (err) {
                console.error("Erro ao buscar tarefa:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [taskId, fetchTaskById]);

    const [columns, setColumns] = useState<Column[]>([
        { id: "doing", title: "Fazendo", tasks: [] },
        { id: "done", title: "Feito", tasks: [] },
    ]);

    if (loading) {
        return (
            <DashboardLayout>
                <TextHoverEffectLoading />
            </DashboardLayout>
        );
    }

    if (!task) {
        return (
            <DashboardLayout>
                <TextHoverEffectLoading />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <CreateTaskForm
                formType="update"
                task={task}
                onTaskCreated={(newTask) => {
                    setColumns(cols =>
                        cols.map(col =>
                            col.id === "todo"
                                ? { ...col, tasks: [newTask, ...col.tasks] }
                                : col
                        )
                    );
                }}
            />
        </DashboardLayout>
    );
}
