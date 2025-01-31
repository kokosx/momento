import { type PropsWithChildren } from "react";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: PropsWithChildren) => {
  const session = await getSession();
  if (session?.user) {
    redirect("/board");
  }

  return children;
};

export default layout;
