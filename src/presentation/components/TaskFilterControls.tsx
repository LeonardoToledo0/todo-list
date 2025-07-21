"use client";

import React from "react";

type Props = {
    filter: "all" | "doing" | "done";
    searchTerm: string;
    onFilterChange: (value: "all" | "doing" | "done") => void;
    onSearchTermChange: (value: string) => void;
};

export const TaskFilterControls = ({
    filter,
    searchTerm,
    onFilterChange,
    onSearchTermChange,
}: Props) => {
    return (
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 max-w-screen-xl mx-auto gap-4 px-2">
            <select
                value={filter}
                onChange={(e) => onFilterChange(e.target.value as "all" | "doing" | "done")}
                className="p-2 rounded border border-gray-600 bg-gray-800 text-white "
            >
                <option value="all">Todas</option>
                <option value="doing">Pendentes</option>
                <option value="done">Completas</option>
            </select>

            <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                className="p-2 rounded border border-gray-600 bg-gray-800 text-white w-full md:max-w-xs"
            />
        </div>
    );
};
