import React from "react";
import RenderTag from "./RenderTag";
import Link from "next/link";
import Metric from "./Metric";
import { formatNumbers, getTimestamp } from "@/lib/utils";

interface Props {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const HomePgaeCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {
  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <Link href={`/question/${_id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {title}
          </h3>
        </Link>
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {getTimestamp(createdAt)}
        </span>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUlr="/assets/icons/avatar.svg"
          alt="user"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyle="body-medium text-dark400_light700"
        />
        <Metric
          imgUlr="/assets/icons/like.svg"
          alt="answers"
          value={formatNumbers(upvotes)}
          title=" Votes"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUlr="/assets/icons/message.svg"
          alt="Upvotes"
          value={formatNumbers(answers.length)}
          title=" Answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUlr="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumbers(views)}
          title=" Views"
          textStyle="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default HomePgaeCard;
