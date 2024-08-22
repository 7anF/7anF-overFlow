"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface InputProps {
  placeholder: string;
  route: string;
  iconPosition: string;
  imgSrc: string;
  otherClasses: string;
}

const SearchLocally = ({
  placeholder,
  route,
  iconPosition,
  imgSrc,
  otherClasses,
}: InputProps) => {
  return (
    <div
      className={`flex items-center justify-center grow px-4 py-2 rounded-[10px] gap-4 background-light800_darkgradient border-light-700 h-[56px] ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder outline-none border-none bg-transparent shadow-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default SearchLocally;
