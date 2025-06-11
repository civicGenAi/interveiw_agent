import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function CandidateFeedbackDialog({ candidate }) {
  let feedback = null;
  try {
    feedback = JSON.parse(candidate?.feedback?.message)?.feedback;
  } catch (e) {
    feedback = null;
  }

  // console.log(candidate);
  // console.log(feedback);
  const isRejected = feedback?.Recommendation !== "Yes";
  const bgColor = isRejected ? "bg-red-100" : "bg-green-100";
  const textColor = isRejected ? "text-red-700" : "text-green-700";
  const subTextColor = isRejected ? "text-red-500" : "text-green-500";
  const btnColor = isRejected
    ? "bg-red-700 text-white hover:bg-red-800"
    : "bg-green-700 text-white hover:bg-green-800";

  const recommendationMsg = feedback?.RecommendationMsg?.trim()
    ? feedback.RecommendationMsg
    : "No feedback message was provided. Please follow up with the assessment team for clarification while Try angain.";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='text-primary'>
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className='mt-5'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-5'>
                  <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>
                    {candidate.userName[0]}
                  </h2>
                  <div>
                    <h2 className='font-bold'>{candidate?.userName}</h2>
                    <h2 className='text-sm text-gray-500'>
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>
                <div className='flex gap-3 items-center'>
                  <h2 className='text-primary text-2xl font-bold'>6/10</h2>
                </div>
              </div>
              <div className='mt-5'>
                <h2 className='font-bold'>Skills Assesment</h2>
                <div className='mt-3 grid grid-cols-2 gap-10'>
                  <div>
                    <h2 className='flex justify-between'>
                      Technical Skills{" "}
                      <span>{feedback?.rating?.technicalSkills}</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.technicalSkills * 10}
                      className='mt-1'
                    />
                  </div>
                  <div>
                    <h2 className='flex justify-between'>
                      Communication{" "}
                      <span>{feedback?.rating?.communication}</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.communication * 10}
                      className='mt-1'
                    />
                  </div>
                  <div>
                    <h2 className='flex justify-between'>
                      Problem Solving{" "}
                      <span>{feedback?.rating?.problemSolving}</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.problemSolving * 10}
                      className='mt-1'
                    />
                  </div>
                  <div>
                    <h2 className='flex justify-between'>
                      Experience <span>{feedback?.rating?.experience}</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.experiences * 10}
                      className='mt-1'
                    />
                  </div>
                </div>
              </div>

              <div className='mt-5'>
                <h2 className='font-bold'>Performance Summary</h2>
                <div className='p-5 bg-secondary my-3 rounded-md'>
                  {(Array.isArray(feedback?.summary)
                    ? feedback.summary
                    : feedback?.summary?.split("\n")
                  )?.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>

              <div
                className={`p-5 rounded-md flex items-center justify-between ${bgColor}`}>
                <div>
                  <h2 className={`font-bold ${textColor}`}>
                    Recommendation Message
                  </h2>
                  <p className={subTextColor}>{recommendationMsg}</p>
                </div>
                <Button className={btnColor}>Send Msg</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
