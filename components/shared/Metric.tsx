import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUlr: string;
  alt: string;
  value: number | string;
  title: string;
  textStyle?: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUlr,
  alt,
  value,
  title,
  textStyle,
  href,
  isAuthor,
}: Props) => {
  const metricContent = (
    <>
      <Image
        src={imgUlr}
        height={16}
        width={16}
        alt={alt}
        className={`object-contain ${href ? "rounded-full invert-colors" : ""}`}
      />

      <p className={`${textStyle} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
