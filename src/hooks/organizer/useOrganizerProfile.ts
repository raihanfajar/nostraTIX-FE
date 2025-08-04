"use client";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

interface OrganizerProfile {
    name: string;
    email: string;
    description: string;
    profilePicture: string | null;
}

interface OrganizerProfileResponse {
    data: {
        result: {
            details: OrganizerProfile;
        };
    }
}

export function useOrganizerProfile() {
    const { accessToken } = useAuthStore();
    return useQuery<OrganizerProfile, Error>({
        queryKey: ["organizerProfile"], // !unique key for the query to be cached and re-used when needed in the future
        queryFn: async () => {
            const { data }: OrganizerProfileResponse = await axiosInstance.get("/organizer/profile", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return data.result.details;
        },
        enabled: !!accessToken, // !enable the query only when accessToken is available
    });
}