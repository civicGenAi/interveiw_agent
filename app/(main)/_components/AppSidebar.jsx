"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarOptions } from "@/services/Constants";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className='flex items-center'>
        <Image
          src={"/logo1.png"}
          alt='logo'
          width={200}
          height={100}
          className='w-[150px]'
        />
        <Button className='w-full mt-3'>
          <Plus />
          Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SidebarOptions.map((options, index) => (
                <SidebarMenuItem key={index} className='p-1'>
                  <SidebarMenuButton
                    asChild
                    className={`p-5 ${path == options.path && "bg-blue-200"}`}>
                    <Link href={options.path}>
                      <options.icon
                        className={`${path == options.path && "text-primary"}`}
                      />
                      <span
                        className={`text-[16px] font-medium ${
                          path == options.path && "text-primary"
                        }`}>
                        {options.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
