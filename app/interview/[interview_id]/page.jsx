"use client";
import React, { useContext, useEffect, useState } from "react";
import InterviewHeader from "../_components/InterviewHeader";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { supabase } from "@/services/superbaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { useRouter } from "next/navigation";
function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);

    // Check internet connectivity
    if (!navigator.onLine) {
      setLoading(false);
      toast("No internet connection. Please check your network and try again.");
      return;
    }

    try {
      let { data: interviews, error } = await supabase
        .from("interviews")
        .select("jobPosition, jobDescription, duration, type")
        .eq("interview_id", interview_id);

      // Check for Supabase query error
      if (error) {
        setLoading(false);
        toast("Error fetching interview details");
        return;
      }

      // Check if no interviews found
      if (!interviews || interviews.length === 0) {
        setLoading(false);
        toast("Incorrect Interview Link");
        return;
      }

      // console.log(interviews);
      setInterviewData(interviews[0]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      // Check if it's a network error
      if (!navigator.onLine) {
        toast(
          "Lost internet connection. Please check your network and try again."
        );
      } else {
        toast("Failed to load interview details. Please try again.");
      }
      return;
    }
  };

  const onJoinInterview = async () => {
    console.log("Username before API call:", userName);
    setLoading(true);
    let { data: interviews, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("interview_id", interview_id);

    console.log(interviews[0]);
    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: interviews[0],
    });
    //adding some deley
    setTimeout(() => {
      router.push("/interview/" + interview_id + "/start");
    }, 5);

    setLoading(false);
  };

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
      <div className='flex flex-col justify-center items-center border p-7 rounded-lg bg-white shadow lg:px-33 xl:px-52  mb-20'>
        <Image
          src={"/logo1.png"}
          alt='logo'
          width={100}
          height={100}
          className='w-[90px]'
        />
        <h2 className='mt-3'>AI-Powerd Interview Platform</h2>
        <Image
          src={"/interview.png"}
          alt='interview'
          width={500}
          height={500}
          className='w-[280px] my-6'
        />

        <h2 className='font-bold text-xl'>{interviewData?.jobPosition}</h2>
        <h2 className='flex gap-2 items-center text-gray-500 mt-5'>
          <Clock className='h-4 w-4' />
          {interviewData?.duration}
        </h2>

        <div className='w-full'>
          <h2>Enter your fullName</h2>
          <Input
            placeholder='e.g,  Cygon Alexandar'
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className='w-full pt-3'>
          <h2>Enter your Email:</h2>
          <Input
            placeholder='e.g,  cygon@gmail.com'
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className='p-3 bg-blue-100 flex gap-4 rounded-lg mt-4'>
          <Info className='text-primary' />
          <div>
            <h2 className='font-bold'>Before you begin</h2>
            <ul className=''>
              <li className='text-sm text-primary'>
                - Test your camara and microphone
              </li>
              <li className='text-sm text-primary'>
                - Ensure you have stable internet
              </li>
              <li className='text-sm text-primary'>
                - Find and quety place for an interview
              </li>
            </ul>
          </div>
        </div>
        <Button
          className={"mt-5 w-full font-bold"}
          disabled={loading || !userName}
          onClick={() => onJoinInterview()}>
          <Video />
          {loading && <Loader2Icon />}
          Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
