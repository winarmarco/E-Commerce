"use client";

import { type TRPCError } from "@trpc/server";
import { redirect } from "next/navigation";

const Error: React.FC<{error: TRPCError}> = ({error}) => {
  

  if (error.message === "UNAUTHORIZED") redirect("/sign-in");



  return (
    <div className="h-screen w-screen flex items-center justify-center">Error</div>
  )
}

export default Error