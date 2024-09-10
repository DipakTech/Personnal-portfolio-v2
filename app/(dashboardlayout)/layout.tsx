// "use client";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

import React, { PropsWithChildren } from "react";
import { QueryCLientProvider } from "./QueryClientProvider";
// import { getQuoteOfDay } from "@/utils/actions/worker/getQuoteOfDay";
// import { getRandomQuote } from "@/utils/actions/worker/getRandomQuote";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  // const quoteOfDay = await getQuoteOfDay();
  // const randomQuote = await getRandomQuote();

  // console.log("quoteOfDay", quoteOfDay);
  // console.log("randomQuote", randomQuote);

  return (
    <QueryCLientProvider>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </QueryCLientProvider>
  );
};

export default DashboardLayout;
