"use client";
import { PiPasswordDuotone, PiPasswordFill } from "react-icons/pi";
import HeaderTitle from "@/components/HeaderTitle";
// import { useParams } from "next/navigation";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
// import { axiosInstance } from "@/utils/axiosInstance";

export default function Page() {
  //   const { slug } = useParams();
  const inputPassword = useRef<HTMLInputElement>(null);

  const { mutate: mutationResetPassword } = useMutation({
    mutationFn: async () => {
      alert("on progress - mistertukiman");
      //   await axiosInstance.patch(
      //     "api/auth/reset-password-update",
      //     { password: inputPassword?.current?.value },
      //     {
      //       headers: { Authorization: `Bearer ${slug}` },
      //     },
      //   );
    },
  });

  return (
    <>
      <div>
        <HeaderTitle title="Reset Password" />

        {/* Form Reset Password */}
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 border-b-1 border-gray-300 py-2">
            <PiPasswordDuotone className="text-2xl text-gray-500" />
            <input
              type="text"
              ref={inputPassword}
              placeholder="Type new password"
              className="input w-full border-none bg-gray-100 text-gray-500"
            />
          </div>
          <div className="flex items-center gap-2 border-b-1 border-gray-300 py-2">
            <PiPasswordFill className="text-2xl text-gray-500" />
            <input
              type="text"
              placeholder="Type confirmation password"
              className="input w-full border-none bg-gray-100 text-gray-500"
            />
          </div>
        </div>
        <div className="fixed right-0 bottom-0 left-0 mx-auto w-full max-w-md border-gray-200 px-4 py-3">
          <button
            onClick={() => mutationResetPassword()}
            className="btn w-full bg-green-500 text-white hover:bg-green-600"
          >
            Submit Password
          </button>
        </div>
      </div>
    </>
  );
}
