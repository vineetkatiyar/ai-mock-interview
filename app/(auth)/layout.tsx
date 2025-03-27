import { isAuthenticated } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    redirect("/");
  }

  return <div>{children}</div>;
}
