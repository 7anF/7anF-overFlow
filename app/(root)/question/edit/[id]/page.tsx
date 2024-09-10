import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: URLProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const question = await getQuestionById({
    questionId: params.id,
  });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit a question</h1>
      <div className="mt-9">
        <Question
          userId={JSON.stringify(mongoUser)}
          questionId={params.id}
          questionDetailes={JSON.stringify(question)}
          type="Edit"
        />
      </div>
    </div>
  );
};

export default Page;
