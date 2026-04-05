import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (email !== "nishatirkey0311@gmail.com") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
