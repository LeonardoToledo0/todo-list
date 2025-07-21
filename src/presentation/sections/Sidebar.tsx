"use client";

import React, { useState } from "react";

import { SidebarBody, SidebarLink, SidebarUI } from "../components/SidebarUi";
import { sidebarLinks } from "../components/SidebarIcons";


export function Sidebar() {
    const [open, setOpen] = useState(false);

    return (

        <SidebarUI open={open} setOpen={setOpen}>
            <SidebarBody className="flex flex-col justify-between gap-10 h-screen bg-black">
                <div className="flex h-screen flex-col overflow-hidden">
                    <div className="flex flex-col gap-2">
                        {sidebarLinks.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                    </div>
                </div>
            </SidebarBody>
        </SidebarUI>

    );
}
