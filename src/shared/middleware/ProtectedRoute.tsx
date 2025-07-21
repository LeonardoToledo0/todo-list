'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/shared/stores/useAuthStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);

    useEffect(() => {
        if (!hasHydrated) return;

        if (!user) {
            router.replace('/');
        }
    }, [user, hasHydrated, router]);

    if (!hasHydrated) return null;

    return <>{children}</>;
}
