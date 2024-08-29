"use client";
import React, { useTransition } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { emailSubscribe } from "@/utils/actions/newsletter/emailSubscribe";
import { toast } from "./use-toast";

const Newsletter = () => {
  const [email, setEmail] = React.useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      emailSubscribe(email);
      setEmail("");
      toast({
        description: "You have successfully subscribed to our newsletter.",
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex items-center space-x-1">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          disabled={isPending}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow rounded-l-md bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <Button
          type="submit"
          className="rounded-r-md rounded-l-none bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-white transition-colors duration-200 hover:from-blue-600 hover:to-purple-700"
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>{" "}
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
    </form>
  );
};

export default Newsletter;
