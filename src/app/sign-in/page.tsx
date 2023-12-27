"use client";

import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { showToast } from "@/lib/utils";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDataValid()) {
      await axios
        .post(
          "http://localhost:3000/api/signin",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          if (data?.data?.status === 200) {
            showToast("Logged in successfully", true);
            setTimeout(() => {
              router.push("/movie/list");
            }, 1000);
          } else {
            showToast("Invalid credentials !!", false);
          }
        })
        .catch((error) => {
          showToast("User is anauthorized !!", false);
          throw new Error("User is anauthorized !!");
        });
    } else {
      !isEmailValid && showToast("Please enter valid email", false);
      !isPasswordValid && showToast("Please enter valid password", false);
    }
  };

  const isDataValid = () => {
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    let passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    setEmailValid(emailRegex.test(email));
    setPasswordValid(passwordRegex.test(password));
    return emailRegex.test(email) && passwordRegex.test(password);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-bgColor px-6 py-12 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-semibold leading-2xl text-white">
          Sign in
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[18.75rem]">
        <form className="space-y-6" onSubmit={handleSignin}>
          <div>
            <div className="focus:outline-none w-full">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none block w-full rounded-[10px] bg-inputColor px-4 border-0 py-2.5 text-white font-normal sm:text-body-sm sm:leading-base"
              />
            </div>
          </div>
          <div>
            <div className="focus:outline-none w-full mt-6">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="focus:outline-none block w-full rounded-[10px] bg-inputColor px-4 border-0 py-2.5 text-white font-normal sm:text-body-sm sm:leading-base"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-6">
            <label
              className="relative flex items-center px-3 rounded-full cursor-pointer"
              htmlFor="check"
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md bg-inputColor border-0 transition-all  checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id="check"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              className="mt-px cursor-pointer select-none text-white font-normal sm:text-body-sm sm:leading-base"
              htmlFor="check"
            >
              Remember Me
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-[10px] bg-primary py-[15px] gap-[5px] sm:leading-base sm:text-sm font-bold leading-base text-white focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
