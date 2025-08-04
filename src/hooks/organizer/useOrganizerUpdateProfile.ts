"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { axiosInstance } from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateProfileDTO {
    name: string;
    email: string;
    description: string;
}

export function useUpdateProfile() {
    const { accessToken } = useAuthStore();
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (payload: UpdateProfileDTO) =>
            axiosInstance.patch("/organizer/profile", payload, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["organizerProfile"] });
        },
    });
}