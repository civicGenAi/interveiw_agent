"use client";
import { Calendar1, Clock, FileText, MessageCircleMore } from "lucide-react";
import moment from "moment";
import React from "react";

function InterviewDetailsContainer({ interviewDetails }) {
  return (
    <div className='p-5 bg-white shadow rounded-lg mt-5'>
      <h2>{interviewDetails?.jobPosition}</h2>

      <div className='mt-4 flex items-center justify-between lg:pr-52'>
        <div>
          <h2 className='text-sm text-gray-500'>Duration</h2>
          <h2 className='flex text-sm font-bold items-center gap-2 mt-0.5'>
            <Clock className='h-4 w-4' />
            {interviewDetails?.duration}
          </h2>
        </div>
        <div>
          <h2 className='text-sm text-gray-500'> Created On</h2>
          <h2 className='flex text-sm font-bold items-center gap-2 mt-0.5'>
            <Calendar1 className='h-4 w-4' />
            {moment(interviewDetails?.created_at).format("MMM DD,  yyyy")}
          </h2>
        </div>
        {interviewDetails?.type && (
          <div>
            <h2 className='text-sm text-gray-500'>Type</h2>
            <h2 className='flex text-sm font-bold items-center gap-2 mt-0.5'>
              <FileText className='h-4 w-4' />
              {JSON.parse(interviewDetails?.type)[0]}
            </h2>
          </div>
        )}
      </div>

      <div className='mt-5'>
        <h2 className='font-bold'>Job Sescription</h2>
        <p className='text-sm leading-6'>{interviewDetails?.jobDescription}</p>
      </div>

      <div className='mt-5'>
        <h2 className='font-bold'>Interview Questions</h2>
        <div className='grid grid-cols-2 gap-3  mt-3'>
          {interviewDetails?.questionList.map((item, index) => (
            <h2 className='text-xs'>
              {" "}
              <MessageCircleMore className='text-primary' /> {index + 1}.
              {item?.question}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailsContainer;
