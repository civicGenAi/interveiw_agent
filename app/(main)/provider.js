import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSidebar";
import Provider from "../provider";
import WelcomeContainer from "./dashboard/_components/WelcomeContaner";

function DashBoardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Provider>
        <div className='w-full p-10'>
          <SidebarTrigger />
          <WelcomeContainer />

          {children}
        </div>
      </Provider>
    </SidebarProvider>
  );
}

export default DashBoardProvider;
