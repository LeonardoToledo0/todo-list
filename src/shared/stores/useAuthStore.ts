'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import type { User, LoginInput, RegisterInput } from '@/shared/types/User';
import * as authService from '@/services/authService';

interface TokenPayload {
    sub: string;
    email: string;
    username: string;
    iat: number;
    exp: number;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    hasHydrated: boolean;

    setHasHydrated: (value: boolean) => void;

    register: (data: RegisterInput) => Promise<void>;
    login: (data: LoginInput) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            loading: false,
            error: null,
            hasHydrated: false,

            setHasHydrated: (value) => set({ hasHydrated: value }),

            register: async (data) => {
                set({ loading: true, error: null });
                try {
                    const user = await authService.register(data);
                    set({ user, loading: false });
                } catch (error) {
                    set({ error: 'Erro no registro', loading: false });
                    console.error(error);
                }
            },

            login: async (data) => {
                set({ loading: true, error: null });
                try {
                    const { access_token } = await authService.login(data);
                    const decoded = jwtDecode<TokenPayload>(access_token);

                    const user: User = {
                        id: decoded.sub,
                        email: decoded.email,
                        username: decoded.username,
                        access_token,
                    };

                    set({ user, token: access_token, loading: false });
                } catch (error) {
                    set({ error: 'Erro no login', loading: false });
                    console.error(error);
                }
            },

            logout: () => {
                set({ user: null, token: null });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
