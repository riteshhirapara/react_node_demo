"use client";
import Card from "@/app/components/card/page";
import Header from "@/app/components/header/page";
import React from "react";
import { useEffect, useState } from "react";

export default function movieList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/movie");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.movies);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Header></Header>
      {loading && <div className="w-full text-center mt-[10%]">Loading...</div>}
      {error && (
        <div className="w-full text-center mt-[10%]">Error: {error}</div>
      )}

      <div className="grid grid-cols-4 gap-4 w-[90%] mx-auto">
        {data ? (
          data
            .slice(0, 8)
            .map((item: any, index: any) => (
              <Card
                key={index}
                _id={item._id}
                title={item.title}
                publish_year={item.publish_year}
                poster={item.poster}
              ></Card>
            ))
        ) : (
          <p>No Movies Found!</p>
        )}
      </div>

      {data.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 my-[80px]">
          <ul className="flex items-center space-x-2 h-8 m-auto text-sm leading-base font-semibold">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0"
              >
                <span className="">Prev</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 bg-primary rounded-md"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 bg-cardColor rounded-md"
              >
                2
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0"
              >
                <span className="">Next</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </React.Fragment>
  );
}
