import { useAuthStore } from '@/store/useAuthStore';
import { axiosInstance } from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface OrganizerLoginPayload {
    email: string;
    password: string;
}

interface OrganizerLoginResponse {
    result: {
        status: string;
        message: string;
        details: {
            accessToken: string;
            id: string;
            name: string;
            role: string;
            slug: string;
        }
    }
}

export function useOrganizerLogin() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation<OrganizerLoginResponse, Error, OrganizerLoginPayload>({
        mutationFn: async (payload) => {
            const { data } = await axiosInstance.post<OrganizerLoginResponse>('api/auth/login-organizer', payload);
            return data;
        },
        onSuccess: (data) => {
            const { id, name, role, slug, accessToken } = data.result.details;
            setAuth({ id, name, role, slug, accessToken });
            toast.success(data.result.message);
            router.replace(`/dashboard/${slug}`);
        },
        onError: () => {
            const message = 'Login failed';
            toast.error(message);
        },
    });
}