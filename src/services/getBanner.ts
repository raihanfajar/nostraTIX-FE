import { EventPicture } from "@/types/event";
import { axiosInstance } from "@/utils/axiosInstance";

export const getBanner = async () => {
  const res = await axiosInstance.get<EventPicture[]>("/events/banner");
  return res.data.map((item) => item.banner); // hanya ambil string banner
};


// import { useAuthStore } from "@/store/useAuthStore";
// import { EventPicture } from "@/types/event";
// import { axiosInstance } from "@/utils/axiosInstance";

// export const getBanner = async () => {
//   const accessToken = useAuthStore.getState().accessToken;

//   const res = await axiosInstance.get<EventPicture[]>("/events/banner", {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
//   return res.data.map((item) => item.banner); // hanya ambil string banner
// };
