"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/presentation/sections/AuthForm";
import Squares from "@/presentation/components/Squares";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { LoginInput } from "@/shared/types/User";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const [localError, setLocalError] = useState<string | null>(null);

    const handleLoginSubmit = async (data: LoginInput) => {
        setLocalError(null);
        try {
            await login(data);
            toast.success("Login realizado com sucesso!");
            router.push("/dashboard");
        } catch (err) {
            toast.error("Falha no login, tente novamente.");
            setLocalError("Falha no login, tente novamente.");
            console.error("Erro no login:", err);
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
                    title="Login"
                    formType="login"
                    onLoginSubmit={handleLoginSubmit}
                    onRegisterSubmit={() => {
                        console.log("Registro não implementado ainda.");
                    }}
                    loading={loading}
                    error={error || localError}
                />
            </main>
        </>
    );
}
