import React from "react";
import DashBoardProvider from "./provider";

function DashBoardLayout({ children }) {
  return (
    <div>
      <DashBoardProvider>
        <div className='p-10'>{children}</div>
      </DashBoardProvider>
    </div>
  );
}

export default DashBoardLayout;
