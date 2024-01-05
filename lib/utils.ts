import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diffInMilliseconds: number = Number(now) - Number(createdAt);

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (seconds < 60) {
    return rtf.format(-seconds, "second");
  } else if (minutes < 60) {
    return rtf.format(-minutes, "minute");
  } else if (hours < 24) {
    return rtf.format(-hours, "hour");
  } else if (days < 7) {
    return rtf.format(-days, "day");
  } else if (weeks < 4) {
    return rtf.format(-weeks, "week");
  } else if (months < 12) {
    return rtf.format(-months, "month");
  } else {
    return rtf.format(-years, "year");
  }
};

export const formatNumber = (number: number): string => {
  if (Math.abs(number) >= 1e6) {
    return (number / 1e6).toFixed(1) + "M";
  } else if (Math.abs(number) >= 1e3) {
    return (number / 1e3).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};

export const getJoinedDate = (date: Date): string => {
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month: string = monthNames[date.getMonth()];
  const year: number = date.getFullYear();

  return `${month} ${year}`;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
