"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/superbaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewDetailsContainer from "../_components/InterviewDetailsContainer";
import CandidateList from "../_components/CandidateList";

function InterviewDetail() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetails, setInterviewDetail] = useState();

  useEffect(() => {
    user && GetInterviewDetails();
  }, [user]);

  const GetInterviewDetails = async () => {
    const result = await supabase
      .from("interviews")
      .select(
        `jobPosition,jobDescription,type,questionList,duration,interview_id,created_at, 
        interview_feedback(userEmail,userName,feedback,created_at)`
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id);
    //   .order("id", { ascending: false });

    setInterviewDetail(result?.data[0]);
    // console.log(result);
  };
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-xl'>Intervew Details</h2>
      <InterviewDetailsContainer interviewDetails={interviewDetails} />
      <CandidateList candidatelist={interviewDetails?.["interview_feedback"]} />
    </div>
  );
}

export default InterviewDetail;
