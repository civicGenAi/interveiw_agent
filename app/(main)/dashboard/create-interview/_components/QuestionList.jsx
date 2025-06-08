import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState();
  useEffect(() => {
    if (formData) {
      // GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      console.log(result.data.content);
      const Content = result.data.content;
      const FINAL_CONTENT = Content.replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
      setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);

      setLoading(false);
    } catch (e) {
      toast("Server Error, Try Agin!");
      setLoading(false);
    }
  };

  const onFinish = () => {};
  return (
    <div>
      {loading && (
        <div className='p-5 bg-blue-50 rounded-2xl border border-primary flex gap-5 items-center'>
          <Loader2Icon className='animate-spin' />
          <div>
            <h2 className='font-medium'>Generating Interview Questions</h2>
            <p className='text-primary'>
              AI is crafting personalized questions based on our input
            </p>
          </div>
        </div>
      )}

      {questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}

      <div className='flex justify-end mt-10'>
        <Button onClick={() => onFinish()}>Finish</Button>
      </div>
    </div>
  );
}

export default QuestionList;
