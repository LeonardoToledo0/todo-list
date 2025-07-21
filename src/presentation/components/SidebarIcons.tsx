"use client";

import { ReactNode } from "react";

import {
    IconArrowLeft,
    IconCirclePlus,
    IconLayoutDashboard,
} from "@tabler/icons-react";
import { useAuthStore } from "@/shared/stores/useAuthStore";


export interface LinkItem {
    label: string;
    href?: string;
    icon: ReactNode;
    onClick?: () => void;
}




export const sidebarLinks: LinkItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: (
            <IconLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Criar Tarefa",
        href: "/tasks",
        icon: (
            <IconCirclePlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Logout",
        href: "/",
        onClick: () => {
            useAuthStore.getState().logout();
        },
        icon: (
            <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
];
