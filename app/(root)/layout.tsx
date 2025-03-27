import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <div>
      <Navbar />

      {children}
      <Footer />
    </div>
  );
}
