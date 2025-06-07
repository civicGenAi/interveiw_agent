import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSidebar";
import Provider from "../provider";

function DashBoardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Provider>
        <div className='w-full'>
          <SidebarTrigger />
          {children}
        </div>
      </Provider>
    </SidebarProvider>
  );
}

export default DashBoardProvider;
