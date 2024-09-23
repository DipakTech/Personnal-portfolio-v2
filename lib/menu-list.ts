import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  File,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string, email: string): Group[] {
  // my-own-email
  const adminEmails = [
    "dipakgiri1200@gmail.com",
    "dipakgiri.dev@gmail.com",
    "dipakgiri2057@gmail.com",
  ];

  if (adminEmails.includes(email))
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard",
            label: "Dashboard",
            active: pathname.includes("/dashboard"),
            icon: LayoutGrid,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Contents",
        menus: [
          {
            href: "",
            label: "Posts",
            active: pathname.includes("/posts"),
            icon: SquarePen,
            submenus: [
              {
                href: "/posts",
                label: "All Posts",
                active: pathname === "/posts",
              },
              {
                href: "/posts/new",
                label: "New Post",
                active: pathname === "/posts/new",
              },
            ],
          },
          {
            href: "/categories",
            label: "Categories",
            active: pathname.includes("/categories"),
            icon: Bookmark,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/users",
            label: "Users",
            active: pathname.includes("/users"),
            icon: Users,
            submenus: [],
          },
          {
            href: "/account",
            label: "Account",
            active: pathname.includes("/account"),
            icon: Settings,
            submenus: [],
          },
          {
            href: "/generate-cover-letter",
            label: "Generate Cover Letter",
            active: pathname.includes("/generate-cover-letter"),
            icon: File,
            submenus: [],
          },
        ],
      },
    ];
  else
    return [
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/account",
            label: "Account",
            active: pathname.includes("/account"),
            icon: Settings,
            submenus: [],
          },
          {
            href: "/generate-cover-letter",
            label: "Generate Cover Letter",
            active: pathname.includes("/generate-cover-letter"),
            icon: File,
            submenus: [],
          },
        ],
      },
    ];
}
