import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession();
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to CodeSync</p>
      {session ? redirect("/send"):redirect(`/signin`)}
    </div>
  );
}