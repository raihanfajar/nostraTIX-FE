"use client";

import { use, useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { OrganizerProfile } from "@/types/event";
import Image from "next/image";

export default function OrganizerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [data, setData] = useState<OrganizerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<OrganizerProfile>(
          `/events/profile/${resolvedParams.slug}`,
        );
        setData(res.data);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="p-6 text-white">Loading profile...</div>;
  }

  if (!data) {
    return <div className="p-6 text-red-500">Organizer not found</div>;
  }

  return (
    <div className="mx-auto min-h-screen max-w-3xl p-6 text-white">
      <h1 className="mb-4 text-2xl font-bold">Organizer Profile</h1>

      <div className="space-y-4 rounded-lg bg-[#173236] p-4">
        <div className="flex items-center space-x-4">
          <Image
            src={data.profilePicture}
            alt={data.name}
            width={96} // 24 * 4 (karena Tailwind pakai 4px scale)
            height={96}
            className="rounded-full border border-gray-500 object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{data.name}</h2>
            <p className="text-sm text-gray-300">{data.email}</p>
            <p className="text-yellow-400">⭐ {data.ratings.toFixed(1)}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold">Description</h3>
          <p className="text-gray-300">{data.description}</p>
        </div>

        <div className="text-sm text-gray-400">
          Member since {new Date(data.createdAt).toLocaleDateString("id-ID")}
        </div>
      </div>
    </div>
  );
}
