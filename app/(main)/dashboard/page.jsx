import React from "react";
import WelcomeContaner from "./_components/WelcomeContaner";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewsList";

function Dashboard() {
  return (
    <div>
      {/* <WelcomeContaner /> */}
      <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;
