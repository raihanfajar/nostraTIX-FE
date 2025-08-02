"use client";
import { useRouter } from "next/navigation";

const GoHomeButton = () => {
  const router = useRouter();

  return router.push("/");
};

export default GoHomeButton;