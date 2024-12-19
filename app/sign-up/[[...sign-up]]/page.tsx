import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full max-w-7xl flex items-center justify-center h-screen mx-auto">
      <SignUp />
    </div>
  );
}
