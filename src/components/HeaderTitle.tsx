"use client";
import { LuMoveLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function HeaderTitle({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center bg-green-500 p-4 text-white">
      <LuMoveLeft className="cursor-pointer" onClick={() => router.back()} />
      <h1 className="mx-auto font-bold">{title}</h1>
    </div>
  );
}
