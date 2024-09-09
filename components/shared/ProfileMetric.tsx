import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUlr: string;
  alt: string;
  title: string;
  href?: string;
}

const ProfileMetric = ({ imgUlr, alt, title, href }: Props) => {
  return (
    <div className="flex-center gap-1">
      <Image src={imgUlr} alt={alt} width={20} height={20} />
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="paragraph-medium text-accent-blue"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
};

export default ProfileMetric;
