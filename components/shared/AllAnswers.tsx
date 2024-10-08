import React from "react";
import Filters from "./Filters";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Voting from "./Voting";
import { SearchParamsProps } from "@/types";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  searchParams,
}: Props) => {
  const results = await getAnswers({
    questionId,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

        <Filters filters={AnswerFilters} />
      </div>

      <div>
        {results.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-center">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 sm:justify-start w-full">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="paragraph-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>

                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1 ml-0.5">
                      <span className="max-sm:hidden"> -</span> answered{" "}
                      {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>

                <div className="flex justify-end">
                  <Voting
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <div className="markdown w-full min-w-full break-all">
              <ParseHTML data={answer.content} />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={results.isNext}
        />
      </div>
    </div>
  );
};

export default AllAnswers;
