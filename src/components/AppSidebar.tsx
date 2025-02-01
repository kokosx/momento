"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "better-auth";
import UserAvatar from "./UserAvatar";
import {
  HomeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

// This is sample data.

type Props = {
  user: User;
};

export function AppSidebar({
  user,
  ...props
}: Props & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const data = [
    {
      link: "/board",
      label: "Home",
      icon: (
        <div className="min-w-fit min-h-fit">
          <HomeIcon className="h-9 w-9" />
        </div>
      ),
    },
    {
      link: "/search",
      label: "Search",
      icon: (
        <div className="min-w-fit min-h-fit">
          <MagnifyingGlassIcon className="h-9 w-9" />
        </div>
      ),
    },
    {
      link: "/create",
      label: "Create",
      icon: (
        <div className="min-w-fit min-h-fit">
          <PlusIcon className="h-9 w-9" />
        </div>
      ),
    },
    {
      link: "/profile",
      label: "Profile",
      icon: <UserAvatar name={user.name} />,
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center  justify-center gap-2">
          <span className="text-3xl font-semibold">Momento</span>
          <Image src={"/logo.svg"} alt="Momento Logo" width={40} height={40} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarMenu className="flex flex-col gap-y-2 mt-12">
          {data.map((item) => (
            <SidebarMenuItem className="w-full flex  px-12" key={item.link}>
              <SidebarMenuButton className="text-2xl " asChild>
                <Link
                  className={` ${
                    item.link == pathname ? "text-white" : "text-gray-400 "
                  } text-2xl min-h-fit min-w-fit font-semibold hover:scale-125 transition-all duration-300 ease-in-out h-full w-[90%]`}
                  href={item.link}
                >
                  {item.icon} {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
