"use client";

import { DeleteAnswer } from "@/lib/actions/answer.action";
import { DeleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
  type: string;
  itemId: string;
  author: string;
}

const EditDeleteAction = ({ type, itemId, author }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      await DeleteQuestion({
        questionId: JSON.parse(itemId),
        author: JSON.parse(author),
        path: pathname,
      });
    } else if (type === "Answer") {
      await DeleteAnswer({
        answerId: JSON.parse(itemId),
        author: JSON.parse(author),
        path: pathname,
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      {type === "Question" ? (
        <Image
          src="/assets/icons/trash.svg"
          alt="Delete"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleDelete}
        />
      ) : (
        <Image
          src="/assets/icons/trash.svg"
          alt="Delete"
          width={16}
          height={16}
          className="cursor-pointer object-contain"
          onClick={handleDelete}
        />
      )}
    </div>
  );
};

export default EditDeleteAction;
