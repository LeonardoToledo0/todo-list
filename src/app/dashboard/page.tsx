"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    rectSortingStrategy,
} from "@dnd-kit/sortable";

import { DashboardLayout } from "@/presentation/sections/DashboardLayout";
import { useTaskStore } from "@/shared/stores/useTaskStore";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import toast from "react-hot-toast";

import { Task, Column } from "@/shared/types/Task";
import { ColumnContainer } from "@/presentation/components/ColumnContainer";
import { TaskItem } from "@/presentation/components/TaskItem";
import { TaskFilterControls } from "@/presentation/components/TaskFilterControls";
import { TextHoverEffectLoading } from "@/presentation/components/Loading";

export default function TasksDragAndDrop() {
    const userId = useAuthStore((state) => state.user?.id);
    const tasks = useTaskStore((state) => state.tasks);
    const loading = useTaskStore((state) => state.loading);
    const fetchTasks = useTaskStore((state) => state.fetchTasks);
    const updateTask = useTaskStore((state) => state.updateTask);

    const [columns, setColumns] = useState<Column[]>([
        { id: "doing", title: "Pendentes", tasks: [] },
        { id: "done", title: "Completas", tasks: [] },
    ]);
    const [filter, setFilter] = useState<"all" | "doing" | "done">("all");
    const [searchTerm, setSearchTerm] = useState("");

    const sensors = useSensors(useSensor(PointerSensor));
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (userId) {
            fetchTasks(userId);
        }
    }, [fetchTasks, userId]);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            if (filter === "doing" && task.completed) return false;
            if (filter === "done" && !task.completed) return false;
            if (
                searchTerm &&
                !task.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
                return false;
            return true;
        });
    }, [tasks, filter, searchTerm]);

    useEffect(() => {
        const tasksByStatus = {
            doing: [] as Task[],
            done: [] as Task[],
        };

        filteredTasks.forEach((task) => {
            if (task.completed) tasksByStatus.done.push(task);
            else tasksByStatus.doing.push(task);
        });

        setColumns((cols) =>
            cols.map((col) => {
                if (col.id === "doing") return { ...col, tasks: tasksByStatus.doing };
                if (col.id === "done") return { ...col, tasks: tasksByStatus.done };
                return col;
            })
        );
    }, [filteredTasks]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeColumn = columns.find((col) =>
            col.tasks.find((task) => task.id === activeId)
        );
        if (!activeColumn) return;

        const overTaskColumn = columns.find((col) =>
            col.tasks.find((task) => task.id === overId)
        );

        if (overTaskColumn) {
            if (activeColumn.id === overTaskColumn.id) {
                const oldIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
                const newIndex = overTaskColumn.tasks.findIndex((t) => t.id === overId);
                const newTasks = arrayMove(activeColumn.tasks, oldIndex, newIndex);
                setColumns((cols) =>
                    cols.map((col) =>
                        col.id === activeColumn.id ? { ...col, tasks: newTasks } : col
                    )
                );
            } else {
                const oldIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
                const taskToMove = activeColumn.tasks[oldIndex];
                const newActiveTasks = [...activeColumn.tasks];

                try {
                    await updateTask(taskToMove.id, {
                        completed: overTaskColumn.id === "done",
                    });
                    toast.success("Tarefa atualizada com sucesso!");
                } catch {
                    toast.error("Erro ao atualizar a tarefa.");
                }

                newActiveTasks.splice(oldIndex, 1);
                const newOverTasks = [...overTaskColumn.tasks];
                const newIndex = newOverTasks.findIndex((t) => t.id === overId);
                newOverTasks.splice(newIndex, 0, {
                    ...taskToMove,
                    completed: overTaskColumn.id === "done",
                });

                setColumns((cols) =>
                    cols.map((col) => {
                        if (col.id === activeColumn.id) return { ...col, tasks: newActiveTasks };
                        if (col.id === overTaskColumn.id) return { ...col, tasks: newOverTasks };
                        return col;
                    })
                );
            }
        } else {
            const overColumn = columns.find((col) => col.id === overId);
            if (!overColumn) return;

            if (activeColumn.id !== overColumn.id) {
                const oldIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
                const taskToMove = activeColumn.tasks[oldIndex];

                try {
                    await updateTask(taskToMove.id, { completed: overColumn.id === "done" });
                    toast.success("Tarefa atualizada com sucesso!");
                } catch {
                    toast.error("Erro ao atualizar a tarefa.");
                }

                const newActiveTasks = [...activeColumn.tasks];
                newActiveTasks.splice(oldIndex, 1);

                const newOverTasks = [
                    ...overColumn.tasks,
                    { ...taskToMove, completed: overColumn.id === "done" },
                ];

                setColumns((cols) =>
                    cols.map((col) => {
                        if (col.id === activeColumn.id) return { ...col, tasks: newActiveTasks };
                        if (col.id === overColumn.id) return { ...col, tasks: newOverTasks };
                        return col;
                    })
                );
            }
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <TextHoverEffectLoading />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col md:px-4 mx-auto w-full">
                <h1 className="text-white text-3xl md:text-4xl font-bold mb-8 text-center mx-auto my-20">
                    Minhas Tasks
                </h1>
                <TaskFilterControls
                    filter={filter}
                    searchTerm={searchTerm}
                    onFilterChange={setFilter}
                    onSearchTermChange={setSearchTerm}
                />


                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                >
                    <div className="flex flex-col md:flex-row space-x-6 w-full h-full mx-auto text-2xl justify-evenly">
                        {columns.map((column) => (
                            <ColumnContainer key={column.id} column={column}>
                                <SortableContext
                                    items={column.tasks.map((t) => t.id)}
                                    strategy={rectSortingStrategy}
                                >
                                    <ul className="w-full max-w-screen-xl mx-auto  text-xl justify-between items-center">
                                        {column.tasks.length > 0 ? (
                                            column.tasks.map((task) => (
                                                <TaskItem key={task.id} task={task} />
                                            ))
                                        ) : (
                                            <li className="text-gray-400 italic p-3 select-none">
                                                Nenhuma tarefa
                                            </li>
                                        )}
                                    </ul>
                                </SortableContext>
                            </ColumnContainer>
                        ))}
                    </div>
                </DndContext>
            </div>
        </DashboardLayout>
    );
}
