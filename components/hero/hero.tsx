import Image from "next/image";

import Illustration from "@/public/images/glow-bottom.svg";
import Particles from "./particles";
import { Input } from "../ui/input";
import BackgroundDots from "./dot-pattern-background";
import { SpotlightPage } from "./background/spotlightcard";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero({ href }: { href: any }) {
  return (
    <section className="flex flex-col ">
      <div className="relative  mx-auto px-4 pb-32 sm:px-6">
        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        {/* <div
          className="absolute pb-32 inset-0 -z-10 -mx-28 rounded-b-[32px] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image
              src={Illustration}
              className="max-w-none"
              width={2146}
              priority
              alt="Hero Illustration"
            />
          </div>
        </div> */}

        <div className="pt-32 pb-16 md:pt-52 md:pb-10">
          <div className="container mx-auto text-center">
            <h1 className="z-10 text-4xl font-extrabold text-gray-900 dark:text-white lg:text-6xl">
              Effortless Communication <br /> For{" "}
              <span className="main-text"> Developers</span> 🚀
            </h1>
            <p className="mt-8 text-xl text-gray-700 dark:text-gray-300">
              Our innovative web tools are designed to simplify your daily
              communication and articles powered by AI.
            </p>
            <div className="pt-10">
              <Link href={href}>
                <Button className="inline-flex h-12 animate shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  Lets chat
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* <form className="mx-auto max-w-xl" action="/search" method="GET">
          <div className="relative group">
            <Input
              type="search"
              id="modern-search"
              name="q"
              className="block w-full rounded-full border-2 border-gray-200 bg-white py-4 pl-14 pr-20 text-sm text-gray-900 transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-400"
              placeholder="Find your perfect tool"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-400 transition-colors duration-300 group-hover:text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-sm font-medium text-white bg-indigo-600 rounded-r-full transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              <span className="sr-only">Search</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </form> */}
      </div>

      {/* <div className="mb-16 text-center relative">
        <h2 className="text-4xl md:text-4xl font-extrabold tracking-tight relative inline-block">
          <span className="text-indigo-600 dark:text-indigo-400">
            {" "}
            <a
              className="no-underline"
              href="#/nepali-tools"
            >
              Nepali Tools
            </a>
          </span>
          <svg
            className="absolute -bottom-2 left-0 w-full"
            height="4"
            viewBox="0 0 200 4"
            preserveAspectRatio="none"
          >
            <path
              d="M0 2 Q50 4 100 2 T200 2"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-indigo-600 dark:text-indigo-400 transition-all duration-300 ease-in-out"
            ></path>
          </svg>
        </h2>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Explore Nepali tools crafted to make your everyday tasks easier and
          more efficient.
        </p>
        <div className="mt-8 flex justify-center space-x-2">
          <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
          <span className="w-2 h-2 bg-blue-400 dark:bg-blue-200 rounded-full"></span>
          <span className="w-2 h-2 bg-blue-200 dark:bg-blue-600 rounded-full"></span>
        </div>
      </div> */}

      <SpotlightPage />
    </section>
  );
}
