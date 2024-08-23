import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex-center w-full flex-col">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="dark:block object-contain hidden"
      />

      <h2 className="h2-bold text-dark200_light800 mt-8">{title}</h2>

      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>

      <Link className="flex justify-end max-sm:w-full" href={link}>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 paragraph-medium mt-5 rounded-lg">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
