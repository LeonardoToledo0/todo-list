"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/presentation/sections/AuthForm";
import Squares from "@/presentation/components/Squares";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { RegisterInput } from "@/shared/types/User";
import toast from "react-hot-toast";


export default function RegisterPage() {
    const router = useRouter();
    const register = useAuthStore((state) => state.register);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const [localError, setLocalError] = useState<string | null>(null);

    const handleRegisterSubmit = async (data: RegisterInput) => {
        setLocalError(null);
        try {
            await register(data);
            router.push("/auth/login");
            toast.success("Cadastro realizado com sucesso!");
        } catch (error) {
            toast.error("Falha no cadastro, tente novamente.");
            console.error("Erro ao cadastrar:", error);
            setLocalError("Falha no cadastro, tente novamente.");
        }
    };

    return (
        <>
            <main className="w-screen h-screen relative">
                <Squares
                    speed={0.5}
                    direction={"right"}
                    squareSize={40}
                    borderColor={"#999"}
                    hoverFillColor={"#222"}
                />
                <AuthForm
                    title="Register"
                    formType="register"
                    onLoginSubmit={() => {
                        console.log("Login não implementado ainda.");
                    }}
                    onRegisterSubmit={handleRegisterSubmit}
                    loading={loading}
                    error={error || localError}
                />
            </main>
        </>
    );
}
