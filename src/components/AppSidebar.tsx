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
import { HomeIcon, PlusIcon, SearchIcon, UserIcon } from "lucide-react";

// This is sample data.
const data = [
  {
    link: "/board",
    label: "Home",
    icon: <HomeIcon />,
  },
  { link: "/search", label: "Search", icon: <SearchIcon /> },
  { link: "/create", label: "Create", icon: <PlusIcon /> },
  { link: "/profile", label: "Profile", icon: <UserIcon /> },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center  justify-center gap-2">
          <span className="text-3xl font-semibold">Momento</span>
          <Image src={"/logo.svg"} alt="Momento Logo" width={40} height={40} />
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-12">
        {/* We create a SidebarGroup for each parent. */}
        <SidebarMenu>
          {data.map((item) => (
            <SidebarMenuItem
              className="w-full flex justify-center"
              key={item.link}
            >
              <SidebarMenuButton className="text-2xl " asChild>
                <Link
                  className=" px-[25%] text-2xl font-semibold w-[90%]"
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
