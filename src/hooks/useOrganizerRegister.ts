import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/utils/axiosInstance';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

interface RegisterOrganizerResponse {
    result: {
        status: string;
        message: string;
    };
}

export function useOrganizerRegister() {
    const router = useRouter();

    return useMutation<RegisterOrganizerResponse, AxiosError, RegisterPayload>({
        mutationFn: async (payload) => {
            console.log(payload);
            const { data } = await axiosInstance.post<RegisterOrganizerResponse>('api/auth/register-organizer', payload);
            return data; // ← return the axios payload
        },

        onSuccess: (data) => {
            toast.success(data.result.message);
            router.replace("/");
        },
        onError: (error) => {
            const message = (error.response?.data as { message?: string })?.message || 'Login failed';
            toast.error(message);
        },
    });
}