"use client";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { LayoutTransition } from "../layout-transition";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <LayoutTransition
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <main
          className={cn(
            "min-h-[calc(100vh-56px)] - bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
            sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
          )}
        >
          {children}
        </main>
      </LayoutTransition>
      {/* <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <Footer />
      </footer> */}
    </>
  );
}
