import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: Promise<{ invitationId?: string }> }) {
  const { invitationId } = await searchParams;
  console.log({ invitationId });
  if (!invitationId) {
    redirect("/dashboard");
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log({ session });
  if (!session) {
    redirect(`/sign-in?invitationId=${invitationId}`);
  }
  try {
    const data = await auth.api.acceptInvitation({
      body: {
        invitationId,
      },
      headers: await headers(),
    });
    console.log(data);
  } catch (error: any) {
    if (error?.statusCode === 403) {
      auth.api.signOut({ headers: await headers() });
      redirect(`/sign-in?invitationId=${invitationId}`);
    }
  }
  return <div>accept</div>;
}
