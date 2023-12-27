import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Movies from "@/app/model/Movie";

dbConnect();

export async function POST(request: NextRequest) {
  const data = await request.formData();

  var buffer;
  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;

    if (typeof value === "object") {
      const blob = value as Blob;
      buffer = Buffer.from(await blob.arrayBuffer());
    }
  }
  const newMovie = new Movies({
    title: data.get("title"),
    publish_year: data.get("publish_year"),
    poster: buffer,
  });

  const savedMovie = await newMovie.save();

  return NextResponse.json({
    status: 201,
    message: "Success",
    movie: savedMovie.title,
  });
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") as String;
  if (id) {
    const movie = await Movies.find({ _id: id });
    return NextResponse.json({
      status: 200,
      message: "Success",
      movie,
    });
  }

  const movies = await Movies.find({});
  return NextResponse.json({
    status: 200,
    message: "Success",
    movies,
  });
}

export async function PATCH(request: NextRequest) {
  const data = await request.formData();
  var buffer;
  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;

    if (typeof value === "object") {
      const blob = value as Blob;
      buffer = Buffer.from(await blob.arrayBuffer());
    }
  }
  const update = {
    ...(data.get("title") && { title: data.get("title") }),
    ...(data.get("publish_year") && { publish_year: data.get("publish_year") }),
    ...(data.get("poster") && { poster: buffer }),
  };
  const updatedMovie = await Movies.findByIdAndUpdate(data.get("id"), update);
  return NextResponse.json({
    status: 204,
    message: "Success",
    movie: updatedMovie?.title,
  });
}
