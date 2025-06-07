"use client";
import { Button } from "@/components/ui/button";
import { Camera, Video } from "lucide-react";
import React, { useState } from "react";

function LatestInterviewsList() {
  const [InterviewsList, setInterviewsList] = useState([]);
  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl'>Previously Created Intervews</h2>

      {InterviewsList?.length == 0 && (
        <div className='p-5 flex flex-col gap-3 items-center  mt-5'>
          <Video className='h-10 w-10 text-primary' />
          <h2>You don't have any interview created?</h2>
          <Button>+ Create New</Button>
        </div>
      )}
    </div>
  );
}

export default LatestInterviewsList;
