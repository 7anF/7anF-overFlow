import SearchLocally from "@/components/shared/search/SearchLocally";
import React from "react";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

const Page = async ({ params, searchParams }: URLProps) => {
  const results = await getQuestionByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">{results.tagTitle}</h1>
      </div>

      <div className="mt-11 w-full">
        <SearchLocally
          route={`/tags/${params.id}`}
          iconPosition="left"
          placeholder="Search by tag questions..."
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-11 flex w-full flex-col gap-6">
        {results.questions.length > 0 ? (
          results.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No Questions Found for the tag"
            description=" 😔 Oops! It seems there are no questions related to [Tag Name] at the moment. Don't let that discourage you! Be the first to start a discussion about this tag by asking a question. 🚀"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-8">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={results.isNext}
        />
      </div>
    </>
  );
};

export default Page;
