import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface Props {
  _id: string;
  name: string;
  questions: Object[];
}

const TagCard = ({ _id, name, questions }: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className="shadow-light100_darknone w-full max-sm:min-w-full xs:w-[260px]"
    >
      <div className="background-light900_dark200 light-border flex w-full justify-center flex-col rounded-2xl border px-8 py-10 gap-3">
        <Badge className="background-light800_dark400 py-2 px-4 rounded-md border-none text-dark300_light900 Paragraph-semibold uppercase w-fit">
          {name}
        </Badge>
        <p className="Small-regular text-dark500_light700">
          JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS
        </p>
        <div className="flex gap-[10px]">
          <p className="Body-semibold primary-text-gradient">
            {questions.length}+
          </p>{" "}
          <p className="Small-medium text-dark500_light500">Questions</p>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
