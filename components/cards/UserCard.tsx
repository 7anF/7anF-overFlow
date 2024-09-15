import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  picture: string;
}

const UserCard = async ({ _id, clerkId, name, username, picture }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: _id });

  return (
    <div className="shadow-light100_darknone w-full max-sm:min-w-full xs:w-[260px]">
      <div className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Link href={`/profile/${clerkId}`}>
          <Image
            width={100}
            height={100}
            src={picture}
            alt="profile image"
            className="rounded-full mx-auto"
          />

          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {name}
            </h3>
            <p className="body-regular text-dark500_light500 mt-2">
              @{username}
            </p>
          </div>
        </Link>

        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet.</Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
