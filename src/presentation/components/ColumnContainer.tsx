"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Column } from "@/shared/types/Task";

export const ColumnContainer = ({
    column,
    children,
}: {
    column: Column;
    children: React.ReactNode;
}) => {
    const { setNodeRef } = useDroppable({ id: column.id });

    return (
        <div ref={setNodeRef} className="rounded-lg p-4 w-72 flex-shrink-0 ">
            <h2 className="text-white border-b font-bold mb-4 text-center">
                {column.title}
            </h2>
            {children}
        </div>
    );
};
