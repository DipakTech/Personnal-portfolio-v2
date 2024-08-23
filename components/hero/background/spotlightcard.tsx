import Spotlight, { SpotlightCard } from "./spotlight-card";

export function SpotlightPage() {
  return (
    <>
      <main className="relative lg:h-[350px] flex flex-col justify-center dark:bg-slate-900 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-2 md:px-2 py-10">
          <Spotlight className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none group">
            {/* Card #1 */}
            <SpotlightCard>
              <div className="relative h-full dark:bg-slate-900  pb-4 rounded-[inherit] z-20 overflow-hidden">
                {/* Radial gradient */}
                <div
                  className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                </div>
                <div className="flex flex-col h-full items-center ">
                  {/* Image */}
                  <div className="relative inline-flex">
                    <div
                      className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600"
                      aria-hidden="true"
                    ></div>
                    {/* <Image
                      className="inline-flex"
                      src={Card01}
                      width={200}
                      height={200}
                      alt="Card 01"
                    /> */}
                  </div>
                  {/* Text */}
                  <a href="#">
                    <div className="tool-card group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-750">
                      <div className="p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-blue-100 rounded-full transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900"></div>
                            <div className="relative z-30 w-6 h-6 text-blue-800 transition-transform duration-300 group-hover:scale-110 dark:text-blue-200">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Popular
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          Communication Tools
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          communicate with your developer friend to boost your
                          everyday productivity.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </SpotlightCard>
            {/* Card #2 */}
            <SpotlightCard>
              <div className="relative h-full dark:bg-slate-900  pb-4 rounded-[inherit] z-20 overflow-hidden">
                {/* Radial gradient */}
                <div
                  className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                </div>
                <div className="flex flex-col h-full items-center ">
                  {/* Image */}
                  <div className="relative inline-flex">
                    <div
                      className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600"
                      aria-hidden="true"
                    ></div>
                    {/* <Image
                      className="inline-flex"
                      src={Card02}
                      width={200}
                      height={200}
                      alt="Card 02"
                    /> */}
                  </div>
                  {/* Text */}
                  <a href="#">
                    <div className="tool-card group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-750">
                      <div className="p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-green-100 rounded-full transition-transform duration-300 group-hover:scale-110 dark:bg-green-900"></div>
                            <div className="relative z-30 w-6 h-6 text-green-800 transition-transform duration-300 group-hover:scale-110 dark:text-green-200">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-200">
                            New
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          Share your Knowledge
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Share your knowledge via blog post. automate with
                          artifical intelligent to write effieient blog post.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </SpotlightCard>
            {/* Card #3 */}
            <SpotlightCard>
              <div className="relative h-full dark:bg-slate-900  pb-4 rounded-[inherit] z-20 overflow-hidden">
                {/* Radial gradient */}
                <div
                  className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                </div>
                <div className="flex flex-col h-full items-center ">
                  {/* Image */}
                  <div className="relative inline-flex">
                    <div
                      className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600"
                      aria-hidden="true"
                    ></div>
                    {/* <Image
                      className="inline-flex"
                      src={Card03}
                      width={200}
                      height={200}
                      alt="Card 03"
                    /> */}
                  </div>
                  {/* Text */}
                  <a href="#" className="w-full">
                    <div className="tool-card group overflow-hidden rounded-xl w-full bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-750">
                      <div className="p-5">
                        <div className="mb-3 flex w-full items-center justify-between">
                          <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-yellow-100 rounded-full transition-transform duration-300 group-hover:scale-110 dark:bg-yellow-900"></div>
                            <div className="relative z-30 w-6 h-6 text-yellow-800 transition-transform duration-300 group-hover:scale-110 dark:text-yellow-200">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                                  clipRule="evenodd"
                                ></path>
                                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"></path>
                              </svg>
                            </div>
                          </div>
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Useful
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          features comming soon!!! 🚀🔥
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Manipulate and analyze text with powerful utilities.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </Spotlight>
        </div>
      </main>
    </>
  );
}
