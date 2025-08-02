import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { axiosInstance } from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    result: {
        status: string;
        message: string;
        details: {
            id: string;
            name: string;
            balancePoint: number;
            role: string;
            accessToken: string;
        };
    };
}

export function useUserLogin() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation<LoginResponse, Error, LoginPayload>({
        mutationFn: async (payload) => {
            const { data } = await axiosInstance.post<LoginResponse>('api/auth/login-user', payload);
            return data; // ← return the axios payload
        },

        onSuccess: (data) => {
            const { id, name, role, balancePoint, accessToken } = data.result.details;
            setAuth({ id, name, role, accessToken, balancePoint });
            toast.success(data.result.message);
            router.replace("/");
        },
        onError: () => {
            const message = 'Login failed';
            toast.error(message);
        },
    });
}