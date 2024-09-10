import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopPopularTags } from "@/lib/actions/tag.action";

const RightNavbar = async () => {
  const hostQuestions = await getHotQuestions();
  const popularTags = await getTopPopularTags();

  return (
    <section className="flex flex-col background-light900_dark200 sticky right-0 top-0 h-screen overflow-y-auto p-6 pt-36 custom-scrollbar light-border border-l shadow-light-300 dark:shadow-none max-xl:hidden w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900 mb-7">Top Questions</h3>
        <div className="flex flex-col gap-[30px] items-center">
          {hostQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              className="w-full flex justify-between items-center text-dark500_light700 body-medium gap-7"
              key={question._id}
            >
              <p>{question.title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-[88px]">
        <h3 className="h3-bold text-dark200_light900 mb-7">Popular Tags</h3>
        <div className="flex flex-col gap-4 items-center">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              name={tag.name}
              _id={tag._id}
              totalQuestions={tag.numberOfQuestions}
              showCount
              otherClasses="w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightNavbar;
