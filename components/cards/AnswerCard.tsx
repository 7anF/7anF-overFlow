import React from "react";
import Link from "next/link";
import Metric from "../shared/Metric";
import { formatNumbers, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  _id: string;
  title: string;
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  clerkId: string | null | undefined;
  upvotes: string[];
  createdAt: Date;
}

const AnswerCard = ({
  _id,
  title,
  author,
  upvotes,
  createdAt,
  clerkId,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <Link href={`/question/${_id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {title}
          </h3>
        </Link>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>

        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {getTimestamp(createdAt)}
        </span>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUlr={author.picture}
          alt="user"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyle="body-medium text-dark400_light700"
        />
        <Metric
          imgUlr="/assets/icons/like.svg"
          alt="answers"
          value={formatNumbers(upvotes.length)}
          title=" Votes"
          textStyle="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default AnswerCard;
