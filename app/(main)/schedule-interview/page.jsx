"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/superbaseClient";
import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";

function ScheduleInterview() {
  const { user } = useUser();
  const [InterviewsList, setInterviewsList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await supabase
      .from("interviews")
      .select(
        "jobPosition,duration,interview_id, interview_feedback(userEmail)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    console.log(result?.data);
    // setInterviewList(result?.data);
    setInterviewsList(result?.data || []);
  };
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>
        Interview List with Candidate feedback..
      </h2>
      {InterviewsList?.length == 0 && (
        <div className='p-5 flex flex-col gap-3 items-center  mt-5'>
          <Video className='h-10 w-10 text-primary' />
          <h2>You don't have any interview created?</h2>
          <Button>+ Create New</Button>
        </div>
      )}

      {InterviewsList && (
        <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5 '>
          {InterviewsList?.map((interviews, index) => (
            <InterviewCard
              interviews={interviews}
              key={index}
              viewDetails={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduleInterview;
