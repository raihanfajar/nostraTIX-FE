import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    referralCode?: string;
}

interface RegisterUserResponse {
    result: {
        status: string;
        message: string;
    };
}

export function useUserRegister() {
    const router = useRouter();

    return useMutation<RegisterUserResponse, Error, RegisterPayload>({
        mutationFn: async (payload) => {
            console.log(payload);
            const { data } = await axiosInstance.post<RegisterUserResponse>('api/auth/register-user', payload);
            return data; // ← return the axios payload
        },

        onSuccess: (data) => {
            toast.success(data.result.message);
            router.replace("/");
        },
        onError: () => {
            const message = 'Register Failed';
            toast.error(message);
        },
    });
}