"use client";

import axios from "axios";
import { Download, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";

type Props = {
  searchParams: {
    id: string;
  };
};

type FileType = {
  preview: string;
  name: string;
};

const fileObject = {
  preview: "",
  name: "",
};

const Page = (props: Props) => {
  const router = useRouter();
  const [data, setData] = useState({ title: "", publish_year: "", poster: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState<FileType>(fileObject);
  const [originalFile, setOriginalFile] = useState({});
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [isFileValid, setFileValid] = useState(true);
  const [currentImage, setCurrentImage] = useState(false);
  const [id, setId] = useState(props.searchParams.id);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
    setOriginalFile(acceptedFiles[0]);
    setCurrentImage(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    onDropAccepted(files, event) {
      setFileValid(true);
    },
    onDropRejected(fileRejections, event) {
      setFileValid(false);
    },
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData();
    formData.append("id", id);
    if (title !== data.title) formData.append("title", title);
    if (publishingYear !== data.publish_year)
      formData.append("publish_year", publishingYear);
    if (!currentImage) formData.append("poster", originalFile as Blob);

    const response = await axios
      .patch("/api/movie", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        window.location.href = "/movie/list";
      })
      .catch((error) => {
        throw new Error("Unable to create movie");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get("/api/movie", {
          params: {
            id,
          },
        })
        .then((data) => {
          if (data?.data?.status === 200) {
            setData(data?.data?.movie[0]);
            setTitle(data?.data?.movie[0].title);
            setPublishingYear(data?.data?.movie[0].publish_year);
          }
          setCurrentImage(true);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
          throw new Error("Failed to fetch data");
        });
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {loading && <div className="w-full text-center mt-[10%]">Loading...</div>}
      {error && (
        <div className="w-full text-center mt-[10%]">Error: {error}</div>
      )}
      {!loading && !error && (
        <div className="p-12 sm:p-16 md:px-30 md:py-26 xl:px-32 xl:py-24 bg-bgColor min-h-screen">
          <div className="flex items-center mb-16 lg:mb-20">
            <div className="flex-1">
              <h2 className="text-left text-lg md:text-xl font-semibold leading-xl text-white">
                Edit
              </h2>
            </div>
          </div>
          <form
            className="flex justify-between flex-wrap h-[300px] lg:h-[500px] w-full"
            onSubmit={handleFormSubmit}
          >
            <div className="h-full w-full sm:w-full md:w-full lg:w-[53%] xl:w-[40%] 2xl:w-[28%] mb-12 lg:mb-0">
              <div className="h-full w-full relative oveflow-hidden flex justify-center bg-inputColor cursor-pointer rounded-[10px] border-2 border-dashed border-[#fff] items-center">
                {(file && isFileValid) || currentImage ? (
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <img
                      className="w-full object-contain p-3"
                      src={
                        currentImage
                          ? `data:image/png;base64,${Buffer.from(
                              data.poster
                            ).toString("base64")}`
                          : file.preview
                      }
                      alt={file?.name}
                      style={{ height: "calc(100% - 2.5rem)" }}
                    />
                    <button
                      className="pb-3"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile({ preview: "", name: "" });
                        setFileValid(false);
                        setCurrentImage(false);
                      }}
                    >
                      <Trash />
                    </button>
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className="h-full w-full flex flex-col flex-wrap items-center justify-center"
                  >
                    <Download className="mb-3" />
                    Drop other image here
                    <input
                      {...getInputProps()}
                      type="file"
                      id="image-upload"
                      name="movie-image"
                      required
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full sm:w-full md:w-full lg:w-[37%] xl:w-[50%] 2xl:w-[65%]">
              <div className="flex flex-col justify-center sm:w-full xl:w-[70%] 2xl:w-[40%]">
                <div className="focus:outline-none w-full">
                  <input
                    id="title"
                    name="Title"
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="focus:outline-none block w-full rounded-[10px] bg-inputColor px-4 border-0 py-2.5 text-white font-normal sm:text-body-sm sm:leading-base"
                  />
                </div>
                <div className="focus:outline-none w-1/2 mt-6">
                  <input
                    id="publishing-year"
                    name="publishing-year"
                    type="number"
                    placeholder="Publishing year"
                    value={publishingYear}
                    min={0}
                    onChange={(e) => setPublishingYear(e.target.value)}
                    required
                    className="focus:outline-none block w-full rounded-[10px] bg-inputColor px-4 border-0 py-2.5 text-white font-normal sm:text-body-sm sm:leading-base"
                  />
                </div>
                <div className="mt-12 flex gap-6">
                  <button
                    type="button"
                    onClick={() => router.push("/movie/list")}
                    className="flex w-full justify-center border border-1 rounded-[10px] py-[15px] gap-[5px] sm:leading-base sm:text-sm font-bold leading-base text-white focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-[10px] bg-primary py-[15px] gap-[5px] sm:leading-base sm:text-sm font-bold leading-base text-white focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default Page;
