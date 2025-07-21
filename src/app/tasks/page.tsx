"use client";

import React, { useState } from "react";
import { CreateTaskForm } from "@/presentation/components/CreateTaskForm";

import { Column } from "@/shared/types/Task";
import { DashboardLayout } from "@/presentation/sections/DashboardLayout";


export default function CreateTaskPage() {
    const [columns, setColumns] = useState<Column[]>([
        {
            id: "doing",
            title: "Fazendo",
            tasks: [],
        },
        {
            id: "done",
            title: "Feito",
            tasks: [],
        },
    ]);

    return (
        <>

            <DashboardLayout>
                <CreateTaskForm
                    formType="create"
                    onTaskCreated={(newTask) => {
                        setColumns((cols) =>
                            cols.map((col) =>
                                col.id === "todo"
                                    ? { ...col, tasks: [newTask, ...col.tasks] }
                                    : col
                            )
                        );
                    }}
                />

            </DashboardLayout>

        </>


    );
}
