export const metadata = {
  title: "post detail",
  description: "Page description",
};

import Image from "next/image";
import Illustration from "@/public/images/page-illustration.svg";
import IntegrationImg from "@/public/images/integration-image.png";
import IntegrationIcon from "@/public/images/integrations-08.svg";
import Star from "@/public/images/star.svg";
import Avatar from "@/public/images/post-avatar.jpg";
import Particles from "@/components/hero/particles";
import Header from "@/components/Header/Header";
import { getBlog } from "@/utils/actions/blog/getBlog";
import SafeHTML from "./safe-html";
import "./blog-style.css";
import Link from "next/link";

export default async function IntegrationsSingle() {
  const blog: any = await getBlog("12002772-6387-4deb-a86a-9a620757481f");
  return (
    <section className="relative">
      <div className="mb-20">
        <Header />
      </div>
      {/* Radial gradient */}
      <div
        className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square"
        aria-hidden="true"
      >
        <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute w-64 h-64 translate-z-0 bg-purple-400 rounded-full blur-[80px] opacity-70"></div>
      </div>

      {/* Particles animation */}
      <Particles className="absolute inset-0 h-96 -z-10" quantity={15} />

      {/* Illustration */}
      {/* <div
        className="md:block absolute left-1/2 -translate-x-1/2  -mt-16 blur-2xl opacity-90 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <Image
          src={Illustration}
          className="max-w-none"
          width={1440}
          height={427}
          alt="Page Illustration"
        />
      </div> */}

      <div className="max-w-6xl mx-auto px-4 md:px-0 mt-20">
        <div className="md:flex md:justify-between">
          {/* Page content */}
          <div className=" pb-12 md:pb-20">
            <div className=" mx-auto ">
              <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10">
                {/* Back button */}
                <div className="shrink-0">
                  <div className="sticky top-20">
                    <Link
                      className="flex items-center justify-center w-9 h-9 group border border-transparent rounded-full [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
                      href="/blogs"
                    >
                      <span className="sr-only">Go back</span>
                      <svg
                        className="w-4 h-4 fill-purple-500"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <article className=" mb-12 border-b [border-image:linear-gradient(to_right,transparent,theme(colors.slate.800),transparent)1]">
                    <figure className="bg-slate-700/20 border border-slate-300/10 p-4 rounded-3xl mb-8">
                      <Image
                        className="w-full rounded-2xl"
                        src={IntegrationImg}
                        width={586}
                        height={300}
                        alt="Integration image"
                      />
                    </figure>
                    <aside className="pl-6 border-l-2 border-purple-500">
                      <p className="inline-flex font-medium italic text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
                        “ Author”
                      </p>
                      <footer className="flex items-center space-x-4">
                        <Image
                          className="shrink-0 rounded-full"
                          src={blog.author.userAvatar}
                          width={32}
                          height={32}
                          alt="Author"
                        />
                        <div className="text-sm font-medium text-slate-300">
                          {blog.author.name}{" "}
                          <span className="text-slate-700">-</span>{" "}
                        </div>
                      </footer>
                    </aside>

                    <h1 className="sr-only">GitHub</h1>

                    {/* Post content */}
                    <h1 className="heading-node prose max-w-none mt-5 px-5 text-white prose-headings:text-slate-50 prose-h2:text-[25px] prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-a:text-purple-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-50 prose-strong:font-medium prose-blockquote:pl-5 prose-blockquote:xl:-ml-5 prose-blockquote:border-l-2 prose-blockquote:border-purple-500 prose-blockquote:font-medium prose-blockquote:text-slate-300 prose-blockquote:italic">
                      {blog?.title}
                    </h1>
                    <SafeHTML html={blog.content} />
                  </article>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
        </div>
      </div>
    </section>
  );
}
