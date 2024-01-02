import Link from "next/link";
import React from "react";

interface Card {
  _id: string;
  title: string;
  publish_year: string;
  poster: string;
}

export default function Card({ _id, title, publish_year, poster }: Card) {
  return (
    <div className="h-[504px] w-full bg-cardColor hover:bg-inputColor gap-3 p-[8px] rounded-lg">
      <div className="h-[400px] rounded-lg">
        <Link
          href={{ pathname: "/movie/edit", query: { id: _id?.toString() } }}
        >
          <img
            className="h-full w-full rounded-lg object-cover cursor-pointer"
            src={`data:image/png;base64,${Buffer.from(poster).toString(
              "base64"
            )}`}
          ></img>
        </Link>
      </div>
      <div className="flex flex-col pl-[12px] gap-3 pt-[12px]">
        <div className="text-base leading-md font-regular truncate">
          {title}
        </div>
        <div className="leading-base text-body-sm">{publish_year}</div>
      </div>
    </div>
  );
}
