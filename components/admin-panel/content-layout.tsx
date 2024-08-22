import { Navbar } from "@/components/admin-panel/navbar";
import BackgroundDots from "../hero/dot-pattern-background";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />

      <div className="container pt-8 pb-8 ">{children}</div>
    </div>
  );
}
