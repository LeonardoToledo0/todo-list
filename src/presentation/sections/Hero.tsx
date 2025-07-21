"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import BlurText from "../components/BlurText";

export const Hero: React.FC = () => {
    const router = useRouter();

    const buttonVariants: Variants = {
        hidden: { opacity: 0, y: -50 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                type: "spring",
                stiffness: 100,
            },
        }),
    };

    const handleClick = (path: string) => {
        router.push(path);
    };

    return (
        <div className="absolute inset-0 flex flex-col text-center items-center justify-center pointer-events-none">
            <BlurText
                text="TaskMaster App"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-5xl md:text-7xl font-bold text-white mb-8 text-center justify-center items-center"
            />

            <div className="pointer-events-auto flex space-x-6 max-w-xs w-full ">
                <motion.button
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={buttonVariants}
                    onClick={() => handleClick("/auth/login")}
                    className="px-6 py-3 w-full text-center rounded-full font-semibold transition bg-white text-black hover:bg-black hover:text-white hover:scale-105 hover:-translate-y-1"
                >
                    Login
                </motion.button>

                <motion.button
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={buttonVariants}
                    onClick={() => handleClick("/auth/register")}
                    className="px-6 py-3 w-full text-center rounded-full font-semibold transition bg-black text-white hover:bg-white hover:text-black hover:scale-105 hover:-translate-y-1"
                >
                    Cadastrar
                </motion.button>
            </div>
        </div>
    );
};
