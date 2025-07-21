"use client";

import React, { ReactNode } from "react";
import { Sidebar } from "../sections/Sidebar";
import ProtectedRoute from "@/shared/middleware/ProtectedRoute";


interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <ProtectedRoute>
            <div className="flex h-screen w-screen overflow-hidden">
                <Sidebar />

                <main className="flex-1 overflow-y-auto bg-neutral-900 p-4">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
};
