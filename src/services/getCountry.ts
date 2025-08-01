import { City, Country } from "@/types/location";
import { axiosInstance } from "@/utils/axiosInstance";

export const getCountry = async (): Promise<Country[]> => {
  const result = await axiosInstance.get<Country[]>("location/country");
  return result.data;
};

export const getCityByCountryId = async (id: number) => {
  const result = await axiosInstance.get<City[]>(`location/city/${id}`);
  return result.data;
};
