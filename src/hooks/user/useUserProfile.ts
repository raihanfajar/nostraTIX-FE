"use client";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

interface UserProfile {
    name: string;
    email: string;
}

interface UserProfileResponse {
    data: {
        result: {
            details: UserProfile;
        };
    }
}

export function useUserProfile() {
    const { accessToken } = useAuthStore();
    return useQuery<UserProfile, Error>({
        queryKey: ["userProfile"], // !unique key for the query to be cached and re-used when needed in the future
        queryFn: async () => {
            const { data }: UserProfileResponse = await axiosInstance.get("user/profile", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return data.result.details;
        },
        enabled: !!accessToken, // !enable the query only when accessToken is available
    });
}