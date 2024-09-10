import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { ModeToggle } from "../Theme-toggle/Toggle";
import { UserButton } from "@clerk/nextjs";
import { NotificationFeed } from "../notification/notification-feed";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Knock } from "@knocklabs/node";
interface NavbarProps {
  title: string;
}

export async function Navbar({ title }: NavbarProps) {
  const knockClient = new Knock(process.env.KNOCK_SECRET_KEY);
  // const knockClient = new Knock(
  //   "sk_test_c4Wxoy5KobV7foF8n4nBNRcJ0gnVu55O2n28b9Naysw",
  // );
  const user = await currentUser();
  // const session = useSession();

  if (!user) redirect("/sign-in");

  const knockUser = await knockClient.users.identify(user?.id, {
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName ?? "New User",
  });

  const knockToken = await Knock.signUserToken(user.id, {
    signingKey: process.env.KNOCK_SIGNING_KEY,
    expiresInSeconds: 60 * 60,
  });

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <NotificationFeed knockToken={knockToken} />
          <ModeToggle />
          {/* <UserNav /> */}
          <UserButton />
        </div>
      </div>
    </header>
  );
}
