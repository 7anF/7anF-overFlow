import Question from "@/components/forms/Question";
import { getrUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  // const { userId } = auth();
  const userId = "123456789";
  if (!userId) redirect("/sign-in");

  const mongoUser = await getrUserById({ userId });

  console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question userId={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default Page;
