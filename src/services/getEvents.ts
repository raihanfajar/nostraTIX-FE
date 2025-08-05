import { Category, EventResponse, EventWithDetails } from "@/types/event";
import { IParams } from "@/types/params";
import { axiosInstance } from "@/utils/axiosInstance";

export const getEvents = async (filters: IParams = {}) => {
  const params = new URLSearchParams();

  if (filters.limit) params.append("limit", String(filters.limit));
  if (filters.name) params.append("name", filters.name);
  if (filters.category && Array.isArray(filters.category)) {
    filters.category.forEach((cat) => params.append("category", cat));
  }
  if (filters.countryId) params.append("countryId", filters.countryId);
  if (filters.cityId) params.append("cityId", filters.cityId);
  if (filters.location) params.append("location", filters.location);
  if (filters.page) {
    params.append("page", String(filters.page));
  }

  const res = await axiosInstance.get<EventResponse>(
    `/events?${params.toString()}`,
  );

  return res.data.data.result;
};

export const getEventCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get<string[]>(`/events/categories`);
  return res.data.map((item) => ({ category: item }));
};

export const getEventBySlug = async (slug: string) => {
  const response = await axiosInstance.get<EventWithDetails>(`/events/${slug}`);
  return response.data;
};
