import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
  otherClasses?: string;
}

const RenderTag = ({
  _id,
  name,
  totalQuestions,
  showCount,
  otherClasses,
}: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className={`flex justify-between items-center gap-2 ${otherClasses}`}
    >
      <Badge className="background-light800_dark300 flex-center py-2 px-4 rounded-md border-none text-light400_light500 subtle-medium uppercase">
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700 ">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
