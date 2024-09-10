import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { userInfo } from "os";
import React from "react";
import AnswerCard from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: 1,
  });
  return (
    <>
      {result.answers &&
        result.answers.map((answer: any) => (
          <AnswerCard
            key={answer._id}
            _id={answer._id}
            title={answer.questions.title}
            author={answer.author}
            upvotes={answer.upvotes}
            createdAt={answer.createdAt}
            clerkId={clerkId}
          />
        ))}
    </>
  );
};

export default AnswerTab;
