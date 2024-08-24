import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const { userId } = auth();

  const mongoUser = await getUserById({ userId });

  return {
    title: `Edit Profile of ${mongoUser.name} | CodeXStack`,
    description:
      "Customize your CodeXStack profile with the latest information about yourself and your expertise.",
  };
}
const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default Page;
