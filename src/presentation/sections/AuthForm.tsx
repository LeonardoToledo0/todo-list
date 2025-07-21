"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { LoginInput, RegisterInput } from "@/shared/types/User";
import toast from "react-hot-toast";

interface AuthFormProps {
    title: string;
    formType: "login" | "register";
    onLoginSubmit: (data: LoginInput) => void;
    onRegisterSubmit: (data: RegisterInput) => void;
    loading?: boolean;
    error?: string | null;
}

const formVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
        opacity: 0,
        x: 50,
        transition: { duration: 0.3, ease: "easeIn" },
    },
};

export const AuthForm: React.FC<AuthFormProps> = ({
    title,
    formType,
    onLoginSubmit,
    onRegisterSubmit,
}) => {


    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        onLoginSubmit({ email, password });
    };

    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const username = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem.");
            return;
        }

        onRegisterSubmit({ username, email, password });
    };

    return (
        <>
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="max-w-md w-full p-8  rounded-xl shadow-2xl border overflow-hidden space-y-6 bg-black">
                    <h2 className="text-3xl font-bold text-white text-center">{title}</h2>
                    {formType === "login" ? (
                        <motion.form
                            key="login"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={formVariants}
                            className="space-y-6"
                            onSubmit={handleLoginSubmit}
                        >
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                autoComplete="new-email"
                                className="w-full p-3 rounded bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-gray-700"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                required
                                autoComplete="new-password"
                                className="w-full p-3 rounded bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-gray-700"
                            />
                            <button
                                type="submit"
                                className="w-full py-2 my-4 bg-white border rounded-full text-black font-semibold hover:bg-black hover:text-white hover:border-white hover:border transition"
                            >
                                Entrar
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="register"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={formVariants}
                            className="space-y-6 "
                            onSubmit={handleRegisterSubmit}
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                required
                                autoComplete="new-name"
                                className="w-full p-3 rounded bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-gray-700"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                autoComplete="new-email"
                                className="w-full p-3 rounded bg-transparent  border-b border-gray-300 text-white placeholder-gray-300 focus:outline-none focus:border-gray-700"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                required
                                autoComplete="new-password"
                                className="w-full p-3 rounded border-b border-gray-300 text-white placeholder-gray-300 bg-transparent focus:outline-none focus:border-gray-700 mt-4"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Senha"
                                required
                                autoComplete="new-current-password"
                                className="w-full p-3 rounded border-b border-gray-300 text-white placeholder-gray-300 bg-transparent focus:outline-none focus:border-gray-700 mt-4"
                            />
                            <button
                                type="submit"
                                className="w-full py-2 my-4 bg-white border rounded-full text-black font-semibold hover:bg-black hover:text-white hover:border-white hover:border transition"
                            >
                                Cadastrar
                            </button>
                        </motion.form>
                    )}
                </div>
            </div>

        </>

    );
};
