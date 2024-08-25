"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { ModeToggle } from "../Theme-toggle/Toggle";
import { UserButton } from "@clerk/nextjs";
import MobileMenu from "../mobile-menu";
import { useRouter } from "next/navigation";

function useBoundedScroll(threshold: number) {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);
  let scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1],
  );

  useEffect(() => {
    return scrollY.on("change", (current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous!;
      let newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, threshold));
    });
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

export default function Header() {
  let { scrollYBoundedProgress } = useBoundedScroll(400);
  let scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1],
  );

  const router = useRouter();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 overflow-hidden dark:text-slate-900 z-50">
      <div className="z-0 flex-1 overflow-y-scroll">
        <motion.header
          style={{
            height: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [80, 50],
            ),
            backgroundColor: useMotionTemplate`rgb(30, 41, 59 / ${useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0.1],
            )})`, // Adjusted to use a dark slate color
          }}
          className="fixed inset-x-0 flex h-10 shadow backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-8">
            <motion.p
              style={{
                scale: useTransform(
                  scrollYBoundedProgressDelayed,
                  [0, 1],
                  [1, 0.9],
                ),
              }}
              onClick={() => router.push("/")}
              className="flex origin-left items-center text-xl font-semibold uppercase cursor-pointer"
            >
              <span className="-ml-1.5 inline-block -rotate-90 text-[10px]  text-slate-900 dark:text-slate-300 dark:hover:text-white leading-[0]">
                The
              </span>
              <span className="-ml-1 text-2xl text-slate-900 dark:text-slate-300 dark:hover:text-white tracking-[-.075em]">
                Dipak Giri
              </span>
            </motion.p>
            <motion.nav
              style={{
                opacity: useTransform(
                  scrollYBoundedProgressDelayed,
                  [0, 1],
                  [1, 0],
                ),
              }}
              className=" sm:flex items-center space-x-6 text-sm font-medium text-slate-400"
            >
              <div className="flex items-center space-x-2">
                <Link
                  className="hidden sm:flex font-medium text-sm text-slate-900 dark:text-slate-300 dark:hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out"
                  href="/blogs"
                >
                  Blogs
                </Link>
                <Link
                  className="hidden sm:flex font-medium text-sm text-slate-900 dark:text-slate-300 dark:hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </div>
              <div className="flex gap-2 items-center ">
                <nav className="ml-auto flex items-center gap-2">
                  <ModeToggle />
                  <UserButton />
                </nav>
                <MobileMenu />
              </div>
            </motion.nav>
          </div>
        </motion.header>
      </div>
    </div>
  );
}

let clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);
