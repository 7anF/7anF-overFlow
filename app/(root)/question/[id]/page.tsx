import Answer from "@/components/forms/Answer";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatNumbers, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const questionId = params.id;

  const question = await getQuestionById({ questionId });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">VOTING</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUlr="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(question.createdAt)}`}
          title=" Asked"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUlr="/assets/icons/message.svg"
          alt="message"
          value={formatNumbers(question.answers.length)}
          title=" Answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUlr="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumbers(question.views)}
          title=" Views"
          textStyle="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={question.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <Answer />
    </>
  );
};

export default page;
