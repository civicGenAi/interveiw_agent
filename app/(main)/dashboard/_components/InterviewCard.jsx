import React from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Copy, Send } from "lucide-react";
import { toast } from "sonner";

function InterviewCard({ interviews }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interviews?.interview_id;
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Copied");
  };

  const onSend = () => {
    const subject = encodeURIComponent("AI Interview Link");
    const body = encodeURIComponent("Here is the interview link: " + url);

    window.location.href = `mailto:godfreymuganyizi45@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className='p-5 bg-white shadow rounded-lg border'>
      <div className='flex items-center justify-between'>
        <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
        <h2 className='text-sm'>
          {moment(interviews?.created_at).format("DD MMM YYYY")}
        </h2>
      </div>
      <h2 className='mt-3 font-bold text-lg'>{interviews?.jobPosition}</h2>
      <h2 className='mt-2 '>{interviews?.duration}</h2>

      <div className='flex gap-3 w-full mt-3'>
        <div className='w-full'>
          <Button variant='outline' className='w-full' onClick={copyLink}>
            <Copy /> Copy Link
          </Button>
        </div>
        <div className='w-full'>
          <Button className='w-full' onClick={onSend}>
            <Send /> Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;
