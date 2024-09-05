import Header from "@/components/Header/Header";
import React from "react";

const Contactform = () => {
  return (
    <div>
      <Header />
      <main className="min-h-[calc(100vh-97px)] pt-24 flex-1 mx-auto w-full flex items-center justify-center">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeuxfeckDgHnTjtgDfjdZs8KaRy2mVN2mgPowugtJFOZNX3-g/viewform?embedded=true"
          width="550"
          height="750"
          //   frameborder="0"
          //   marginheight="0"
          //   marginwidth="0"
        >
          Loading…
        </iframe>
      </main>
    </div>
  );
};

export default Contactform;
