import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
  if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
  if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }
  return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
};

export const formatNumbers = (upvotes: number): string => {
  if (upvotes >= 1_000_000) {
    return `${(upvotes / 1_000_000).toFixed(1)}m`;
  } else if (upvotes >= 1_000) {
    return `${(upvotes / 1_000).toFixed(1)}k`;
  } else {
    return upvotes.toString();
  }
};

export const formatDateToMonthYear = (dateString: string): string => {
  const date = new Date(dateString);

  // Use Intl.DateTimeFormat to format the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};

// Example usage:
const dateStr = "2024-09-07T08:31:13.081Z";
console.log(formatDateToMonthYear(dateStr)); // Output: "September 2024"
